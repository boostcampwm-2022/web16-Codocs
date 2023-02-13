import React, { useCallback, useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';
import { Cursor } from '../../core/cursor/cursor';
import useDebounce from '../../hooks/useDebounce';
import useGetProfileQuery from '../../query/profile/useGetProfileQuery';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../../atoms/onlineUserAtom';
import { useParams } from 'react-router-dom';
import CRDT from '../../core/crdt-linear-ll/crdt';
import { getRandomColor } from '../../utils/utils';
import { io } from 'socket.io-client';
import {remoteInsertOnEditor, remoteDeleteOnEditor, remoteReplaceOnEditor} from '../../core/editorWithCRDT/editorWithCRDT';

const { REACT_APP_SOCKET_URL } = process.env;

const crdt = new CRDT();

const socket = io(String(REACT_APP_SOCKET_URL), {
  path: '/socket/socket',
});

const NAVBAR_HEIGHT = 70;
const WIDGET_HEIGHT = 70;

const Editor = ({ documentContent }: { documentContent: CharMap } ) => {
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);
  const [cursorDebounce] = useDebounce();
  const { data: cachedProfile } = useGetProfileQuery();
  const RANDOM_COLOR = getRandomColor();
  const profile = Object.assign(cachedProfile, {color: RANDOM_COLOR});
  const { document_id } = useParams();
  const cursorMap = useRef<Map<string, Cursor>>(new Map());
  const [onlineUserInfo, setOnlineUserInfo] = useRecoilState(onlineUserState);
  
  useEffect(() => {
    socket.connect();
    socket.emit(
      'joinroom',
      document_id,
      profile,
      setOnlineUserInfo
    );
    
    return () => {
      socket.disconnect();
    };
  }, []);

  useLayoutEffect(() => {
    if (editor) {
      if (Object.keys(documentContent).length > 0) {
        Object.keys(documentContent).forEach((key) => {
          documentContent[key] = JSON.parse(documentContent[key].toString());
        });
      crdt.syncDocument(documentContent);
      editor.setValue(crdt.toString());
      editor.focus();
    }
  }
  }, [editor]);

  useEffect(() => {
    if (editor) {

      socket.on('new-user', (user) => {
        setOnlineUserInfo((onlineUserInfo) => [...onlineUserInfo, user]);
      });

      socket.on('remote-insert', (data) => {
        remoteInsertOnEditor(...crdt.remoteInsert(data), editor);
      });

      socket.on('remote-delete', (data) => {
        const [deleteStartIndex, deleteEndIndex] = crdt.remoteDelete(data);
        if (deleteStartIndex !== null && deleteEndIndex !== null) {
          remoteDeleteOnEditor(deleteStartIndex, deleteEndIndex, editor);
        }
      });

      socket.on('remote-replace', (data) => {
        remoteReplaceOnEditor(...crdt.remoteReplace(data), editor);
      });

      socket.on('remote-cursor', (data) => {
        const { id, profile, cursorPosition } = data;
        if (!cursorMap.current.has(id)) {
          cursorMap.current.set(id, new Cursor(profile.color, profile.name));
        }
        cursorMap.current.get(id)?.updateCursor(editor, cursorPosition);
      });

      socket.on('delete-cursor', (data) => {
        const { id } = data;
        cursorMap.current.get(id)?.removeCursor();
        cursorMap.current.delete(id);
        const leftUser = onlineUserInfo.filter((user) => user.id !== id);
        setOnlineUserInfo(() => [...leftUser]);
      });
    }
    return () => {
      socket.removeAllListeners();
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
    editor.on('beforeChange', (_, change: CodeMirror.EditorChange) => {
      if (change.origin === 'setValue' || change.origin === 'remote') {
        return;
      }

      const fromIdx = editor.indexFromPos(change.from);
      const toIdx = editor.indexFromPos(change.to);
      const content = change.text.join('\n');
      let eventName = '';
      let char;
      switch (change.origin) {
        case 'paste':
          char = crdt.localInsertRange(fromIdx, content);
          eventName = 'local-insert';
          break;
        case '+input':
          char = crdt.localInsertRange(fromIdx, content);
          eventName = 'local-insert';
          break;
        case '*compose':
          if (fromIdx === toIdx) {
            char = crdt.localInsertRange(fromIdx, content);
            eventName = 'local-insert';
          } else {
            char = crdt.localReplace(fromIdx, content);
            eventName = 'local-replace';
          }
          break;
        case '+delete':
          char = crdt.localDelete(fromIdx, toIdx);
          eventName = 'local-delete';
          break;
        default:
          if (fromIdx === toIdx) {
            char = crdt.localInsertRange(fromIdx, content);
            eventName = 'local-insert';
          } else {
            char = crdt.localDelete(fromIdx, toIdx);
            eventName = 'local-delete';
          }
      }

      socket.emit(eventName, char);
    });

    editor.on('cursorActivity', () => {
      cursorDebounce(
        setTimeout(() => {
          const cursorPosition = editor.getCursor();
          socket.emit('cursor-moved', {
            cursorPosition,
            profile
          });
        }, 100)
      );
    });
  }
  }, [editor]);

  const editorOptions = useMemo(() => {
    return {
      spellChecker: false,
      placeholder: 'Write document here and share!',
      minHeight: `calc(100vh - ${NAVBAR_HEIGHT + WIDGET_HEIGHT}px)`,
      maxHeight: `calc(100vh - ${NAVBAR_HEIGHT + WIDGET_HEIGHT}px)`,
      sideBySideFullscreen: false,
      toolbar: ['side-by-side', 'preview', 'fullscreen'],
      unorderedListStyle: '-',
      status: false,
      shortcuts: {
        toggleUnorderedList: null
      }
    } as SimpleMDE.Options;
  }, []);

  const getCmInstanceCallback = useCallback((cm: CodeMirror.Editor) => {
    setEditor(cm);
  }, []);

  return (
    <>
      <SimpleMDEReact options={editorOptions} getCodemirrorInstance={getCmInstanceCallback} />
    </>
  );
};

export { Editor };

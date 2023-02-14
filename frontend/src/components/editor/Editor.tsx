import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../../atoms/onlineUserAtom';
import useDebounce from '../../hooks/useDebounce';
import useGetProfileQuery from '../../query/profile/useGetProfileQuery';
import { getRandomColor } from '../../utils/utils';
import socket from '../../core/sockets/sockets';
import CRDT from '../../core/crdt-linear-ll/crdt';
import { Cursor } from '../../core/cursor/cursor';
import {remoteInsertOnEditor, remoteDeleteOnEditor, remoteReplaceOnEditor} from '../../core/editorWithCRDT/editorWithCRDT';

type CursorInfo = {
  id: string, 
  profile: {color:string, name: string}, 
  cursorPosition: CodeMirror.Position
};

const NAVBAR_HEIGHT = 70;
const WIDGET_HEIGHT = 70;
const crdt = new CRDT();

const Editor = ({ documentContent }: { documentContent: CharMap } ) => {
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);
  const { document_id } = useParams();
  const { data: cachedProfile } = useGetProfileQuery();
  const RANDOM_COLOR = getRandomColor();
  const profile = Object.assign(cachedProfile, {color: RANDOM_COLOR});
  const [cursorDebounce] = useDebounce();
  const cursorMap = useRef<Map<string, Cursor>>(new Map());
  const [onlineUserInfo, setOnlineUserInfo] = useRecoilState(onlineUserState);

  useEffect(() => {
    socket.connect();
    socket.emit('joinroom', document_id, profile, setOnlineUserInfo);
    
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (editor) {
      const addNewUser = (newUser: OnlineUserType) => setOnlineUserInfo((onlineUserInfo) => [...onlineUserInfo, newUser]);
      const emitRemoteInsert = (chars: Char[]) => remoteInsertOnEditor(...crdt.remoteInsert(chars), editor);
      const emitRemoteReplace = (char: Char) => remoteReplaceOnEditor(...crdt.remoteReplace(char), editor);
      const emitRemoteDelete = (chars: Char[]) => {
        const [deleteStartIndex, deleteEndIndex] = crdt.remoteDelete(chars);
        if (deleteStartIndex !== null && deleteEndIndex !== null) {
          remoteDeleteOnEditor(deleteStartIndex, deleteEndIndex, editor);
        }
      };
      const emitCursorPosition = (cursorInfo: CursorInfo ) => {
        const { id, profile, cursorPosition } = cursorInfo;
        if (!cursorMap.current.has(id)) {
          cursorMap.current.set(id, new Cursor(profile.color, profile.name));
        }
        cursorMap.current.get(id)?.updateCursor(editor, cursorPosition);
      };
      const emitDeleteCursor = (userId: { id: string }) => {
        const { id } = userId;
        cursorMap.current.get(id)?.removeCursor();
        cursorMap.current.delete(id);
        const leftUser = onlineUserInfo.filter((user) => user.id !== id);
        setOnlineUserInfo(() => [...leftUser]);
      };
      
      socket.on('new-user', addNewUser);
      socket.on('remote-insert', emitRemoteInsert);
      socket.on('remote-replace', emitRemoteReplace);
      socket.on('remote-delete', emitRemoteDelete);
      socket.on('remote-cursor', emitCursorPosition);
      socket.on('delete-cursor', emitDeleteCursor);
    }
    return () => {
      socket.removeAllListeners();
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
      const contentKeys = Object.keys(documentContent);
      const isDocumentContent = contentKeys.length > 0; 
      if (isDocumentContent) {
        contentKeys.forEach((key) => {
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
    editor.on('beforeChange', (_, change: CodeMirror.EditorChange) => {
      if (change.origin === 'setValue' || change.origin === 'remote') {
        return;
      }

      const fromIdx = editor.indexFromPos(change.from);
      const toIdx = editor.indexFromPos(change.to);
      const content = change.text.join('\n');

      const [eventName, char] = (function (editorEvent) {
        if (editorEvent === 'paste' || editorEvent === '+input') {
          return ['local-insert', crdt.localInsertRange(fromIdx, content)];
        } 
        if (editorEvent === '+delete') {
          return ['local-delete', crdt.localDelete(fromIdx, toIdx)];
        }
        if (editorEvent === '*compose') {
          return fromIdx === toIdx 
            ? ['local-insert', crdt.localInsertRange(fromIdx, content)] 
            : ['local-replace', crdt.localReplace(fromIdx, content)];
        }
        return fromIdx === toIdx 
          ? ['local-insert', crdt.localInsertRange(fromIdx, content)]
          : ['local-delete', crdt.localDelete(fromIdx, toIdx)];
      })(change.origin);

      socket.emit(eventName, char);
    });

    editor.on('cursorActivity', () => {
      cursorDebounce(
        setTimeout(() => {
          const cursorPosition = editor.getCursor();
          socket.emit('cursor-moved', { cursorPosition, profile });
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
    <SimpleMDEReact options={editorOptions} getCodemirrorInstance={getCmInstanceCallback} />
  );
};

export { Editor };

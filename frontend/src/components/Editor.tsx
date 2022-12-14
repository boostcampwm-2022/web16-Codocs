import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';
import { CRDT } from '../core/crdt-linear-ll/crdt';
import socket from '../core/sockets/sockets';
import { Cursor } from '../core/cursor/cursor';
import useDebounce from '../hooks/useDebounce';
import useProfile from '../hooks/useProfile';
import { useRecoilState } from 'recoil';
import { onlineUserState } from '../atoms/onlineUserAtom';

const NAVBAR_HEIGHT = 70;
const WIDGET_HEIGHT = 70;

interface EditorProps {
  content: any;
}

const Editor = ({ content }: EditorProps) => {
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);
  const [cursorDebounce] = useDebounce();
  const { profile } = useProfile();
  const cursorMap = useRef<Map<string, Cursor>>(new Map());
  const { document_id } = useParams();
  const [crdt] = useState<CRDT>(new CRDT());
  const [onlineUserInfo, setOnlineUserInfo] = useRecoilState(onlineUserState);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit(
      'joinroom',
      document_id,
      profile,
      (users: { id: string; name: string; color: string }[]) => {
        console.log(users);
        setOnlineUserInfo(users);
      }
    );
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (Object.keys(content).length > 0) {
      try {
        Object.keys(content).forEach((key) => {
          content[key] = JSON.parse(content[key]);
        });
      } catch (e) {
        console.log(e);
      }
      crdt.syncDocument(content);
      editor.setValue(crdt.toString());
      editor.focus();
    }

    socket.on('new-user', (user) => {
      console.log(user);
      setOnlineUserInfo((onlineUserInfo) => [...onlineUserInfo, user]);
    });

    socket.on('remote-delete', (data) => {
      crdt.remoteDelete(data, editor.getDoc());
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

    editor?.on('beforeChange', async (_, change: CodeMirror.EditorChange) => {
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
        case '*compose':
          char = crdt.localDelete(fromIdx, toIdx);
          socket.emit('local-delete', char);
          if (content === '') {
            return;
          }
          char = crdt.localInsertRange(fromIdx, content);
          eventName = 'local-insert';
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
      // console.log('EVENT_NAME :', change.origin);
      // console.log('from : ', fromIdx);
      // console.log('to : ', toIdx);
      // console.log('EVENT Value :', change.text);
      socket.emit(eventName, char);
    });

    editor?.on('cursorActivity', () => {
      cursorDebounce(
        setTimeout(() => {
          const cursorPosition = editor.getCursor();
          console.log('CURSOR MOVE');
          socket.emit('cursor-moved', {
            cursorPosition,
            profile
          });
        }, 100)
      );
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [editor, onlineUserInfo]);

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

export default Editor;

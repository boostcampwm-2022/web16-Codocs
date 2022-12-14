import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';
import { CRDT } from '../core/crdt-linear-ll/crdt';
// import socket from '../core/sockets/sockets';
import useProfile from '../hooks/useProfile';
import useDebounce from '../hooks/useDebounce';
import { Cursor } from '../core/cursor';
import socketIOClient, { Socket } from 'socket.io-client';

const NAVBAR_HEIGHT = 70;
const WIDGET_HEIGHT = 70;

interface EditorProps {
  content: any;
}

let crdt: CRDT;
let socket: Socket;
const Editor = ({ content }: EditorProps) => {
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);
  const [cursorDebounce] = useDebounce();
  const { profile } = useProfile();
  const cursorMap = useRef<Map<string, Cursor>>(new Map());
  const { document_id } = useParams();
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    crdt = new CRDT();
    socket = socketIOClient('http://localhost:8100');
    socket.emit('joinroom', document_id, profile.name);
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    if (!editor || !profile) {
      return;
    }

    console.log('EDITOR LINE 40:', content);

    if (Object.keys(content).length > 0) {
      try {
        Object.keys(content).forEach((key) => {
          content[key] = JSON.parse(content[key]);
        });
      } catch (e) {
        console.log(e);
      }
      crdt.syncDocument(content);
      console.log('CHARMAP', crdt.charMap);
      editor.setValue(crdt.toString());
      editor.focus();
    }

    socket.on('new-user', (username: string) => {
      // setUsers([...users, username]);
      // console.log(users);
    });

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('remote-insert', (data) => {
      console.log('REMOTE OP');
      crdt.remoteInsert(data, editor);
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
    });

    editor?.on('beforeChange', (_, change: CodeMirror.EditorChange) => {
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

      socket.emit(eventName, char);
    });

    editor?.on('cursorActivity', () => {
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

    return () => {
      socket.removeAllListeners();
    };
  }, [editor, profile]);

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

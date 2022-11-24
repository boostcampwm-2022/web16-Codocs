import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';
import {crdt} from '../core/crdt-linear/crdt';
import socket from '../core/sockets/sockets';

const Editor = () => {
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);

  useEffect(() => {
    if (editor) {
      socket.on('remote-insert', (data) => {
        console.log('INSERT');
        crdt.remoteInsert(data, editor.getDoc());
      });

      socket.on('remote-delete', (data) => {
        console.log('DELETE');
        crdt.remoteDelete(data, editor.getDoc());
      });
    }

    editor?.on('beforeChange', (_, change: CodeMirror.EditorChange) => {
      if (change.origin === 'setValue' || change.origin === 'remote') {
        return;
      }
      const fromIdx = editor.indexFromPos(change.from);
      const toIdx = editor.indexFromPos(change.to); // 여러 글자 insert시 다름
      const content = change.text.join('\n');
      let eventName = '';
      let char;
      switch (change.origin) {
      case '+input':
      case '*compose': // 한글은 합성 처리 => 원본 글자를 지우고 삽입해야 함.
        char = crdt.localInsert(fromIdx, content);
        eventName = 'local-insert';
        break;
      case '+delete':
        char = crdt.localDelete(fromIdx, toIdx);
        eventName = 'local-delete';
        break;
      default:
      }
      socket.emit(eventName, char);
    });
    return (()=>{
      socket.off('remote-insert');
      socket.off('remote-delete');
    });
  }, [editor]);

  const editorOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false
    } as SimpleMDE.Options;
  }, []);

  const getCmInstanceCallback = useCallback((cm: CodeMirror.Editor) => {
    setEditor(cm);
  }, []);

  return (
    <>
      <SimpleMDEReact
        options={editorOptions}
        getCodemirrorInstance={getCmInstanceCallback}
      />
    </>
  );
};

export default Editor;

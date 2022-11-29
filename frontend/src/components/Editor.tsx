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
        //console.log('REMOTE INSERT!!!!', data);
        //console.log('REMOTE CURSOR: ', editor.getCursor());
        crdt.remoteInsert(data, editor);
      });

      socket.on('remote-delete', (data) => {
        //console.log('DELETE THIS :', data);
        crdt.remoteDeleteRange(data, editor.getDoc());
      });
    }
    
    editor?.on('beforeChange', (_, change: CodeMirror.EditorChange) => {
      if (change.origin === 'setValue' || change.origin === 'remote') {
        return;
      }
      // console.log(change);
      //console.log('CURRENT CURSOR: ', editor.getCursor());
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
        // if (fromIdx !== toIdx) {
        //   editor?.replaceRange(content, tempFrom, tempTo);
        // }
        //   return;
        //   // char = crdt.localDelete(fromIdx, toIdx);
        //   // socket.emit('local-delete', char);
        // }
        char = crdt.localDelete(fromIdx, toIdx);
        socket.emit('local-delete', char);
        if (content === ''){
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
      }
      console.log('EVENT_NAME :', change.origin);
      console.log('from : ', fromIdx);
      console.log('to : ', toIdx);
      console.log('EVENT Value :', change.text);
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
        onCompositionStart={() => console.log('COMPOSITION START') }
        onCompositionUpdate={(e) => console.log('COMPOSITION UPDATE', e)}
        onCompositionEnd={() => console.log('COMPOSITION END')}
      />
    </>
  );
};

export default Editor;

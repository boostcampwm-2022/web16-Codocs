import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';
import {crdt} from '../core/crdt-linear/crdt';
import socket from '../core/sockets/sockets';

const Editor = () => {
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { document_id } = useParams();
  
  useEffect(()=>{
    socket.on('new-user', (data) => {
      crdt.syncDocument(data);
      setIsLoading((loading) => !loading);
    });
    console.log(document_id);
    socket.emit('joinroom', document_id);    
  }, []);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setValue(crdt.toString());
    editor.focus();
    
    socket.on('remote-insert', (data) => {
      crdt.remoteInsert(data, editor);
    });

    socket.on('remote-delete', (data) => {
      crdt.remoteDeleteRange(data, editor.getDoc());
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
        char = crdt.localInsertRange(fromIdx, content);
        eventName = 'local-insert';
        break;

      case '*compose': 
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
        if (fromIdx === toIdx) {
          char = crdt.localInsertRange(fromIdx, content);
          eventName = 'local-insert';
        } else {
          char = crdt.localDelete(fromIdx, toIdx);
          eventName = 'local-delete';
        }
      }
      console.log('EVENT_NAME :', change.origin);
      console.log('from : ', fromIdx);
      console.log('to : ', toIdx);
      console.log('EVENT Value :', change.text);
      socket.emit(eventName, char);
    });
    return (()=>{
      socket.removeAllListeners();
    });
  }, [editor]);
  
  const editorOptions = useMemo(() => {
    const opts = {
      spellChecker: false,
      placeholder: 'Write document here and share!',
      toolbar: [
        'side-by-side',
        'preview',
        'fullscreen',
      ],
      unorderedListStyle: '-',
      status: false,
      shortcuts: {
        toggleUnorderedList: null,
      },
    } as SimpleMDE.Options;

    return opts;
  }, []);

  const getCmInstanceCallback = useCallback((cm: CodeMirror.Editor) => {
    setEditor(cm);
  }, []);

  return (
    <>
      {isLoading === true ? <div>로딩중...</div> : (<SimpleMDEReact
        options={editorOptions}
        getCodemirrorInstance={getCmInstanceCallback}
        onCompositionStart={() => console.log('COMPOSITION START') }
        onCompositionUpdate={(e) => console.log('COMPOSITION UPDATE', e)}
        onCompositionEnd={() => console.log('COMPOSITION END')}
      />)}
    </>
  );
};

export default Editor;

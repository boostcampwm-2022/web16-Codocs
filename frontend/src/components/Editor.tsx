import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';
import { crdt } from '../core/crdt-linear-ll/crdt';
import socket from '../core/sockets/sockets';
import useDebounce from '../hooks/useDebounce';
import { fetchDataFromPath } from '../utils/fetchBeforeRender';

interface EditorProps {
  content: { read(): any };
}

const NAVBAR_HEIGHT = 70;
const WIDGET_HEIGHT = 70;

const Editor = ({ content }: EditorProps) => {
  const editorContent = content.read();
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { document_id } = useParams();
  const [setDebounceTimer] = useDebounce();

  useEffect(() => {
    socket.emit('joinroom', document_id);
  }, []);

  // useEffect(() => {
  //   const getData = async (document_id: string) => {
  //     // const content = await fetchDataFromPath(`/document/${document_id}`);
  //     setIsLoading((loading) => !loading);
  //     console.log(content);
  //     // const document = await JSON.parse(content[document_id]);
  //     // crdt.syncDocument(document);
  //   };
  //   if (document_id != undefined) {
  //     getData(document_id);
  //   }
  // }, [document_id]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    crdt.syncDocument(JSON.parse(editorContent.content));
    console.log(editorContent);
    editor.setValue(crdt.toString());
    editor.focus();

    socket.on('remote-insert', (data) => {
      crdt.remoteInsert(data, editor);
    });

    socket.on('remote-delete', (data) => {
      crdt.remoteDelete(data, editor.getDoc());
    });

    editor?.on('beforeChange', async (_, change: CodeMirror.EditorChange) => {
      setDebounceTimer(() =>
        setTimeout(async () => {
          try {
            // TODO : fetch('#', crdt.charMap);
          } catch (e) {
            throw new Error('Save Failed. Please report it to our GitHub.');
          }
        }, 5000)
      );

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

      const response = await fetch(
        `${process.env.REACT_APP_DEV_URL}/document/${document_id}/save-content`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            content: crdt.charMap
          })
        }
      );
      // try {
      //   axios.post(`http://localhost:8000/document/${document_id}/save-content`, {
      //     content: crdt.charMap
      //   });
      // } catch (e) {
      //   console.log(e);
      // }
    });
    return () => {
      socket.removeAllListeners();
    };
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
      <SimpleMDEReact
        options={editorOptions}
        getCodemirrorInstance={getCmInstanceCallback}
        onCompositionStart={() => console.log('COMPOSITION START')}
        onCompositionUpdate={(e) => console.log('COMPOSITION UPDATE', e)}
        onCompositionEnd={() => console.log('COMPOSITION END')}
      />
    </>
  );
};

export default Editor;

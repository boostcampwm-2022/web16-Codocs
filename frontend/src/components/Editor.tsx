import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SimpleMDEReact from 'react-simplemde-editor';
import SimpleMDE from 'easymde';
import CodeMirror from 'codemirror';
import 'easymde/dist/easymde.min.css';

const Editor = () => {
  const [editor, setEditor] = useState<CodeMirror.Editor | null>(null);

  const getCmInstanceCallback = useCallback((cm: CodeMirror.Editor) => {
    setEditor(cm);
  }, []);

  useEffect(() => {
    editor?.on('beforeChange', (instance: CodeMirror.Editor, change: CodeMirror.EditorChange) => {
      const from = editor.indexFromPos(change.from);
      const to = editor.indexFromPos(change.to);
      const content = change.text.join('\n');

      console.log(from, to, content);
    });
  }, [editor]);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false
    } as SimpleMDE.Options;
  }, []);

  return (
    <>
      <SimpleMDEReact
        options={autofocusNoSpellcheckerOptions}
        getCodemirrorInstance={getCmInstanceCallback}
      />
    </>
  );
};

export default Editor;

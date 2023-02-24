import CodeMirror from 'codemirror';

const addChangeOnEditor = (editor: CodeMirror.Editor, from: CodeMirror.Position, to: CodeMirror.Position, text: string) => {
    const adjust = editor
      .getDoc()
      .listSelections()
      .findIndex(({ anchor, head }) => {
        return CodeMirror.cmpPos(anchor, head) == 0 && CodeMirror.cmpPos(anchor, from) == 0;
      });
    editor.operation(() => {
      editor.getDoc().replaceRange(text, from, to, 'remote');
      if (adjust > -1) {
        const range = editor.getDoc().listSelections()[adjust];
        if (
          range &&
          CodeMirror.cmpPos(range.head, CodeMirror.changeEnd({ from, to, text: [text] })) == 0
        ) {
          const ranges: CodeMirror.Range[] = editor.getDoc().listSelections().slice();
          ranges[adjust] = {
            ...ranges[adjust],
            anchor: from,
            head: to
          };
          editor.getDoc().setSelections(ranges);
        }
      }
    });
};

const remoteInsertOnEditor = (insertedIndex: number, insertedChars: string, editor: CodeMirror.Editor) => {
  const position = editor.getDoc().posFromIndex(insertedIndex);
  addChangeOnEditor(editor, position, position, insertedChars);
};

const remoteDeleteOnEditor = (deleteStartIndex: number, deleteEndIndex: number, editor: CodeMirror.Editor) => {
  const positionFrom = editor.getDoc().posFromIndex(deleteStartIndex);
  const positionTo = editor.getDoc().posFromIndex(deleteEndIndex);
  addChangeOnEditor(editor, positionFrom, positionTo, '');
};

const remoteReplaceOnEditor = (replacedIndex: number, replacedChar: string, editor: CodeMirror.Editor) => {
  const positionFrom = editor.getDoc().posFromIndex(replacedIndex);
  const positionTo = editor.getDoc().posFromIndex(replacedIndex + 1);
  addChangeOnEditor(editor, positionFrom, positionTo, replacedChar);
};

export {remoteInsertOnEditor, remoteDeleteOnEditor, remoteReplaceOnEditor};

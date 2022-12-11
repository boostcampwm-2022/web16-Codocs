import CodeMirror from 'codemirror';

class Cursor {
  marker?: CodeMirror.TextMarker;

  color: string;

  name: string;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
  }

  updateCursor(editor: CodeMirror.Editor, cursorPosition: CodeMirror.Position) {
    this.removeCursor();
    const cursorCoords = editor.cursorCoords(cursorPosition);
    const cursorHolder = document.createElement('span');
    const height = cursorCoords.bottom - cursorCoords.top;

    cursorHolder.style.borderLeftColor = this.color;
    cursorHolder.style.height = `${height}px`;

    this.marker = editor.setBookmark(cursorPosition, {
      widget: cursorHolder,
      insertLeft: true
    });
  }

  removeCursor() {
    if (this.marker) {
      this.marker.clear();
      this.marker = undefined;
    }
  }
}

export { Cursor };

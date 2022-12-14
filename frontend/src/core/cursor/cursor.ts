import CodeMirror from 'codemirror';

class Cursor {
  marker?: CodeMirror.TextMarker;

  color: string;

  name: string;

  height: number;

  constructor(color: string, name: string) {
    this.color = color;
    this.name = name;
    this.height = 0;
  }

  updateCursor(editor: CodeMirror.Editor, cursorPosition: CodeMirror.Position) {
    this.removeCursor();
    const cursorCoords = editor.cursorCoords(cursorPosition);
    const cursorHolder = document.createElement('span');
    this.height = cursorCoords.bottom - cursorCoords.top;

    cursorHolder.classList.add('remote-cursor');
    cursorHolder.style.borderLeftColor = this.color;
    cursorHolder.style.height = `${this.height}px`;

    this.showCursorName(cursorHolder);

    this.marker = editor.setBookmark(cursorPosition, {
      widget: cursorHolder,
      insertLeft: true
    });
  }

  private showCursorName(cursorHolder: HTMLSpanElement) {
    const nameHolder = document.createElement('div');
    nameHolder.classList.add('remote-cursor-name');

    cursorHolder.addEventListener('mouseenter', () => {
      nameHolder.innerHTML = this.name;
      nameHolder.style.top = `-${this.height}px`;
      nameHolder.style.backgroundColor = this.color;
      nameHolder.style.color = this.getContrastColor(this.color);

      nameHolder.classList.remove('hide');
      cursorHolder.appendChild(nameHolder);
    });

    cursorHolder.addEventListener('mouseleave', () => {
      nameHolder.classList.add('hide');

      nameHolder.parentNode?.removeChild(nameHolder);
    });
  }

  private getContrastColor(color: string) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substring(0, 0 + 2), 16);
    const c_g = parseInt(hex.substring(2, 2 + 2), 16);
    const c_b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 155 ? '#222222' : '#FFFFFF';
  }

  removeCursor() {
    if (this.marker) {
      this.marker.clear();
      this.marker = undefined;
    }
  }
}

export { Cursor };

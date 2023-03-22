class Modes {
  constructor({ text, selection, action }) {
    this.text = text;
    this.selection = selection;
    this.action = action;
  }

  bold() {
    var isBold = false;
    var prev = [];
    var newText = '';
    var append = '';
    for (const [i, char] of this.text.substring(0, this.selection.anchorOffset).split('').entries()) {
      prev.push(char);
      if (prev.slice(-3).join('') === '<b>') {
        isBold = true;
      }
      if (prev.slice(-4).join('') === '</b>') {
        isBold = false;
      }
      // goto next until we get to selection
      if (i < this.selection.focusOffset) {
        continue;
      }
      // process the selection now
      // add
      if (this.action === 'add' && i === this.selection.focusOffset && !isBold) {
        newText += '<b>';
        prev = '<b>'.split('');
        append = '</b>';
      }
      // del
      if (this.action === 'del' && i === this.selection.focusOffset && isBold) {
        newText += '</b>';
        prev = '</b>'.split('');
        append = '<b>';
      }
      // remove tags in middle
      if (i > this.selection.anchorOffset) {
        if (prev.slice(-3).join('') === '<b>') {
          newText = newText.substring(0, newText.length - 3);          
          append = '<b>';
        }
        if (prev.slice(-4).join('') === '</b>') {
          newText = newText.substring(0, newText.length - 4);
          append = '</b>';
        }
      }
      newText += char;
    }
    newText += append;

    this.text = this.text.substring(0, this.selection.focusOffset)
                  + newText
                  + this.text.substring(this.selection.anchorOffset, this.text.length);

    console.log(this.text);
    return this.text;
  }
}

export default Modes;
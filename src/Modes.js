class Modes {
  constructor({ text, selection, action }) {
    this.text = text;
    this.selection = selection;
    this.action = action;
  }

  /* The selection API is really weird. For now, just fingerprint the selection with a unique token and 
     get the offset with indexOf()
  */
  bold() {
    const token = '!@#$%^&*(';
    let anchorNode = this.selection.anchorNode;

    let node = anchorNode;
    const before = [];
    while (node.previousSibling != null) {
      node = node.previousSibling;
      before.unshift(node.textContent);
    }

    const selected = 
    (anchorNode.textContent.substring(0, Math.min(this.selection.anchorOffset, this.selection.focusOffset))
    + token
    + anchorNode.textContent.substring(
        Math.min(this.selection.anchorOffset, this.selection.focusOffset), 
        Math.max(this.selection.anchorOffset, this.selection.focusOffset) + anchorNode.textContent.length
      )
    );

    node = anchorNode;
    const after = [];
    while (node.nextSibling != null) {
      node = node.nextSibling;
      after.push(node.textContent);
    }

    const newText = before.join('') + selected + after.join('');
    var start = newText.indexOf(token);
    var end = newText.indexOf(token) + Math.abs(this.selection.anchorOffset - this.selection.focusOffset);

    console.log("selected:");
    console.log(this.text.substring(start, end));
    console.log(`start=${start}, end=${end}`);

    return this.text;
  }
}

export default Modes;
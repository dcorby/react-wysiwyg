class Modes {
  constructor({ text, editable, selection, action }) {
    this.text = text;
    this.editable = editable;
    this.selection = selection;
    this.action = action;
  }

  /* The selection API is really weird. For now, just fingerprint the selection with a unique token and 
     get the offset with indexOf()
  */
  update(tag) {
    const token = '!@#$%^&*';
    const offset = [this.selection.anchorOffset, this.selection.focusOffset];
    const anchorNode = this.selection.anchorNode;
    const replace = 
      (anchorNode.textContent.substring(0, Math.min(offset[0], offset[1]))
      + token
      + anchorNode.textContent.substring(
          Math.min(offset[0], offset[1]), 
          Math.max(offset[0], offset[1]) + anchorNode.textContent.length
        )
      );
    const original = anchorNode.textContent;
    anchorNode.textContent = replace;

    // Get decoded HTML (oof!) https://stackoverflow.com/questions/5796718/html-entity-decode
    const tmp = document.createElement('textarea');
    tmp.innerHTML = this.editable.current.innerHTML;
    const tokenized = tmp.value;
    anchorNode.textContent = original;

    // Get start and end bounds
    const start = tokenized.indexOf(token);
    const end = tokenized.indexOf(token) + Math.abs(offset[0] - offset[1]) - 1;

    // Get a char array from the current text
    const chars = this.text.split('');

    // Get all the tags
    const tags = {};
    let tagIndex = -1;
    for (const [i, char] of chars.entries()) {
      if (char === '<') {
        tagIndex = i;
        tags[tagIndex] = '';
      }
      if (tagIndex > -1) {
        tags[tagIndex] += char;
      }
      if (char === '>') {
        tagIndex = -1;
      }
    }

    // Get isActive for each char, where tags are -1
    const active = [];
    let isActive = false;
    tagIndex = -1;
    for (const [i, char] of chars.entries()) {
      if (i in tags) {
        tagIndex = i;
      }
      if (tagIndex > -1 && i >= tagIndex + tags[tagIndex].length) {
        tagIndex = -1;
      }
      if (chars.slice(i-3, i).join('') === `<${tag}>`) {
        isActive = true;
      }
      if (chars.slice(i-4, i).join('') === `</${tag}>`) {
        isActive = false;
      }
      if (tagIndex > -1) {
        active.push(-1);
      } else {
        if (isActive) {
          active.push(1);
        } else {
          active.push(0);
        }
      }
    }

    // Flip isActive for the range
    for (const [i, char] of chars.entries()) {
      if (i >= start && i <= end) {
        if (active[i] !== -1) {
          if (active[i] == 0) {
            active[i] = 1;
          } else {
            active[i] = 0;
          }
        }
      }
    }

    // Rebuild text from chars, remove existing mode tags, and insert new ones as isActive flips
    let text = '';
    let skip = false;
    let prevActive = false;
    for (const [i, char] of chars.entries()) {
      if (char === '<' && chars[i+1] === tag) {
        skip = true;
      }
      if (char === '<' && chars[i+2] === tag) {
        skip = true;
      }
      if (!skip) {
        if (active[i] && !prevActive) {
          text += `<${tag}>`;
        }
        if (!active[i] && prevActive) {
          text += `</${tag}>`;
        }
        text += char;
        prevActive = active[i];
      }
      if (skip && char === '>') {
        skip = false;
      }
    }

    this.text = text;
    return this.text;
  }
}

export default Modes;
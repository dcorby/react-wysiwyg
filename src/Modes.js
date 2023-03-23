class Modes {
  constructor({ text, offset, tokenized, action }) {
    this.text = text;
    this.offset = offset;
    this.tokenized = tokenized;
    this.action = action;
  }

  /* The selection API is really weird. For now, just fingerprint the selection with a unique token and 
     get the offset with indexOf()
  */
  bold() {

    const token = '!@#$%^&*';
    const start = this.tokenized.indexOf(token);
    const end = this.tokenized.indexOf(token) + Math.abs(this.offset[0] - this.offset[1]) - 1;

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

    // Get isBold for each char, where tags are -1
    const bold = [];
    let isBold = false;
    tagIndex = -1;
    for (const [i, char] of chars.entries()) {
      if (i in tags) {
        tagIndex = i;
      }
      if (tagIndex > -1 && i >= tagIndex + tags[tagIndex].length) {
        tagIndex = -1;
      }
      if (chars.slice(i-3, i).join('') === '<b>') {
        isBold = true;
      }
      if (chars.slice(i-4, i).join('') === '</b>') {
        isBold = false;
      }
      if (tagIndex > -1) {
        bold.push(-1);
      } else {
        if (isBold) {
          bold.push(1);
        } else {
          bold.push(0);
        }
      }
    }

    // Flip isBold for the range
    for (const [i, char] of chars.entries()) {
      if (i >= start && i <= end) {
        if (bold[i] !== -1) {
          if (bold[i] == 0) {
            bold[i] = 1;
          } else {
            bold[i] = 0;
          }
        }
      }
    }

    // Rebuild text from chars, remove existing b tags, and insert new ones as isBold flips
    let text = '';
    let skip = false;
    let prevBold = false;
    for (const [i, char] of chars.entries()) {
      if (char === '<' && chars[i+1] === 'b') {
        skip = true;
      }
      if (char === '<' && chars[i+2] === 'b') {
        skip = true;
      }
      if (!skip) {
        if (bold[i] && !prevBold) {
          text += '<b>';
        }
        if (!bold[i] && prevBold) {
          text += '</b>';
        }
        text += char;
        prevBold = bold[i];
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
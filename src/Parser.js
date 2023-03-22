class Parser {
  constructor() {
    this.text = '';
    this.lines = [];
  }
  update(text) {
    this.text = text;
  }
  parse() {
    this.lines = [];
    var parts = this.text.split('\n');
    var line = '';
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        if (part.trim() !==  '' && !part.includes('\n')) {
          this.lines.push(part);
        }
      } else {
        line += part;
        this.lines.push(line);
        line = '';
      }
    });
    return this.lines.map((line) => `<p>${line}</p>`).join('\n');
  }
}
export default Parser;
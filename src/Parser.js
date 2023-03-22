class Parser {
  constructor(diffs) {
    this.diffs = diffs;
    this.lines = [];
  }
  parse() {
    this.lines = [];
    var line = '';
    this.diffs.forEach((token, i) => {
      if (token[0] !== -1) {
        if (token[1].includes('\n')) {
          var parts = token[1].split('\n');
          parts.forEach((part, j) => {
            if (j === parts.length - 1) {
              line += part;
            } else {
              line += part;
              this.lines.push(line);
              line = '';
            }
          });
        } else {
          line += token[1];
        }
        if (i === this.diffs.length - 1) {
          if (line.trim() !==  '' && !line.includes('\n')) {
              this.lines.push(line);
          }
        }
      }
    });
    return this.lines.map((line) => `<p>${line}</p>`).join('\n');
  }
}
export default Parser;
class Modes {
  constructor({ text, selection, action }) {
    this.text = text;
    this.selection = selection;
    this.action = action;
  }

  bold() {
    console.log('bolding...');
    // Loop through selection, each character has a flag (isBold), insert/remove tags to make sure each is toggled
    // Start by scanning index=0 back to last bold tag, or start of editable
  }
}

export default Modes;
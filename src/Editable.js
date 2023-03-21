import React from 'react';

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: null
    };
  }

  render() {
    // Why display:inline-block?
    // https://stackoverflow.com/questions/56535416/innertext-on-content-editable-doubling-some-line-breaks
    // https://stackoverflow.com/questions/18552336/prevent-contenteditable-adding-div-on-enter-chrome/24689420#24689420
    return (
      <div id='editor'
         style={{ whiteSpace: 'pre-wrap', display: 'inline-block', width: '100%' }}
         ref={this.props.innerRef}
         contentEditable='true'
         suppressContentEditableWarning='true'
         onInput={(event) => { this.props.handleEdit(event); }}>
      </div>
    );
  }
}

// "forwardref in a class component"
// https://stackoverflow.com/questions/51526461/how-to-use-react-forwardref-in-a-class-based-component
export default React.forwardRef((props, ref) => <Editable
  innerRef={ref} {...props}
/>);

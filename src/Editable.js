import React from 'react';

class Editable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: null,
    };
  }

  render() {
    return (
      <div id='editor'
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

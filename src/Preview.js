import React from 'react';
import * as Icons from './icons';
import './styles/Global.css';
import './styles/Preview.css';

class Preview extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div id='preview' className={this.props.hidden ? 'hidden' : undefined}>
        <div id='bar'>
        <div id='title'>HTML</div>
          <Icons.Close className='icon' 
                style={{ 'flexGrow': 0, 'cursor': 'pointer' }} 
                data-mode='html'
                onClick={(event) => { this.props.toggleMode(event); }} />
        </div>
        <div id='html'>
        </div>
      </div>
    );
  }
}

export default Preview;
import React, { useRef } from "react";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import styles from './styles/Editor.module.css';

const Foo = styled.div`
  display: flex;
  flex-direction: column;
`;

class Editor extends React.Component {

  setFonts() {
    Array(
      'Arial',
      'Courier New',
      'Helvetica',
      'Tahoma',
      'Terminal',
      'Times New Roman'
    ).forEach(elem => {
      this.fontsRef.current.push(elem);
    });
    console.log(this.fontsRef.current);
  }

  constructor(props) {
    super(props);
    this.fontsRef = React.createRef();
    this.fontsRef.current = [];
    this.setFonts();
  }


  render() {
    return (
    <>
      <UndoIcon className={styles.icon} />
      <RedoIcon className={styles.icon} />
      <FormatBoldIcon className={styles.icon} />
      <FormatItalicIcon className={styles.icon} />
      <FormatUnderlinedIcon className={styles.icon} />

      <FormControl sx={{ m: 0, maxHeight: 24 }} size="small">
        <Select
          sx={{ m: 0, minWidth: 120, maxHeight: 24, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          labelId="label-id"
          id="id"
          displayEmpty
          onChange={handleChange}
        >
          {this.fontsRef.current.map((elem, idx) => (
            <MenuItem key={idx} value={elem}>{elem}</MenuItem>
           ))
          }
        </Select>
      </FormControl>

      <div className={styles.editor} contentEditable="true" suppressContentEditableWarning="true">
        foo bar <h5>baz</h5>
      </div>
    </>
    );
  }
}

function handleChange() {
  console.log('handleChange() called...');
}

export default Editor;

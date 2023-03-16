import React, { useRef } from "react";

/* Icons */
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';

import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import EmojiSymbolsIcon from '@mui/icons-material/EmojiSymbols';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import PreviewIcon from '@mui/icons-material/Preview';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import HtmlIcon from '@mui/icons-material/Html';
import CodeIcon from '@mui/icons-material/Code';
import DataArrayIcon from '@mui/icons-material/DataArray';

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

  sx = {
    'Select': { m: 0, maxHeight: 24, fontSize: 12, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }
  }

  setFontFamilies() {
    Array(
      'Arial',
      'Courier New',
      'Helvetica',
      'Tahoma',
      'Terminal',
      'Times New Roman'
    ).forEach(elem => {
      this.fontFamiliesRef.current.push(elem);
    });
  }

  setFontSizes() {
    Array(8, 10, 12, 14, 18, 24, 36)
        .forEach(size => {
      this.fontSizesRef.current.push(`${size}pt`);
    });
  }

  setElements() {
    Array({ 'p': 'Paragraph' },
          { 'h1': 'Heading 1' },
          { 'h2': 'Heading 2' },
          { 'h3': 'Heading 3' },
          { 'h4': 'Heading 4' },
          { 'h5': 'Heading 5' },
          { 'h6': 'Heading 6' },
          { 'pre': 'Preformatted' })
        .forEach(elem => {
        this.elementsRef.current.push(elem);
    });
  }

  constructor(props) {
    super(props);
    // Set font families
    this.fontFamiliesRef = React.createRef();
    this.fontFamiliesRef.current = [];
    this.setFontFamilies();
    // Set font sizes
    this.fontSizesRef = React.createRef();
    this.fontSizesRef.current = [];
    this.setFontSizes();
    // Set elements
    this.elementsRef = React.createRef();
    this.elementsRef.current = [];
    this.setElements();
  }


  render() {
    return (
    <>
      <div className='toolbar'>
        <UndoIcon className={styles.icon} />
        <RedoIcon className={styles.icon} />
        <FormatBoldIcon className={styles.icon} />
        <FormatItalicIcon className={styles.icon} />
        <FormatUnderlinedIcon className={styles.icon} />

        {/* Font families select */}
        <FormControl sx={{ m: 0, maxHeight: 24 }} size="small">
          <Select
            sx={ this.sx['Select'] }
            labelId="font-family-select-label"
            id="font-family-select"
            defaultValue='Arial'
            displayEmpty
            onChange={handleChange}
          >
            {this.fontFamiliesRef.current.map((elem, idx) => (
              <MenuItem key={idx} value={elem}>{elem}</MenuItem>
             ))
            }
          </Select>
        </FormControl>

        {/* Font sizes select */}
        <FormControl sx={{ m: 0, maxHeight: 24 }} size="small">
          <Select
            sx={ this.sx['Select'] }
            labelId="font-sizes-select-label"
            id="font-sizes-select"
            defaultValue='12pt'
            displayEmpty
            onChange={handleChange}
          >
            {/* Set font sizes */}
            {this.fontSizesRef.current.map((elem, idx) => (
              <MenuItem key={idx} value={elem}>{elem}</MenuItem>
             ))
            }
          </Select>
        </FormControl>

        {/* Elements select */}
        <FormControl sx={{ m: 0, maxHeight: 24 }} size="small">
          <Select
            sx={ this.sx['Select'] }
            labelId="elements-select-label"
            id="elements-select"
            defaultValue='p'
            displayEmpty
            onChange={handleChange}
          >
            {/* Set elements */}
            {this.elementsRef.current.map((elem, idx) => (
              <MenuItem key={idx} value={Object.entries(elem)[0][0]}>{Object.entries(elem)[0][1]}</MenuItem>
             ))
            }
          </Select>
        </FormControl>

        <MoreHorizIcon className={styles.icon} />
      </div>
      {/* end: .toolbar */}

      <div className='toolbar'>
         <FormatAlignLeftIcon className={styles.icon} />
         <FormatAlignCenterIcon className={styles.icon} />
         <FormatAlignRightIcon className={styles.icon} />
         <FormatAlignJustifyIcon className={styles.icon} />
         <FormatIndentIncreaseIcon className={styles.icon} />
         <FormatListNumberedIcon className={styles.icon} />
         <FormatListBulletedIcon className={styles.icon} />
         <FormatColorTextIcon className={styles.icon} />
         <BorderColorIcon className={styles.icon} />
         <AutoFixHighIcon className={styles.icon} />
         <FormatClearIcon className={styles.icon} />
         <InsertPageBreakIcon className={styles.icon} />
         <EmojiSymbolsIcon className={styles.icon} />
         <InsertEmoticonIcon className={styles.icon} />
      </div>
      {/* end: .toolbar */}
 
      <div className='toolbar'>
        <FullscreenIcon className={styles.icon} />
        <PreviewIcon className={styles.icon} />
        <SaveIcon className={styles.icon} />
        <PrintIcon className={styles.icon} />
        <InsertPhotoIcon className={styles.icon} />
        <InsertLinkIcon className={styles.icon} />
        <HtmlIcon className={styles.icon} />
        <CodeIcon className={styles.icon} />
        <DataArrayIcon className={styles.icon} />
      </div>
      {/* end: .toolbar */}
 
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

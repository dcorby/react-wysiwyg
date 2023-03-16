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
import VisibilityIcon from '@mui/icons-material/Visibility';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styles from './styles/Editor.module.css';

import MenuListComposition from "./MenuListComposition";
import menuItems from "./menuItems.json"

const SmallKeyboardArrowDownIcon = () => {
  return (
    <KeyboardArrowDownIcon style={{ width: '0.6em', height: '0.6em', color: '#666666' }} />
  );
};

class Editor extends React.Component {

  sx = {
    'Select': { m: 0, fontSize: 12, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } },
    'MenuItem': { fontSize: 12, py: 0.50, px: 0.75 }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div id={styles.container}>
      <div className={styles.toolbar}>
        <MenuListComposition label={'File'} items={menuItems['file']}></MenuListComposition>
        <MenuListComposition label={'Edit'} items={menuItems['edit']}></MenuListComposition>
        <MenuListComposition label={'View'} items={menuItems['view']}></MenuListComposition>
        <MenuListComposition label={'Insert'} items={menuItems['insert']}></MenuListComposition>
        <MenuListComposition label={'Format'} items={menuItems['format']}></MenuListComposition>
        <MenuListComposition label={'Tools'} items={menuItems['tools']}></MenuListComposition>
      </div>

      <div className={styles.toolbar}>
        <UndoIcon className={styles.icon} />
        <RedoIcon className={styles.icon} />
        <FormatBoldIcon className={styles.icon} />
        <FormatItalicIcon className={styles.icon} />
        <FormatUnderlinedIcon className={styles.icon} />

        {/* Font families select */}
        <FormControl sx={{ mx: 0 }} size="small">
          <Select
            sx={ this.sx['Select'] }
            labelId="font-family-select-label"
            id="font-family-select"
            defaultValue='arial'
            displayEmpty
            onChange={handleChange}
            IconComponent={SmallKeyboardArrowDownIcon}
          >
            {menuItems["fontFamilies"].map((elem, idx) => (
              <MenuItem sx={ this.sx['MenuItem'] } key={idx} value={Object.entries(elem)[0][0]}>{Object.entries(elem)[0][1]}</MenuItem>
             ))
            }
          </Select>
        </FormControl>

        {/* Font sizes select */}
        <FormControl sx={{ mx: 0 }} size="small">
          <Select
            sx={ this.sx['Select'] }
            labelId="font-sizes-select-label"
            id="font-sizes-select"
            defaultValue='14'
            displayEmpty
            onChange={handleChange}
            IconComponent={SmallKeyboardArrowDownIcon}
          >
            {/* Set font sizes */}
            {menuItems["fontSizes"].map((elem, idx) => (
              <MenuItem sx={ this.sx['MenuItem'] } key={idx} value={Object.entries(elem)[0][0]}>{Object.entries(elem)[0][1]}</MenuItem>
             ))
            }
          </Select>
        </FormControl>

        {/* Elements select */}
        <FormControl sx={{ mx: 0 }} size="small">
          <Select
            sx={ this.sx['Select'] }
            labelId="elements-select-label"
            id="elements-select"
            defaultValue='p'
            displayEmpty
            onChange={handleChange}
            IconComponent={SmallKeyboardArrowDownIcon}
          >
            {/* Set elements */}
            {menuItems["elements"].map((elem, idx) => (
              <MenuItem sx={ this.sx['MenuItem'] } key={idx} value={Object.entries(elem)[0][0]}>{Object.entries(elem)[0][1]}</MenuItem>
             ))
            }
          </Select>
        </FormControl>

        <MoreHorizIcon className={styles.icon} />
      </div>
      {/* end: .toolbar */}

      <div className={styles.toolbar}>
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
 
      <div className={styles.toolbar}>
        <FullscreenIcon className={styles.icon} />
        <VisibilityIcon className={styles.icon} />
        <SaveIcon className={styles.icon} />
        <PrintIcon className={styles.icon} />
        <InsertPhotoIcon className={styles.icon} />
        <InsertLinkIcon className={styles.icon} />
        <CodeIcon className={styles.icon} />
        <DataArrayIcon className={styles.icon} />
        <HtmlIcon className={styles.icon} />
      </div>
      {/* end: .toolbar */}
 
      <div className={styles.editor} contentEditable="true" suppressContentEditableWarning="true">
      </div>
    </div>
    );
  }
}

function handleChange() {
  console.log('handleChange() called...');
}

export default Editor;

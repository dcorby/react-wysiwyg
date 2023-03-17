import React, { useRef } from "react";
import * as Icons from './icons';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MenuListComposition from "./MenuListComposition";
import menuItems from "./menuItems.json";
import Select from '@mui/material/Select';
import styles from './styles/Editor.module.css';

const SmallKeyboardArrowDownIcon = () => {
  return (
    <Icons.KeyboardArrowDownIcon style={{ width: '0.6em', height: '0.6em', color: '#666666' }} />
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
        <Icons.UndoIcon className={styles.icon} />
        <Icons.RedoIcon className={styles.icon} />
        <Icons.FormatBoldIcon className={styles.icon} />
        <Icons.FormatItalicIcon className={styles.icon} />
        <Icons.FormatUnderlinedIcon className={styles.icon} />

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

        <Icons.MoreHorizIcon className={styles.icon} />
      </div>
      {/* end: .toolbar */}

      <div className={styles.toolbar}>
         <Icons.FormatAlignLeftIcon className={styles.icon} />
         <Icons.FormatAlignCenterIcon className={styles.icon} />
         <Icons.FormatAlignRightIcon className={styles.icon} />
         <Icons.FormatAlignJustifyIcon className={styles.icon} />
         <Icons.FormatIndentIncreaseIcon className={styles.icon} />
         <Icons.FormatListNumberedIcon className={styles.icon} />
         <Icons.FormatListBulletedIcon className={styles.icon} />
         <Icons.FormatColorTextIcon className={styles.icon} />
         <Icons.BorderColorIcon className={styles.icon} />
         <Icons.AutoFixHighIcon className={styles.icon} />
         <Icons.FormatClearIcon className={styles.icon} />
         <Icons.InsertPageBreakIcon className={styles.icon} />
         <Icons.EmojiSymbolsIcon className={styles.icon} />
         <Icons.InsertEmoticonIcon className={styles.icon} />
      </div>
      {/* end: .toolbar */}
 
      <div className={styles.toolbar}>
        <Icons.FullscreenIcon className={styles.icon} />
        <Icons.VisibilityIcon className={styles.icon} />
        <Icons.SaveIcon className={styles.icon} />
        <Icons.PrintIcon className={styles.icon} />
        <Icons.InsertPhotoIcon className={styles.icon} />
        <Icons.InsertLinkIcon className={styles.icon} />
        <Icons.CodeIcon className={styles.icon} />
        <Icons.DataArrayIcon className={styles.icon} />
        <Icons.HtmlIcon className={styles.icon} />
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

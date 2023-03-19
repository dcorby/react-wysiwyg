import React, { useRef } from "react";
import * as Icons from './icons';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MenuListComposition from "./MenuListComposition";
import menuItems from "./menuItems.json";
import Select from '@mui/material/Select';
import styles from './styles/Editor.module.css';
import { getListItemTextUtilityClass } from "@mui/material";

const SmallKeyboardArrowDown = () => {
  return (
    <Icons.KeyboardArrowDown style={{ width: '0.6em', height: '0.6em', color: '#666666' }} />
  );
};

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        activeMenuList: null,
        modes: {}
    }
    this.setActiveMenuList = this.setActiveMenuList.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  sx = {
    'Select': { m: 0, fontSize: 12, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } },
    'MenuItem': { fontSize: 12, py: 0.50, px: 0.75 },
    'Icon': (mode) => {
      if (Object.hasOwn(this.state.modes, mode)) {
        return { 'backgroundColor': '#cccccc' };
      }
      return null;
    },
    'Extend': function(base, extendWith) {
      return { ...this[base], ...extendWith };
    }
  }

  setActiveMenuList(menuList) {
    this.setState({ activeMenuList: menuList });
  }

  toggleMode(event) {
    // Use event.currentTarget rather than target, otherwise Path elements are going to get passed.
    const mode = event.currentTarget.dataset.mode;
    const modes = this.state.modes;

    if (Object.hasOwn(modes, mode)) {
      delete modes[mode];
    } else {
      modes[mode] = null;
    }
    
    this.setState({ modes: modes });
    console.log(this.state.modes);
  }

  render() {
    return (
    <div id={styles.container}>
      <div className={styles.toolbar}>
        <MenuListComposition label={'File'} items={menuItems['file']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
        <MenuListComposition label={'Edit'} items={menuItems['edit']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
        <MenuListComposition label={'View'} items={menuItems['view']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
        <MenuListComposition label={'Insert'} items={menuItems['insert']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
        <MenuListComposition label={'Format'} items={menuItems['format']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
        <MenuListComposition label={'Tools'} items={menuItems['tools']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
      </div>

      <div className={styles.toolbar}>
        <Icons.Undo className={styles.icon} />
        <Icons.Redo className={styles.icon} />
        <Icons.FormatBold className={styles.icon} sx={this.sx['Icon']('bold')} data-mode="bold" onClick={this.toggleMode} />
        <Icons.FormatItalic className={styles.icon} sx={this.sx['Icon']('italic')} data-mode="italic" onClick={this.toggleMode} />
        <Icons.FormatUnderlined className={styles.icon} sx={this.sx['Icon']('underline')} data-mode="underline" onClick={this.toggleMode} />

        {/* Font families select */}
        <FormControl sx={{ mx: 0 }} size="small">
          <Select
            sx={ this.sx['Extend']('Select', { 'width': '120px' }) }
            labelId="font-family-select-label"
            id="font-family-select"
            defaultValue='arial'
            displayEmpty
            onChange={handleChange}
            IconComponent={SmallKeyboardArrowDown}
          >
            {menuItems["fontFamilies"].map((elem, idx) => (
              <MenuItem sx={ this.sx['MenuItem'] } key={idx} value={Object.keys(elem)[0]}>{Object.values(elem)[0]['label']}</MenuItem>
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
            IconComponent={SmallKeyboardArrowDown}
          >
            {/* Set font sizes */}
            {menuItems["fontSizes"].map((elem, idx) => (
              <MenuItem sx={ this.sx['MenuItem'] } key={idx} value={Object.keys(elem)[0]}>{Object.values(elem)[0]['label']}</MenuItem>
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
            IconComponent={SmallKeyboardArrowDown}
          >
            {/* Set elements */}
            {menuItems["elements"].map((elem, idx) => (
              <MenuItem sx={ this.sx['MenuItem'] } key={idx} value={Object.keys(elem)[0]}>
                {Object.values(elem)[0]['label']}
              </MenuItem>
             ))
            }
          </Select>
        </FormControl>

        <Icons.MoreHoriz className={styles.icon} />
      </div>
      {/* end: .toolbar */}

      <div className={styles.toolbar}>
         <Icons.FormatAlignLeft className={styles.icon} />
         <Icons.FormatAlignCenter className={styles.icon} />
         <Icons.FormatAlignRight className={styles.icon} />
         <Icons.FormatAlignJustify className={styles.icon} />
         <Icons.FormatIndentIncrease className={styles.icon} />
         <Icons.FormatListNumbered className={styles.icon} />
         <Icons.FormatListBulleted className={styles.icon} />
         <Icons.FormatColorText className={styles.icon} />
         <Icons.BorderColor className={styles.icon} />
         <Icons.AutoFixHigh className={styles.icon} />
         <Icons.FormatClear className={styles.icon} />
         <Icons.InsertPageBreak className={styles.icon} />
         <Icons.EmojiSymbols className={styles.icon} />
         <Icons.InsertEmoticon className={styles.icon} />
      </div>
      {/* end: .toolbar */}
 
      <div className={styles.toolbar}>
        <Icons.Fullscreen className={styles.icon} />
        <Icons.Visibility className={styles.icon} />
        <Icons.Save className={styles.icon} />
        <Icons.Print className={styles.icon} />
        <Icons.InsertPhoto className={styles.icon} />
        <Icons.InsertLink className={styles.icon} />
        <Icons.Code className={styles.icon} />
        <Icons.DataArray className={styles.icon} />
        <Icons.Html className={styles.icon} />
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

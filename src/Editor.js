import React, { useRef, useEffect } from "react";
import * as Icons from './icons';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import MenuListComposition from "./MenuListComposition";
import menuItems from "./menuItems.json";
import Select from '@mui/material/Select';
import './styles/Editor.css';
//import styles from './styles/Editor.module.css';

const SmallKeyboardArrowDown = () => {
  return (
    <Icons.KeyboardArrowDown style={{ width: '0.6em', height: '0.6em', color: '#666666' }} />
  );
};

class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        initLoaded: false,
        activeMenuList: null,
        modes: {},
    }
    this.setActiveMenuList = this.setActiveMenuList.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  controlsRef = React.createRef(null);
  editorRef = React.createRef(null);

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
  }

  componentDidMount() {
    this.editorRef.current.style.minHeight = this.controlsRef.current.clientHeight + 'px';
    if (!this.state.initLoaded.current) {
      // Apparently this timeout is necessary, huh
      setTimeout(() => {
        this.editorRef.current.focus();
      });
    }
    this.setState({ initLoaded: true });
  }

  render() {
    return (
    <div id="container">
      <div id="controls" ref={this.controlsRef}>
        <div className='toolbar'>
          <MenuListComposition label={'File'} items={menuItems['file']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
          <MenuListComposition label={'Edit'} items={menuItems['edit']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
          <MenuListComposition label={'View'} items={menuItems['view']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
          <MenuListComposition label={'Insert'} items={menuItems['insert']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
          <MenuListComposition label={'Format'} items={menuItems['format']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
          <MenuListComposition label={'Tools'} items={menuItems['tools']} active={this.state.activeMenuList} setActive={this.setActiveMenuList}></MenuListComposition>
        </div>

        <div className='toolbar'>
          <Icons.Undo className='icon' />
          <Icons.Redo className='icon' />
          <Icons.FormatBold className='icon' sx={this.sx['Icon']('bold')} data-mode="bold" onClick={this.toggleMode} />
          <Icons.FormatItalic className='icon' sx={this.sx['Icon']('italic')} data-mode="italic" onClick={this.toggleMode} />
          <Icons.FormatUnderlined className='icon' sx={this.sx['Icon']('underline')} data-mode="underline" onClick={this.toggleMode} />

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

        </div>
        {/* end: .toolbar */}

        <div className='toolbar'>
          <Icons.FormatAlignLeft className='icon' />
          <Icons.FormatAlignCenter className='icon' />
          <Icons.FormatAlignRight className='icon' />
          <Icons.FormatAlignJustify className='icon' />
          <Icons.FormatIndentIncrease className='icon' />
          <Icons.FormatListNumbered className='icon' />
          <Icons.FormatListBulleted className='icon' />
          <Icons.FormatColorText className='icon' />
          <Icons.BorderColor className='icon' />
          <Icons.AutoFixHigh className='icon' />
          <Icons.FormatClear className='icon' />
          <Icons.InsertPageBreak className='icon' />
          <Icons.EmojiSymbols className='icon' />
          <Icons.InsertEmoticon className='icon' />
        </div>
        {/* end: .toolbar */}
  
        <div className='toolbar'>
          <Icons.Fullscreen className='icon' />
          <Icons.Visibility className='icon' />
          <Icons.Save className='icon' />
          <Icons.Print className='icon' />
          <Icons.InsertPhoto className='icon' />
          <Icons.InsertLink className='icon' />
          <Icons.Code className='icon' />
          <Icons.DataArray className='icon' />
          <Icons.Html className='icon' />
        </div>
        {/* end: .toolbar */}
      </div>
 
      <div id='editor'
           ref={this.editorRef} 
           contentEditable='true'
           suppressContentEditableWarning='true'>
      </div>

      <div id='preview'>
        <div id='bar'>
          <div id='title'>HTML</div>
          <Icons.Close className='icon' style={{ 'flexGrow': 0, 'cursor': 'pointer' }} />
        </div>
        <div id='html'>
        </div>
      </div>
      
    </div>
    );
  }
}

function handleChange() {
  console.log('handleChange() called...');
}

export default Editor;

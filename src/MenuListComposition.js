import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

import styles from './styles/MenuListComposition.module.css';

export default function MenuListComposition({ label, items }) {

  const sx = {
    'Stack': { display: 'inline-block', margin: 0, padding: 0 },
    'Button': { color: 'black', maxHeight: 24, fontSize: 10, textTransform: 'none', minWidth: 0 },
    'Popper': { zIndex: 1 },
    'Paper': { borderRadius: 0 },
    'MenuList': { py: 0.25, m: 0 },
    'MenuItem': { fontSize: 10, py: 0.50, px: 0.75 }
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack sx={ sx['Stack'] } direction="row" spacing={2}>

      <div>
        <Button
          sx={ sx['Button'] }
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          disableRipple={true}
          onClick={handleToggle}
        >
          {label}
        </Button>
        <Popper
          sx={ sx['Popper'] }
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={ sx['Paper'] }>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    sx={ sx['MenuList'] }
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {/*}
                    <MenuItem sx={ sx['MenuItem'] } onClick={handleClose}>Profile</MenuItem>
                    <MenuItem sx={ sx['MenuItem'] } onClick={handleClose}>My account</MenuItem>
                    <MenuItem sx={ sx['MenuItem'] } onClick={handleClose}>Logout</MenuItem>
                    */}

                    {items.map((elem, idx) => (
                      <MenuItem 
                        sx={ sx['MenuItem'] } 
                        key={idx} 
                        onClick={handleClose}
                        value={Object.entries(elem)[0][0]}>{Object.entries(elem)[0][1]}
                      </MenuItem>
                    ))
                    }                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
/* eslint-disable prettier/prettier */
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { StyledInputBase, SearchIconWrapper, Search } from './SearchVideos/useStyles';
import { Paper, Typography } from '@material-ui/core';
import { ClassNames } from '@emotion/react';
import useStyles from './SearchVideos/useStyles';

export default function SearchVideo(): JSX.Element {
  const [searchedVideo, setSearchedVideo] = useState<string>('');
  // ()=>{useMemo(() => console.log(searchedVideo))}
  const [drawerPosition, setDrawerPosition] = React.useState(false);
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setDrawerPosition(open);
  };

  useEffect(() => {
    if (searchedVideo.length) {
      setDrawerPosition(true);
    }
  }, [searchedVideo]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for Videos…"
        value={searchedVideo}
        onChange={(e) => setSearchedVideo(e.target.value)}
        inputProps={{ 'aria-label': 'search' }}
      />
      <Drawer className={classes.drawer} anchor="top" open={drawerPosition} onClose={toggleDrawer(false)}>
        <Paper>
          <Box
            sx={{
              bgcolor: 'grey.700',
              color: 'text.primary',
              p: 2,
              position: 'absolute',
              width: '93.7%',
              zIndex: 'modal',
              bottom: '-130%',
              borderEndEndRadius: '5px',
              borderBottomLeftRadius: '5px',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <Typography>{searchedVideo}</Typography>
          </Box>
          dhgghaejjhhhhhhhhhhhhhadgsa Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi similique quae
          officiis praesentium distinctio sunt sapiente ullam corporis accusantium voluptate rem quaerat, ducimus
          repellat blanditiis quidem eveniet eligendi aspernatur sit.
        </Paper>
      </Drawer>
      {/*  */}
    </Search>
  );
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// type Anchor = 'top' | 'left' | 'bottom' | 'right';

// export default function TemporaryDrawer() {
//   const [state, setState] = React.useState({
//     top: false,
//   });

//   const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
//     if (
//       event.type === 'keydown' &&
//       ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor: Anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
//         <React.Fragment key={anchor}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

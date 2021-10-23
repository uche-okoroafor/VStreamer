import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import { StyledInputBase, SearchIconWrapper, Search } from './SearchVideos/useStyles';
import { List, Paper, Typography, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './SearchVideos/useStyles';
import SearchedVideosList from './SearchVideos/SearchedVideosList';

export default function SearchVideo(): JSX.Element {
  const [searchedVideo, setSearchedVideo] = useState<string>('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState('0');
  const [searchBarIndex, setSearchBarIndex] = useState(0);
  const classes = useStyles();

  const toggleDrawer = (
    open: boolean,
    height: string,
    zIndex: number,
    event: React.KeyboardEvent | React.MouseEvent | null,
  ) => {
    if (event !== null) {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
    }

    setDrawerHeight(height);
    setSearchBarIndex(zIndex);
    setOpenDrawer(open);
  };

  useEffect(() => {
    if (searchedVideo.length) {
      toggleDrawer(true, 'auto', 2, null);
    }
  }, [searchedVideo]);

  return (
    <>
      <Search style={{ zIndex: searchBarIndex }}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for Videos…"
          value={searchedVideo}
          onChange={(e) => setSearchedVideo(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />

        {openDrawer && (
          <Box
            className={classes.drawer}
            sx={{ zIndex: 'modal', height: 0, color: 'text.primary' }}
            role="presentation"
            onClick={(event) => toggleDrawer(false, '0', 0, event)}
            // onKeyDown={(event) => (false, '0', 0, event)}
          >
            <Paper>
              <SearchedVideosList
                searchedVideo={searchedVideo}
                setSearchedVideo={setSearchedVideo}
                toggleDrawer={toggleDrawer}
              />
            </Paper>
          </Box>
        )}
      </Search>
      {openDrawer && (
        <Box onClick={(event) => toggleDrawer(false, '0', 0, event)} className={classes.drawerBackDrop}></Box>
      )}
    </>
  );
}

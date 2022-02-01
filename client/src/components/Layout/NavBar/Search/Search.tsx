import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { StyledInputBase, SearchIconWrapper, Search } from './SearchVideos/useStyles';
import { Paper, useMediaQuery, useTheme } from '@material-ui/core';
import useStyles from './SearchVideos/useStyles';
import SearchedVideosList from './SearchVideos/SearchedVideosList';

export default function SearchVideo(): JSX.Element {
  const [searchedVideo, setSearchedVideo] = useState<string>('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerHeight, setDrawerHeight] = useState('0');
  const [searchBarIndex, setSearchBarIndex] = useState(0);
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up('sm'));
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
      </Search>
      {openDrawer && (
        <Box onClick={(event) => toggleDrawer(false, '0', 0, event)} className={classes.drawerBackDrop}></Box>
      )}
    </>
  );
}

/* eslint-disable prettier/prettier */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from '../../../Images/Logo/logo.svg';
import { useHistory } from 'react-router';
import SearchVideo from './Search/Search';
import { useUserDetails } from '../../../context/useUserContext';
import { User } from '../../../interface/User';
import { Avatar } from '@mui/material';
import { stringAvatar } from '../../../pages/Profile/useStyles';
import MobileMenu from './Menubar/MobileMenu';
import DesktopMenu from './Menubar/DesktopMenu';

interface IProps {
  loggedInUser: User;
}

export default function NavBar({ loggedInUser }: IProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const { handleGetUserDetails, userAvatar } = useUserDetails();
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShowAccount = async (): Promise<void> => {
    await handleGetUserDetails(loggedInUser);
    history.push(`/profile/${loggedInUser.username}`);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = <DesktopMenu loggedInUser={loggedInUser} setAnchorEl={setAnchorEl} anchorEl={anchorEl} />;

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <MobileMenu
      setMobileMoreAnchorEl={setMobileMoreAnchorEl}
      loggedInUser={loggedInUser}
      setAnchorEl={setAnchorEl}
      mobileMoreAnchorEl={mobileMoreAnchorEl}
      anchorEl={anchorEl}
    />
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: 50 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={() => history.push('/home')}
          >
            {/* <MenuIcon /> */}
            <Box display="flex" justifyContent="center">
              {' '}
              <img src={logo} alt="logo" style={{ marginRight: '10px' }} />{' '}
              <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                VStreamer
              </Typography>
            </Box>
          </IconButton>

          <SearchVideo />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => history.push('/home')}
            >
              <Typography>Home</Typography>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit" onClick={handleShowAccount}>
              <Typography>My Account</Typography>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => history.push('/upload-video')}
            >
              <Typography>Upload Video</Typography>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar {...stringAvatar(loggedInUser.username.toUpperCase(), 50, 50)} src={userAvatar} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

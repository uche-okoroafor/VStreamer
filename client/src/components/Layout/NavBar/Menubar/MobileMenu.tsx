import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../context/useAuthContext';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useUserDetails } from '../../../../context/useUserContext';
import { User } from '../../../../interface/User';

interface IProps {
  loggedInUser: User;
  mobileMoreAnchorEl: null | HTMLElement;
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<null | HTMLElement>;
  setMobileMoreAnchorEl: React.Dispatch<null | HTMLElement>;
}

export default function MobileMenu({
  loggedInUser,
  anchorEl,
  mobileMoreAnchorEl,
  setMobileMoreAnchorEl,
  setAnchorEl,
}: IProps): JSX.Element {
  const isMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const { logout } = useAuth();
  const history = useHistory();
  const { handleGetUserDetails } = useUserDetails();

  const handleShowAccount = async (): Promise<void> => {
    await handleGetUserDetails(loggedInUser);
    history.push(`/profile/${loggedInUser.username}`);
  };

  const handleMenuClose = (params: string) => {
    if (params === 'logout') {
      logout();
    } else if (params === 'profile') {
      handleShowAccount();
    } else if (params === 'Home') {
      history.push('/home');
    } else {
      history.push('/upload-video');
    }
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('Home')}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <HomeOutlinedIcon color="primary" />
          </IconButton>
          <Box style={{ color: '#1976D2' }}>Home</Box>
        </Stack>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose('profile')}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <PersonOutlinedIcon color="primary" />
          </IconButton>
          <Box style={{ color: '#1976D2' }}>Profile</Box>
        </Stack>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose('upload')}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <DriveFolderUploadOutlinedIcon color="primary" />
          </IconButton>
          <Box style={{ color: '#1976D2' }}>Upload Video</Box>
        </Stack>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose('logout')}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LogoutOutlinedIcon color="primary" />
          </IconButton>
          <Box style={{ color: '#1976D2' }}>Logout</Box>{' '}
        </Stack>
      </MenuItem>
    </Menu>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../context/useAuthContext';
import { useUserDetails } from '../../../../context/useUserContext';
import { User } from '../../../../interface/User';

interface IProps {
  loggedInUser: User;
  anchorEl: null | HTMLElement;
  setAnchorEl: React.Dispatch<null | HTMLElement>;
}

export default function DesktopMenu({ loggedInUser, anchorEl, setAnchorEl }: IProps): JSX.Element {
  const isMenuOpen = Boolean(anchorEl);
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
    }
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('profile')}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton size="large" aria-label="show 4 new mails" color="primary">
            <PersonOutlinedIcon />
          </IconButton>
          <Box style={{ color: '#1976D2' }}>Profile</Box>
        </Stack>
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose('logout')}>
        {' '}
        <Stack direction="row" justifyContent="center" alignItems="center">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <LogoutOutlinedIcon />
          </IconButton>
          <Box style={{ color: '#1976D2' }}>Logout</Box>{' '}
        </Stack>
      </MenuItem>
    </Menu>
  );
}

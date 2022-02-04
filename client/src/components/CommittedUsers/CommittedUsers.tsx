import { Typography, Box, Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { stringAvatar } from '../../pages/Profile/useStyles';
import Avatar from '@mui/material/Avatar';
import { IFollowers, User } from '../../interface/User';
import { UserDetailsContext, useUserDetails } from '../../context/useUserContext';
import { useHistory } from 'react-router-dom';
import useStyles from './useStyles';
import { useState, useEffect, useMemo } from 'react';
interface IProps {
  usersList: { username: string; _id?: string; userId: string }[] | undefined;
  styles: any;
}

export default function CommittedUsers({ usersList, styles }: IProps): JSX.Element {
  const { handleGetUserDetails, userDetails } = useUserDetails();
  const [reloadImage, setReloadImage] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const handleDisplayUserProfile = async (user: User): Promise<void> => {
    await handleGetUserDetails(user);
    history.push(`/profile/${user.username}`);
  };

  useMemo(() => {
    setReloadImage(true);
    setTimeout(() => {
      setReloadImage(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  return (
    <>
      <Paper
        elevation={5}
        className={styles}
        sx={{
          background: 'white',
          position: 'absolute',
          zIndex: 1,
          overflowY: 'hidden',
          height: 'auto',
        }}
      >
        <List disablePadding sx={{ minWidth: 250 }}>
          {usersList?.map((user) => (
            <ListItem
              key={user.userId}
              onClick={() =>
                handleDisplayUserProfile({
                  username: user.username,
                  id: user.userId,
                  email: '',
                })
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    {...stringAvatar(user.username.toUpperCase(), 35, 35)}
                    src={reloadImage ? undefined : `/image/get-image/${user.userId}`}
                  />
                </ListItemAvatar>
                <ListItemText primary={user.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
}

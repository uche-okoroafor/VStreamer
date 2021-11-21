import { Typography, Grid, Box, Button, Paper } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useEffect, useState } from 'react';
import { useUserDetails } from '../../context/useUserContext';
import VideosList from '../../components/VideosList/VideosList';
import { User } from '../../interface/User';
import ProfilePhoto from './ProfilePhoto/ProflePhoto';
import { useAllVideos } from '../../context/useAllVideosContext';
import { IAllVideos, IVideoDetails } from '../../interface/VideoDetails';
export default function Profile(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { allVideos } = useAllVideos();
  const [videos, setVideos] = useState<IAllVideos | undefined>(undefined);
  const { userVideos, userDetails, handleUserVideos } = useUserDetails();
  const user: User = userDetails ? userDetails : { username: '', id: '', email: '' };
  const videoPlayerOptions = {
    width: '500',
    height: '280',
    autoPlay: false,
    displayDetails: true,
    component: 'Profile',
    classes,
  };

  useEffect(() => {
    if (allVideos !== videos) {
      setVideos(allVideos);
      handleUserVideos(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  return (
    <>
      <Grid container>
        <Grid item className={classes.profile} sx={{ paddingTop: 5 }} bgcolor="primary.main" xs={4}>
          <Box display="flex" sx={{ height: '90vh' }} flexDirection="column" alignItems="center">
            <ProfilePhoto user={user} />

            <Box sx={{ marginBottom: '20px' }}>
              <Typography variant="h5">{user.username}</Typography>
            </Box>

            <Box sx={{ marginBottom: '20px', width: '100%' }} display="flex" justifyContent="space-evenly">
              <Typography variant="subtitle1">Followers:{'user.followers'.length}</Typography>{' '}
              <Typography variant="subtitle1">Posts:{'user.posts'.length}</Typography>{' '}
              <Typography variant="subtitle1">Views:{'user.views'.length}</Typography>
            </Box>

            <Box
              sx={{ marginBottom: '20px' }}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Typography variant="h6">About</Typography> <Typography variant="h6">{'user.About'}</Typography>{' '}
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          className={classes.videos}
          xs={8}
          sx={{
            position: 'relative',
            height: '70vh',
          }}
        >
          <Box
            sx={{
              paddingTop: 5,
              overflowY: 'scroll',
              top: 0,
              bottom: 0,
              left: 0,
              right: -17,
              position: 'absolute',
            }}
          >
            <VideosList videos={userVideos} videoPlayerOptions={videoPlayerOptions} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

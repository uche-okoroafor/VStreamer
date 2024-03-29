import { Typography, Grid, Box } from '@mui/material';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useEffect, useMemo, useState } from 'react';
import { useUserDetails } from '../../context/useUserContext';
import VideosList from '../../components/VideosList/VideosList';
import { IUserDetails } from '../../interface/User';
import ProfilePhoto from './ProfilePhoto/ProfilePhoto';
import { useAllVideos } from '../../context/useAllVideosContext';
import CommittedUsers from '../../components/CommittedUsers/CommittedUsers';
import Follow from './Follow/Follow';
import AboutUser from './AboutUser/AboutUser';
import { Button, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export default function Profile(): JSX.Element {
  const classes = useStyles();
  const { allVideos } = useAllVideos();
  const { loggedInUser } = useAuth();
  const { userDetails, handleGetUserDetails, isLoading } = useUserDetails();
  const [userHasVideos, setUserHasVideos] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState<IUserDetails>({
    username: '',
    userId: '',
    email: '',
    aboutUser: '',
    views: [],
    followers: [],
    userImage: '',
    videos: [],
  });
  const videoPlayerOptions = {
    width: '500',
    height: '280',
    autoPlay: false,
    displayDetails: true,
    component: 'Profile',
    classes,
  };
  const checkUserHasVideos = () => {
    if (userDetails?.videos.length) {
      setUserHasVideos(true);
    } else {
      setUserHasVideos(false);
    }
  };
  const checkUser = () => {
    if (loggedInUser && userDetails) {
      setUser(userDetails);
      if (loggedInUser.id === userDetails.userId) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  };
  const updateUserDetails = () => {
    if (allVideos && userDetails) {
      handleGetUserDetails({ username: userDetails?.username, id: userDetails?.userId, email: 'undefined' });
    }
  };

  useEffect(() => {
    checkUser();
    checkUserHasVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser, userDetails]);

  useEffect(() => {
    updateUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  return (
    <>
      <Grid
        container
        sx={{
          height: { md: '90vh', xs: '100vh', sm: '100vh' },
          overflow: { md: 'hidden', xs: 'scroll', sm: 'scroll' },
        }}
      >
        {' '}
        <Grid
          item
          className={classes.profile}
          sx={{ position: 'relative', paddingTop: 3 }}
          bgcolor="primary.main"
          xs={12}
          sm={12}
          md={4}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <ProfilePhoto isUser={isUser} user={user} />

            <Box id="check2" className={classes.bottomSpace}>
              <Typography variant="h5">{user.username}</Typography>
            </Box>

            <Box sx={{ marginBottom: '20px', width: '100%' }} display="flex" justifyContent="space-evenly">
              <Box className={classes.followersContainer}>
                {' '}
                <Typography variant="subtitle1" style={{ cursor: 'pointer' }}>
                  Followers: &nbsp; {userDetails?.followers.length}
                </Typography>{' '}
                {isUser && (
                  <CommittedUsers usersList={userDetails?.followers} listPosition={''} classStyle={classes.list} />
                )}
              </Box>
              <Box sx={{ padding: '4px' }}>
                <Typography variant="subtitle1">Posts: &nbsp;{userDetails?.videos.length}</Typography>{' '}
              </Box>
              <Box className={classes.followersContainer}>
                <Typography variant="subtitle1" style={{ cursor: 'pointer' }}>
                  Views: &nbsp;{userDetails?.views.length}
                </Typography>
              </Box>
            </Box>
            <Follow isUser={isUser} />

            <AboutUser isUser={isUser} />
            <Box id="check2"></Box>
            <Box>
              <Typography variant="subtitle1" align="center">
                Email: {user.email}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          className={classes.videos}
          xs={12}
          sm={12}
          md={8}
          sx={{
            position: 'relative',
          }}
        >
          <Box
            sx={{
              paddingTop: 5,
              padding: { xs: '1rem', sm: '1rem' },
              overflowY: 'scroll',
              top: 0,
              bottom: 0,
              left: 0,
              right: -17,
              position: { md: 'absolute', xs: 'relative', sm: 'relative' },
            }}
          >
            {userHasVideos ? (
              <VideosList videos={userDetails?.videos} videoPlayerOptions={videoPlayerOptions} />
            ) : (
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                {isLoading ? (
                  <CircularProgress />
                ) : (
                  <Box display={'flex'} flexDirection="column" justifyContent={'center'}>
                    <Typography>This account has no videos </Typography>
                    <Button
                      style={{ margin: '20px' }}
                      onClick={() => history.push('/upload-video')}
                      variant="contained"
                      color="primary"
                    >
                      Upload Video
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>{' '}
        </Grid>
      </Grid>
    </>
  );
}

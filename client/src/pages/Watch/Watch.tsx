import { Grid, Box, Container, Stack, Avatar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAllVideos } from '../../context/useAllVideosContext';
import VideoPlayer from '../../components/VideoPlayer/VideosPlayer';
import VideosList from '../../components/VideosList/VideosList';
import { useEffect, useState } from 'react';
import { stringAvatar } from './useStyles';
import { useUserDetails } from '../../context/useUserContext';
import useStyles from './useStyles';
import Likes from './Likes/Likes';
import Comments from './Comments/Comments';
import Viewers from './Viewers/Viewers';
import moment from 'moment';
import TrackVisibility from 'react-on-screen';
import { useHistory } from 'react-router';

export default function Watch(): JSX.Element {
  const classes = useStyles();
  const { handleGetUserDetails } = useUserDetails();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const [videoSource, setVideoSource] = useState<string | undefined>(undefined);
  const [videoDuration, setVideoDuration] = useState<string | undefined>(undefined);
  const [displayCommentBtn, setDisplayCommentBtn] = useState(false);
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up('sm'));
  const history = useHistory();
  useEffect(() => {
    if (watchVideo?.videoSource.includes('youtube')) {
      setVideoSource(watchVideo?.videoSource + '?autoplay=1');
    } else {
      setVideoSource(watchVideo?.videoSource);
    }
  }, [watchVideo]);

  const videoPlayerOptions = {
    width: '850',
    height: isSmallOrLess ? '480' : '480',
    autoPlay: true,
    component: 'Watch',
    classes,
  };

  const videosListPlayerOptions = {
    width: '300',
    height: '200',
    autoPlay: false,
    displayDetails: false,
    component: 'Watch',
    classes,
  };

  const handleDisplayUserProfile = async (): Promise<void> => {
    if (watchVideo) {
      const user = { username: watchVideo.username, id: watchVideo.userId, email: 'undefined' };
      await handleGetUserDetails(user);
      history.push(`/profile/${watchVideo.username}`);
    }
  };
  return (
    <>
      <Grid container style={{ paddingTop: '30px', position: 'relative' }} className="viewed-video-container">
        <Grid
          item
          xs={12}
          sm={12}
          md={9}
          className="viewed-video-box"
          sx={{ paddingBottom: 5, paddingLeft: '10px', paddingRight: { xs: '10px', sm: '10px', md: '0' } }}
        >
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="center" sx={{ background: 'black' }}>
              {
                <VideoPlayer
                  videoSource={videoSource}
                  videoPlayerOptions={videoPlayerOptions}
                  setVideoDuration={setVideoDuration}
                />
              }{' '}
              <Box style={{ paddingTop: '7rem', background: 'green' }}>
                {' '}
                <TrackVisibility>
                  {({ isVisible }) => {
                    setDisplayCommentBtn(isVisible);
                  }}
                </TrackVisibility>
              </Box>
            </Box>

            <Container sx={{ borderBottom: '2px solid #f9f9f9', background: 'white' }}>
              <Box sx={{ padding: '10px 0', whiteSpace: 'nowrap' }}>
                <Stack direction="row" alignItems="center">
                  <Stack direction="row" spacing={1} style={{ flexGrow: 1 }} alignItems="center">
                    <Typography variant="h5">{watchVideo?.videoTitle}</Typography>{' '}
                    {watchVideo?.artist && <Typography variant="h5">-</Typography>}
                    <Typography variant="h5">{watchVideo?.artist}</Typography>{' '}
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {' '}
                    <Typography
                      color="primary"
                      sx={{ cursor: 'pointer' }}
                      onClick={handleDisplayUserProfile}
                      variant="h5"
                    >
                      {watchVideo?.username}
                    </Typography>
                    <Avatar
                      style={{ cursor: 'pointer', border: '1px solid #1976D2' }}
                      onClick={handleDisplayUserProfile}
                      {...stringAvatar(watchVideo ? watchVideo.username.toUpperCase() : '', 50, 50)}
                      src={`/image/get-image/${watchVideo?.userId}`}
                    />
                  </Stack>
                </Stack>
                <Box sx={{ margin: '5px auto' }}>
                  <Typography>{watchVideo?.videoDescription}</Typography>
                </Box>
                <Stack direction="row" alignItems="center" sx={{ margin: '5px auto' }}>
                  <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={5} alignItems="center">
                      {' '}
                      <Likes />
                      <Viewers />
                    </Stack>
                  </Box>{' '}
                  <Box>
                    <Stack direction="row" spacing={5} alignItems="center">
                      <Typography style={{ fontSize: '0.9rem' }}>
                        {moment(watchVideo?.datePosted).format('MMMM Do YYYY')}
                      </Typography>
                      <Typography>{watchVideo?.videoCategory}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Box>{' '}
            </Container>

            <Container sx={{ padding: 0 }}>
              <Grid container sx={{ position: 'relative' }}>
                <Grid item xs={12} sm={8} md={12} sx={{}}>
                  {' '}
                  <Comments displayCommentBtn={displayCommentBtn} />
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    overflowY: 'scroll',
                    top: 0,
                    bottom: 0,
                    // left: 0,
                    right: -17,
                    position: 'absolute',
                    display: { sm: 'block', xs: 'none', md: 'none' },
                    paddingTop: '0',
                  }}
                >
                  {' '}
                  <VideosList videoPlayerOptions={videosListPlayerOptions} videos={allVideos} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Grid>

        <Grid
          item
          md={3}
          sx={{
            position: 'relative',
            display: { sm: 'none', xs: 'none', md: 'block' },
            overflow: 'hidden',
          }}
          className="all-video-container"
        >
          <Box
            sx={{
              overflowY: 'scroll',
              top: 0,
              bottom: 0,
              left: 0,
              right: -17,
              position: 'absolute',
              padding: '10px',
              paddingTop: '0',
            }}
          >
            <VideosList videoPlayerOptions={videosListPlayerOptions} videos={allVideos} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

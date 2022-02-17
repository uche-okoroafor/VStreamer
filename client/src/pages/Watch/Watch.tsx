import { Grid, Box, Container, Stack, Avatar, Typography, useMediaQuery, useTheme, Paper, Button } from '@mui/material';
import { useAllVideos } from '../../context/useAllVideosContext';
import VideoPlayer from '../../components/VideoPlayer/VideosPlayer';
import VideosList from '../../components/VideosList/VideosList';
import { useEffect, useMemo, useState } from 'react';
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
  const [displayComments, setDisplayComments] = useState(true);
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up('sm'));
  const history = useHistory();
  const [watchedVideoId, setWatchedVideoId] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (watchVideo?.videoSource.includes('youtube')) {
      setVideoSource(watchVideo?.videoSource + '?autoplay=1');
    } else {
      setVideoSource(watchVideo?.videoSource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchVideo]);

  useMemo(() => {
    window.scrollTo(0, 0);
    setWatchedVideoId(watchVideo?._id);
  }, [watchVideo?._id]);

  const videoPlayerOptions = {
    width: '850',
    height: isSmallOrLess ? '480' : '480',
    autoPlay: true,
    component: 'Watch',
    classes,
  };

  const videosListPlayerOptions = {
    width: '350',
    height: '200',
    autoPlay: false,
    displayDetails: false,
    component: 'Watch',
    classes,
  };
  const videosListPlayerOptionsMobile = {
    width: '600',
    height: '400',
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
  const capitalizeFirstLetter = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };
  const isYoutubeVideo = (source: string | undefined) => {
    if (source?.includes('youtube')) {
      return true;
    }
    return false;
  };
  const toggleCommentDisplay = () => {
    setDisplayComments(!displayComments);
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
            <Box display="flex" justifyContent="center" className={classes.videoPlayerContainer}>
              {
                <VideoPlayer
                  videoSource={videoSource}
                  videoPlayerOptions={videoPlayerOptions}
                  setVideoDuration={setVideoDuration}
                  displayControls={true}
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
              {!isYoutubeVideo(watchVideo?.videoSource) && (
                <Box className={classes.watchedVideoTitle} alignItems="center">
                  <Box sx={{ borderRadius: '50%', background: 'black', margin: '10px' }} p={2}></Box>{' '}
                  <Typography style={{ fontSize: '1.3rem' }}>
                    {capitalizeFirstLetter(String(watchVideo?.videoTitle))}
                  </Typography>
                </Box>
              )}
            </Box>
            <Paper sx={{ borderBottom: '2px solid #f9f9f9', background: 'white' }}>
              <Container>
                <Box sx={{ padding: '10px 0', whiteSpace: 'nowrap' }}>
                  <Stack direction="row" alignItems="center">
                    <Stack direction="row" spacing={1} style={{ flexGrow: 1 }} alignItems="center">
                      <Typography variant="h5" sx={{ fontWeight: '900' }}>
                        {capitalizeFirstLetter(String(watchVideo?.videoTitle))}
                      </Typography>{' '}
                      {watchVideo?.artist && <Typography variant="h5">-</Typography>}
                      <Typography variant="h6">{watchVideo?.artist}</Typography>{' '}
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {' '}
                      <Typography
                        color="primary"
                        sx={{ cursor: 'pointer', fontWeight: '900' }}
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
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ margin: '5px auto', display: { xs: 'none', sm: 'flex', md: 'flex' } }}
                  >
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
                  <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}>
                    {' '}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Likes />
                      <Viewers />
                    </Stack>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ margin: '5px auto', display: { xs: 'flex', sm: 'none', md: 'none' } }}
                    >
                      <Typography style={{ fontSize: '0.9rem' }}>
                        {moment(watchVideo?.datePosted).format('MMMM Do YYYY')}
                      </Typography>
                      <Typography>{watchVideo?.videoCategory}</Typography>
                    </Stack>
                  </Box>
                </Box>{' '}
              </Container>
            </Paper>
            <Container sx={{ padding: 0 }}>
              <Grid container sx={{ position: 'relative' }}>
                <Box sx={{ padding: '10px', display: { sm: 'block', xs: 'block', md: 'none', width: '100%' } }}>
                  {' '}
                  <Button variant="contained" onClick={toggleCommentDisplay}>
                    {displayComments ? 'Videos' : 'Comments'}
                  </Button>
                </Box>

                {displayComments ? (
                  <Grid item xs={12}>
                    {' '}
                    <Comments displayCommentBtn={displayCommentBtn} />
                  </Grid>
                ) : (
                  <Grid
                    item
                    xs={11}
                    sm={8}
                    sx={{
                      overflowY: 'scroll',
                      display: { sm: 'block', xs: 'block', md: 'none' },
                      paddingTop: '0',
                      margin: '0 auto',
                    }}
                  >
                    {' '}
                    <VideosList videoPlayerOptions={videosListPlayerOptionsMobile} videos={allVideos} />
                  </Grid>
                )}
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

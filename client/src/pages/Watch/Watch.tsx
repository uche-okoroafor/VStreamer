import { Grid, Box } from '@mui/material';
import { Typography } from '@mui/material';
import { useAllVideos } from '../../context/useAllVideosContext';
import VideoPlayer from '../../components/VideoPlayer/VideosPlayer';
import VideosList from '../../components/VideosList/VideosList';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';
import Likes from './Likes/Likes';
import Comments from './Comments/Comments';
import Viewers from './Viewers/Viewers';

export default function Watch(): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const [videoSource, setVideoSource] = useState<string | undefined>(undefined);
  const { loggedInUser } = useAuth();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (watchVideo?.videoSource.includes('youtube')) {
      setVideoSource(watchVideo?.videoSource + '?autoplay=1');
    } else {
      setVideoSource(watchVideo?.videoSource);
    }
  }, [watchVideo]);

  const videoPlayerOptions = {
    width: '800',
    height: '400',
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

  return (
    <>
      <Grid container className="viewed-video-container">
        <Grid item xs={8} className="viewed-video-box">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="center" className="video-frame">
              {watchVideo ? (
                <VideoPlayer videoSource={videoSource} videoPlayerOptions={videoPlayerOptions} />
              ) : (
                <Typography>no video to display</Typography>
              )}
            </Box>
            <Likes />
            <Comments />
            <Viewers />
          </Box>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            position: 'relative',
            height: '100vh',
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
            }}
          >
            <VideosList videoPlayerOptions={videosListPlayerOptions} videos={allVideos} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

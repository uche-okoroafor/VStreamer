import { Grid, Box } from '@mui/material';
// import { useContext, useEffect, useState } from 'react';
// import { useAllVideos } from '../../../../../context/useAllVideosContext';
// import { useHistory } from 'react-router-dom';
// import { List, Paper, Typography, ListItem, ListItemText } from '@material-ui/core';
// import { IVideoDetails } from '../../../../../interface/VideoDetails';

import { Typography } from '@mui/material';
import { useAllVideos } from '../../context/useAllVideosContext';
import VideoPlayer from '../../components/VideoPlayer/VideosPlayer';
import VideosList from '../../components/Videos/VideosList';
interface IProps {
  searchedVideo: string;
}

export default function Watch(): JSX.Element {
  const { allVideos, watchVideo } = useAllVideos();
  const videoPlayerOptions = {
    width: '800',
    height: '400',
    autoPlay: true,
  };

  const videosListPlayerOptions = {
    width: '350',
    height: '200',
    autoPlay: false,
    displayDetails: false,
  };
  // const [userName, setUserName] = useState("");
  // // const [watchVideo, setViewedVideo] = useState("");
  // const [userNotFound, setUserNotFound] = useState(false);
  // const history = useHistory();

  return (
    <>
      <Typography variant="h3">welcome to watch</Typography>
      <Grid container className="viewed-video-container">
        <Grid item xs={8} className="viewed-video-box">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="center" className="video-frame">
              {watchVideo ? (
                <VideoPlayer videoSource={watchVideo.videoSource} videoPlayerOptions={videoPlayerOptions} />
              ) : (
                <Typography>no video to display</Typography>
              )}
            </Box>
            <Grid className="details">rjufruuritoototototppypypyp</Grid>
          </Box>
        </Grid>

        <Grid item xs={4} className="all-video-container">
          <VideosList videoPlayerOptions={videosListPlayerOptions} allVideos={allVideos} />
        </Grid>
      </Grid>
    </>
  );
}

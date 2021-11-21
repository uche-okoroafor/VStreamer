import React, { useEffect, useState } from 'react';
import { useAllVideos } from '../../context/useAllVideosContext';
import { useHistory } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideosPlayer';
import { IVideoDetails, IAllVideos } from '../../interface/VideoDetails';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Typography, Grid, Box, Button, Paper } from '@mui/material';
import UpdateVideo from '../../pages/Profile/DeleteVideo/DeleteVideo';
// import { useAuth } from '../../context/useAuthContext';
// import { useUserDetails } from '../../context/useUserContext';

interface IProps {
  videos: IAllVideos | undefined;
  videoPlayerOptions: {
    width: string;
    height: string;
    autoPlay: boolean;
    displayDetails: boolean;
    component: string;
    classes: any;
  };
}

export default function VideosList({ videos, videoPlayerOptions }: IProps): JSX.Element {
  const { handleSetWatchVideo } = useAllVideos();
  const history = useHistory();
  const { classes } = videoPlayerOptions;
  const { updateSnackBarMessage } = useSnackBar();
  const { component } = videoPlayerOptions;
  // const { loggedInUser } = useAuth();
  // const { userDetails } = useUserDetails();

  function handleClickVideo(video: IVideoDetails) {
    console.log(video);
    if (video === undefined) {
      return updateSnackBarMessage('Waiting For Server');
    }
    handleSetWatchVideo(video);
    history.push(`/watch/${video.videoTitle}`);
  }

  return (
    <React.Fragment>
      {videos ? (
        videos.map((video) => (
          <Box className={classes.videoContainer} key={video.videoId}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
                onClick={() => handleClickVideo(video)}
              ></Box>
              <VideoPlayer videoSource={video.videoSource} videoPlayerOptions={videoPlayerOptions} />
            </Box>
            {videoPlayerOptions
              ? videoPlayerOptions.displayDetails && (
                  <Box style={{ width: '100%', padding: '0 10px', position: 'relative' }}>
                    <Box>
                      <Typography variant="h5" align="center">
                        {video.videoTitle}
                      </Typography>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                      <Typography>Posted By: {video.username}</Typography>
                    </Box>{' '}
                    <Box sx={{ margin: '10px 0' }}>
                      <Typography>Category: {video.videoCategory}</Typography>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                      <Typography>Tag: {video.videoTags}</Typography>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                      <Typography>Duration: {'video.duration'}</Typography>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                      <Typography>Description: {'video.videoDescription'}</Typography>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                      <Typography>Likes: {video.likes?.length}</Typography>
                    </Box>
                    <Box sx={{ margin: '10px 0' }}>
                      <Typography>Views: {'video.views'}</Typography>
                    </Box>
                    <UpdateVideo renderedComponent={component} video={video} />
                  </Box>
                )
              : ''}
          </Box>
        ))
      ) : (
        <Typography>No Videos to Display</Typography>
      )}
    </React.Fragment>
  );
}

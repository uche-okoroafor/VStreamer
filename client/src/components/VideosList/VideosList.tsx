import React, { useEffect, useState } from 'react';
import { useAllVideos } from '../../context/useAllVideosContext';
import { useHistory } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideosPlayer';
import { IVideoDetails } from '../../interface/VideoDetails';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Typography, Grid, Box, Button, Paper, Stack } from '@mui/material';
import DeleteVideo from '../../pages/Profile/DeleteVideo/DeleteVideo';
import useStyles from './useStyles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useUserDetails } from '../../context/useUserContext';
import { User } from '../../interface/User';
import moment from 'moment';

interface IProps {
  videos: Array<IVideoDetails> | undefined;
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
  const { handleSetWatchVideo, watchVideo } = useAllVideos();
  const history = useHistory();
  const { classes } = videoPlayerOptions;
  const { updateSnackBarMessage } = useSnackBar();
  const { component } = videoPlayerOptions;
  const videoListStyle = useStyles();
  const [videoDuration, setVideoDuration] = useState<string | undefined>();
  const { userDetails, handleGetUserDetails } = useUserDetails();
  // const [displayViewedVideo, setDisplayViewedVideo] = useState(false);

  const displayViewedVideo = (videoId: string): boolean => {
    if (watchVideo?._id === videoId && component === 'Watch') {
      return false;
    } else {
      return true;
    }
  };

  function handleClickVideo(video: IVideoDetails) {
    if (video === undefined) {
      return updateSnackBarMessage('Waiting For Server');
    }

    handleSetWatchVideo(video);
    history.push(`/watch/${video.videoTitle}`);
  }

  const handleDisplayUserProfile = async (user: User): Promise<void> => {
    await handleGetUserDetails(user);
    history.push(`/profile/${user.username}`);
  };

  return (
    <React.Fragment>
      {videos ? (
        videos.map(
          (video) =>
            displayViewedVideo(video._id) && (
              <Paper className={classes.videoContainer} key={video._id}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    position: 'relative',
                    background: 'black',
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
                  <VideoPlayer
                    videoSource={video.videoSource}
                    videoPlayerOptions={videoPlayerOptions}
                    setVideoDuration={setVideoDuration}
                  />
                </Box>
                {videoPlayerOptions
                  ? videoPlayerOptions.displayDetails && (
                      <Box className={classes.videoDetailsContainer} style={{ width: '100%', position: 'relative' }}>
                        <Box>
                          <Typography variant="h5" align="center">
                            {video.videoTitle}
                          </Typography>
                        </Box>
                        <Box></Box>
                        <Box className={videoListStyle.textSpacing}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle1">Posted by: </Typography>{' '}
                            <Typography
                              onClick={() =>
                                handleDisplayUserProfile({
                                  username: video.username,
                                  id: video.userId,
                                  email: 'undefined',
                                })
                              }
                              sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                              color="primary"
                            >
                              {video.username}
                            </Typography>
                          </Stack>
                        </Box>{' '}
                        <Box className={videoListStyle.textSpacing}>
                          <Typography variant="subtitle1">Artist: {video.artist}</Typography>
                        </Box>
                        <Box className={videoListStyle.textSpacing}>
                          <Typography variant="subtitle1">Category: {video.videoCategory}</Typography>
                        </Box>
                        <Box className={videoListStyle.textSpacing}>
                          <Typography variant="subtitle1">Duration: {video.videoDuration}</Typography>
                        </Box>{' '}
                        <Box className={videoListStyle.textSpacing}>
                          <Typography variant="subtitle1" component="span">
                            Date: &nbsp;
                            <Typography style={{ fontSize: '0.8rem' }} component="span">
                              {moment(video.datePosted).format('MMMM Do YYYY')}
                            </Typography>
                          </Typography>
                        </Box>
                        <Box className={videoListStyle.textSpacing}>
                          <Stack direction="row" spacing={2}>
                            {' '}
                            <Box>
                              {' '}
                              <ThumbUpIcon sx={{ color: 'green', marginRight: '7px' }} />
                              {video.likes?.length}
                            </Box>{' '}
                            <Box>
                              <ThumbDownAltIcon sx={{ color: 'red', marginRight: '7px' }} />
                              {video.dislikes?.length}
                            </Box>
                          </Stack>
                        </Box>
                        <Box className={videoListStyle.textSpacing}>
                          <Typography variant="subtitle1">
                            <RemoveRedEyeIcon sx={{ marginRight: '7px' }} />
                            {video.views?.length}
                          </Typography>
                        </Box>
                        <DeleteVideo renderedComponent={component} video={video} />
                      </Box>
                    )
                  : ''}
              </Paper>
            ),
        )
      ) : (
        <Typography>No Videos to Display</Typography>
      )}
    </React.Fragment>
  );
}

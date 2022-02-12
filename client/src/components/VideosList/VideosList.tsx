import React, { useState } from 'react';
import { useAllVideos } from '../../context/useAllVideosContext';
import { useHistory } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideosPlayer';
import { IVideoDetails } from '../../interface/VideoDetails';
import { useSnackBar } from '../../context/useSnackbarContext';
import { Typography, Box, Paper, Stack } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteVideo from '../../pages/Profile/DeleteVideo/DeleteVideo';
import useStyles from './useStyles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useUserDetails } from '../../context/useUserContext';
import { User } from '../../interface/User';
import moment from 'moment';
import CommittedUsers from '../../components/CommittedUsers/CommittedUsers';

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

/**
 * @dev renders the preview list of videos
 * @props videos contains all videos from the server
 * @props videoPlayerOptions is the options of how the player should be displayed
 */

export default function VideosList({ videos, videoPlayerOptions }: IProps): JSX.Element {
  const { handleSetWatchVideo, watchVideo } = useAllVideos();
  const history = useHistory();
  const { classes } = videoPlayerOptions;
  const { updateSnackBarMessage } = useSnackBar();
  const { component } = videoPlayerOptions;
  const videoListStyle = useStyles();
  const [videoDuration, setVideoDuration] = useState<string | undefined>();
  const { handleGetUserDetails } = useUserDetails();
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
  const capitalizeFirstLetter = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };
  const isYoutubeVideo = (source: string) => {
    if (source.includes('youtube')) {
      return true;
    }
    return false;
  };
  const rect = document.getElementById('check')?.getBoundingClientRect();
  console.log(rect, 'sanctions');

  return (
    <React.Fragment>
      {videos
        ? videos.map(
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
                    <Box className={videoListStyle.clickAndPlayContainer} onClick={() => handleClickVideo(video)}>
                      {!isYoutubeVideo(video.videoSource) && (
                        <Box className={videoListStyle.clickAndPlayTitleContainer}>
                          <Box className={videoListStyle.clickAndPlayTitle}></Box>
                          <Typography
                            className={videoListStyle.videoTitle}
                            style={{
                              fontSize: '1.2rem',
                            }}
                          >
                            {capitalizeFirstLetter(video.videoTitle)} - {video.artist}
                          </Typography>
                        </Box>
                      )}
                      <Box className={videoListStyle.clickAndPlay}>
                        {' '}
                        <PlayArrowIcon fontSize="large" />
                      </Box>
                    </Box>
                    <VideoPlayer
                      videoSource={video.videoSource}
                      videoPlayerOptions={videoPlayerOptions}
                      setVideoDuration={setVideoDuration}
                      displayControls={false}
                    />
                  </Box>
                  {videoPlayerOptions
                    ? videoPlayerOptions.displayDetails && (
                        <Box className={classes.videoDetailsContainer} style={{ width: '100%', position: 'relative' }}>
                          <Box>
                            <Typography sx={{ fontWeight: '900' }} variant="h5" align="center">
                              {capitalizeFirstLetter(String(video.videoTitle))}
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
                            <Typography variant="subtitle1">
                              Artist:{' '}
                              <Typography style={{ fontSize: '0.8rem' }} component="span">
                                {video.artist}
                              </Typography>{' '}
                            </Typography>
                          </Box>
                          <Box className={videoListStyle.textSpacing}>
                            <Typography variant="subtitle1">
                              Category:{' '}
                              <Typography style={{ fontSize: '0.8rem' }} component="span">
                                {video.videoCategory}
                              </Typography>{' '}
                            </Typography>
                          </Box>
                          <Box className={videoListStyle.textSpacing}>
                            <Typography variant="subtitle1">
                              Duration:{' '}
                              <Typography style={{ fontSize: '0.8rem' }} component="span">
                                {video.videoDuration}
                              </Typography>{' '}
                            </Typography>
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
                              <Box className={videoListStyle.likesContainer}>
                                {' '}
                                <ThumbUpIcon sx={{ color: 'green', marginRight: '7px', cursor: 'pointer' }} />
                                {video.likes?.length}
                                {component !== 'Home' && (
                                  <CommittedUsers usersList={video?.likes} styles={videoListStyle.list} />
                                )}
                              </Box>{' '}
                              <Box>
                                <ThumbDownAltIcon sx={{ color: 'red', marginRight: '7px' }} />
                                {video.dislikes?.length}
                              </Box>
                            </Stack>
                          </Box>
                          <Box id="check" className={videoListStyle.textSpacing}>
                            <Typography variant="subtitle1" style={{ fontSize: '0.8rem', cursor: 'pointer' }}>
                              <RemoveRedEyeIcon sx={{ marginRight: '7px' }} />
                              {video.views?.length}
                            </Typography>
                            {component !== 'Home' && (
                              <CommittedUsers usersList={video.views} styles={videoListStyle.list} />
                            )}
                          </Box>
                          <DeleteVideo renderedComponent={component} video={video} />
                        </Box>
                      )
                    : ''}
                </Paper>
              ),
          )
        : null}
    </React.Fragment>
  );
}

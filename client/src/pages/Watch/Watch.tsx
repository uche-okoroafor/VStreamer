import { Grid, Box } from '@mui/material';

// import { useContext, useEffect, useState } from 'react';
// import { useAllVideos } from '../../../../../context/useAllVideosContext';
// import { useHistory } from 'react-router-dom';
// import { List, Paper, Typography, ListItem, ListItemText } from '@material-ui/core';
import { ILike } from '../../interface/VideoDetails';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

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

import IconButton from '@mui/material/IconButton';
import { updateLikes, updateUnLikes, removeLikes, removeUnLikes } from '../../helpers/APICalls/likesApis';
interface IProps {
  searchedVideo: string;
}

export default function Watch(): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const [videoSource, setVideoSource] = useState<string | undefined>(undefined);
  const { loggedInUser } = useAuth();

  const [likes, setLikes] = useState<[ILike] | undefined>(undefined);
  const [unLikes, setUnLikes] = useState<[ILike] | undefined>(undefined);

  useEffect(() => {
    if (watchVideo) {
      setLikes(watchVideo.likes);
      setUnLikes(watchVideo.unLikes);

      if (watchVideo.videoSource.includes('youtube')) {
        setVideoSource(watchVideo.videoSource + '?autoplay=1');
      } else {
        setVideoSource(watchVideo.videoSource);
      }

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

  const handleLike = async (): Promise<void> => {
    if (loggedInUser) {
      if (watchVideo) {
        const { videoId, userId } = watchVideo;
        const checkUser = likes?.filter((user) => user.userId === loggedInUser.id);
        try {
          if (checkUser?.length) {
            console.log('yes');
            const response = await removeLikes(userId, videoId);
            console.log(response, 1010);
            if (response) {
              await handleGetAllVideos();
              handleSetWatchVideo(watchVideo);
              console.log(response, 1010);
            }
          } else {
            console.log('@yes');

            const response = await updateLikes(loggedInUser.username, userId, videoId);
            // await removeLikes(userId, videoId);
            await handleGetAllVideos();
            handleSetWatchVideo(watchVideo);
            console.log(response, 1010);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleUnLike = async (): Promise<void> => {
    try {
      if (watchVideo) {
        if (loggedInUser) {
          const loggedInUsername = loggedInUser.username;
          const { videoId, userId } = watchVideo;

          const response = await updateUnLikes(loggedInUsername, userId, videoId);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const [userName, setUserName] = useState("");
  // // const [watchVideo, setViewedVideo] = useState("");
  // const [userNotFound, setUserNotFound] = useState(false);
  // const history = useHistory();


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

            <Box style={{ minHeight: '100px', paddingTop: '20px' }}>
              <Box>
                <IconButton
                  // sx={{ position: 'absolute', right: '10%', top: '80%' }}
                  aria-label="update"
                  color="secondary"
                  onClick={handleLike}
                >
                  <ThumbUpIcon sx={{ color: 'green' }} />
                  {likes?.length}
                </IconButton>

                <IconButton
                  // sx={{ position: 'absolute', right: '10%', top: '80%' }}
                  aria-label="update"
                  color="secondary"
                  onClick={handleUnLike}
                >
                  <ThumbDownAltIcon sx={{ color: 'red' }} />
                  {unLikes?.length}
                </IconButton>
              </Box>
            </Box>

          </Box>
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            position: 'relative',

            height: '80vh',

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

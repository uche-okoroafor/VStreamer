import { Grid, Box } from '@mui/material';
import { ILike } from '../../../interface/VideoDetails';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from '../useStyles';
import IconButton from '@mui/material/IconButton';
import { updateLikes, updateDislikes, removeLikes, removeDislikes } from '../../../helpers/APICalls/likesApis';

export default function Likes(): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const { loggedInUser } = useAuth();
  const [likes, setLikes] = useState<ILike[] | undefined>([]);
  const [dislikes, setDislikes] = useState<ILike[] | undefined>([]);

  useEffect(() => {
    setLikes(watchVideo?.likes);
    setDislikes(watchVideo?.dislikes);
  }, [watchVideo]);

  useEffect(() => {
    if (allVideos) {
      handleSetWatchVideo(watchVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  const checkUserExist = (params: ILike[] | undefined): boolean => {
    const filterUser = params?.filter((user) => user.userId === loggedInUser?.id);
    if (filterUser?.length) {
      return true;
    }
    return false;
  };

  const handleLike = async (): Promise<void> => {
    if (loggedInUser) {
      if (watchVideo) {
        const { videoId, userId } = watchVideo;

        try {
          if (checkUserExist(dislikes)) {
            await handleDislike();
          }

          if (checkUserExist(likes)) {
            const { data } = await removeLikes(userId, videoId);
            if (data?.success) {
              return handleGetAllVideos();
            }
          } else {
            const { data } = await updateLikes(loggedInUser.username, userId, videoId);
            if (data?.success) {
              return handleGetAllVideos();
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const handleDislike = async (): Promise<void> => {
    if (loggedInUser) {
      if (watchVideo) {
        const { videoId, userId } = watchVideo;

        try {
          if (checkUserExist(likes)) {
            await handleLike();
          }

          if (checkUserExist(dislikes)) {
            const { data } = await removeDislikes(userId, videoId);
            if (data?.success) {
              return handleGetAllVideos();
            }
          } else {
            const { data } = await updateDislikes(loggedInUser.username, userId, videoId);
            if (data?.success) {
              return handleGetAllVideos();
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <>
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
            onClick={handleDislike}
          >
            <ThumbDownAltIcon sx={{ color: 'red' }} />
            {dislikes?.length}
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

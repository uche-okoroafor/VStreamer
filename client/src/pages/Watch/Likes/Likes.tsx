import { Grid, Box, Typography, Stack } from '@mui/material';
import { ILike } from '../../../interface/VideoDetails';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from '../useStyles';
import IconButton from '@mui/material/IconButton';
import { updateLikes, updateDislikes, removeLikes, removeDislikes } from '../../../helpers/APICalls/likesApis';
import { useSnackBar } from '../../../context/useSnackbarContext';
import CommittedUsers from '../../../components/CommittedUsers/CommittedUsers';

export default function Likes(): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const [disableButton, setDisableButton] = useState(false);
  const [addingDislike, setAddingDislike] = useState(false);
  const { loggedInUser } = useAuth();
  const [likes, setLikes] = useState<ILike[] | undefined>([]);
  const [dislikes, setDislikes] = useState<ILike[] | undefined>([]);
  const { updateSnackBarMessage } = useSnackBar();
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
    setDisableButton(true);
    if (loggedInUser) {
      if (watchVideo) {
        const { _id, userId } = watchVideo;
        const videoId = _id;
        try {
          if (checkUserExist(dislikes)) {
            await handleDislike();
          }

          if (checkUserExist(likes)) {
            const { data } = await removeLikes(userId, videoId);
            if (data?.success) {
              setDisableButton(false);
              return handleGetAllVideos();
            }
          } else {
            const { data } = await updateLikes(loggedInUser.username, userId, videoId, loggedInUser.userImage);
            if (data?.success) {
              setDisableButton(false);
              return handleGetAllVideos();
            } else {
              updateSnackBarMessage('something went wrong,please try again');
            }
          }
        } catch (err) {
          console.error(err);
          updateSnackBarMessage('something went wrong,please try again');
        }
      }
    }
  };

  const handleDislike = async (): Promise<void> => {
    setDisableButton(true);
    if (loggedInUser) {
      if (watchVideo) {
        const { _id, userId } = watchVideo;
        const videoId = _id;

        try {
          if (checkUserExist(likes)) {
            await handleLike();
          }

          if (checkUserExist(dislikes)) {
            const { data } = await removeDislikes(userId, videoId);
            if (data?.success) {
              setDisableButton(false);
              return handleGetAllVideos();
            }
          } else {
            const { data } = await updateDislikes(loggedInUser.username, userId, videoId);
            if (data?.success) {
              setDisableButton(false);
              return handleGetAllVideos();
            } else {
              updateSnackBarMessage('something went wrong,please try again');
            }
          }
        } catch (err) {
          updateSnackBarMessage('something went wrong,please try again');
        }
      }
    }
  };
  const handleListPosition = () => {
    return '1.7rem';
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Stack direction="row" alignItems="center" className={classes.likeContainer}>
          <IconButton aria-label="update" disabled={disableButton} onClick={handleLike} size="small">
            <ThumbUpIcon sx={{ color: checkUserExist(likes) ? 'green' : '#757575' }} />
          </IconButton>
          <Typography> {likes?.length}</Typography>
          <CommittedUsers listPosition={handleListPosition()} classStyle={classes.list} usersList={likes} />
        </Stack>

        <Stack direction="row" alignItems="center">
          <IconButton aria-label="update" size="small" disabled={disableButton} onClick={handleDislike}>
            <ThumbDownAltIcon sx={{ color: checkUserExist(dislikes) ? 'red' : '#757575' }} />
          </IconButton>
          <Typography> {dislikes?.length}</Typography>
        </Stack>
      </Stack>
    </>
  );
}

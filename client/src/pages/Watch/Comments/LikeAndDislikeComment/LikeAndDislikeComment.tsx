import { Button, Box, TextareaAutosize, Stack, Typography, Avatar } from '@mui/material';
import { IComment, ILike } from '../../../../interface/VideoDetails';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAllVideos } from '../../../../context/useAllVideosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/useAuthContext';
import useStyles from '../../useStyles';
import { useSnackBar } from '../../../../context/useSnackbarContext';
import IconButton from '@mui/material/IconButton';
import {
  removeCommentLikes,
  updateCommentLikes,
  removeCommentDislikes,
  updateCommentDislikes,
} from '../../../../helpers/APICalls/commentLikes';
import { stringAvatar } from '../../../../pages/Profile/useStyles';
import CommittedUsers from '../../../../components/CommittedUsers/CommittedUsers';

interface Props {
  comment: IComment;
}

export default function LikeAndDislikeComment({ comment }: Props): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const { loggedInUser } = useAuth();
  const [likes, setLikes] = useState<ILike[] | undefined>([]);
  const { updateSnackBarMessage } = useSnackBar();

  //   useEffect(() => {
  //     setLikes(watchVideo?.likes);
  //     setdislikes(watchVideo?.dislikes);
  //   }, [watchVideo]);

  useEffect(() => {
    if (allVideos) {
      handleSetWatchVideo(watchVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  const checkUserExist = (params: Array<ILike> | undefined): boolean => {
    const filterUser = params?.filter((user) => user.userId === loggedInUser?.id);
    if (filterUser?.length) {
      return true;
    }
    return false;
  };

  const handleLike = async (): Promise<void> => {
    if (loggedInUser) {
      if (watchVideo) {
        const { _id, userId } = watchVideo;
        const commentId = comment._id;
        const videoId = _id;
        try {
          if (checkUserExist(comment?.dislikes)) {
            await handleDislike();
          }

          if (checkUserExist(comment.likes)) {
            const { data } = await removeCommentLikes(userId, videoId, commentId);
            if (data?.success) {
              return handleGetAllVideos();
            }
          } else {
            const { data } = await updateCommentLikes(
              loggedInUser.username,
              userId,
              videoId,
              commentId,
              loggedInUser?.userImage,
            );
            if (data?.success) {
              return handleGetAllVideos();
            }
          }
        } catch (err) {
          console.error(err);
          updateSnackBarMessage('like not updated');
        }
      }
    }
  };

  const handleDislike = async (): Promise<void> => {
    if (loggedInUser) {
      if (watchVideo) {
        const { _id, userId } = watchVideo;
        const videoId = _id;
        const commentId = comment._id;

        try {
          if (checkUserExist(comment.likes)) {
            await handleLike();
          }

          if (checkUserExist(comment.dislikes)) {
            const { data } = await removeCommentDislikes(userId, videoId, commentId);
            if (data?.success) {
              return handleGetAllVideos();
            }
          } else {
            const { data } = await updateCommentDislikes(loggedInUser.username, userId, videoId, commentId);
            if (data?.success) {
              return handleGetAllVideos();
            }
          }
        } catch (err) {
          console.error(err);
          updateSnackBarMessage('dislike not updated');
        }
      }
    }
  };
  return (
    <>
      <Stack direction="row" spacing={1}>
        <Stack direction="row" alignItems="center" className={classes.likeContainer}>
          <IconButton
            aria-label="update"
            // color="primary"
            onClick={handleLike}
            size="small"
          >
            <ThumbUpIcon sx={{ fontSize: '1.2rem', color: checkUserExist(comment.likes) ? 'green' : '' }} />{' '}
          </IconButton>{' '}
          <Typography>{comment.likes?.length !== 0 && comment.likes?.length}</Typography>
          <CommittedUsers usersList={comment.likes} styles={classes.list} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <IconButton
            aria-label="update"
            // color="primary"
            onClick={handleDislike}
            size="small"
          >
            <ThumbDownAltIcon sx={{ fontSize: '1.2rem', color: checkUserExist(comment.dislikes) ? 'red' : '' }} />
          </IconButton>
          <Typography>{comment.dislikes?.length !== 0 && comment.dislikes?.length}</Typography>
        </Stack>
      </Stack>
    </>
  );
}

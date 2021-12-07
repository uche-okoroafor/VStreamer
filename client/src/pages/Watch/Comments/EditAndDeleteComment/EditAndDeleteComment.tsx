import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAllVideos } from '../../../../context/useAllVideosContext';
import { useEffect } from 'react';
import useStyles from '../../useStyles';
import IconButton from '@mui/material/IconButton';
import { deleteComment } from '../../../../helpers/APICalls/commentApis';
import { useSnackBar } from '../../../../context/useSnackbarContext';

interface Props {
  commentId: string | undefined;
  setOpenComment: React.Dispatch<boolean>;
  setEditComment: React.Dispatch<boolean>;
  setComment: React.Dispatch<string>;
  comment: string;
  setCommentId: React.Dispatch<string>;
}

export default function EditAndDeleteComment({
  commentId,
  setOpenComment,
  setEditComment,
  setComment,
  comment,
  setCommentId,
}: Props): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    if (allVideos) {
      handleSetWatchVideo(watchVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  const handleEditComment = (): void => {
    setComment(comment);
    setOpenComment(true);
    setEditComment(true);
    if (commentId) setCommentId(commentId);
  };

  const handleDeleteComment = async (): Promise<void> => {
    if (watchVideo) {
      const { userId, _id } = watchVideo;
      const videoId = _id;
      try {
        const { data } = await deleteComment({ commentId, userId, videoId });
        if (data?.success) {
          handleGetAllVideos();
        }
      } catch (err) {
        console.error(err);
        updateSnackBarMessage('Comment not deleted');
      }
    }
  };
  return (
    <>
      <Stack direction="row" spacing={1}>
        {' '}
        <IconButton aria-label="update" color="primary" onClick={handleEditComment} size="small">
          <EditIcon sx={{ fontSize: '1.2rem' }} />{' '}
        </IconButton>
        <IconButton
          aria-label="update"
          // color="primary"
          onClick={handleDeleteComment}
          size="small"
        >
          <DeleteIcon sx={{ fontSize: '1.2rem', color: 'red' }} />{' '}
        </IconButton>
      </Stack>
    </>
  );
}

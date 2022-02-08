import { Button, Box, TextareaAutosize, Stack, Typography, Paper } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useAllVideos } from '../../../../context/useAllVideosContext';
import { useEffect } from 'react';
import { useAuth } from '../../../../context/useAuthContext';
import useStyles from '../../useStyles';
import IconButton from '@mui/material/IconButton';
import { addComment, editComment } from '../../../../helpers/APICalls/commentApis';
import { useSnackBar } from '../../../../context/useSnackbarContext';

interface Props {
  openComment: boolean;
  setOpenComment: React.Dispatch<boolean>;
  isEditComment: boolean;
  setEditComment: React.Dispatch<boolean>;
  setComment: React.Dispatch<string>;
  comment: string;
  commentId: string;
}

export default function AddComment({
  openComment,
  setOpenComment,
  isEditComment,
  setEditComment,
  comment,
  setComment,
  commentId,
}: Props): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    if (allVideos) {
      handleSetWatchVideo(watchVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!comment) {
      return;
    }
    const loggedInUsername = loggedInUser?.username;
    if (watchVideo) {
      const { userId, _id } = watchVideo;
      const videoId = _id;
      try {
        const { data } = await addComment(comment, userId, videoId, loggedInUsername);
        if (data?.success) {
          handleGetAllVideos();
          handleCloseComment();
        }
      } catch (err) {
        console.error(err);
        updateSnackBarMessage('comment not added');
      }
    }
  };

  const handleEditComment = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!comment) {
      return;
    }
    if (watchVideo) {
      const { userId, _id } = watchVideo;
      const videoId = _id;
      try {
        const { data } = await editComment(comment, userId, videoId, commentId);
        if (data?.success) {
          handleGetAllVideos();
          handleCloseComment();
        }
      } catch (err) {
        console.error(err);
        updateSnackBarMessage('comment not updated');
      }
    }
  };
  const handleOpenComment = (): void => {
    setOpenComment(true);
    const input = document.getElementById('commentInput');
    if (input !== null) {
      input.focus();
      input.click();
    }
  };
  const handleCloseComment = (): void => {
    setOpenComment(false);
    setComment('');
    setEditComment(false);
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: '5px',
          position: 'fixed',
          minHeight: 80,
          width: {
            xs: openComment ? '80%' : '5%',
            sm: openComment ? '80%' : '5%',
            md: openComment ? '64%' : '5%',
          },
          bottom: 0,
          right: {
            xs: '10%',
            md: '31%',
          },
        }}
      >
        {openComment ? (
          <Paper sx={{ background: 'white', width: '100%', padding: '20px 40px' }}>
            <form onSubmit={isEditComment ? handleEditComment : handleAddComment} style={{ width: '100%' }}>
              <TextareaAutosize
                aria-label="minimum height"
                id="commentInput"
                minRows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="add a comment"
                style={{ width: '100%', background: '#f9f9f9', padding: '5px', borderRadius: '5px', resize: 'none' }}
              />
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                {' '}
                <Button size="small" type="submit" color="primary" variant="contained">
                  Comment
                </Button>
                <Button type="submit" onClick={handleCloseComment} size="small" color="primary" variant="contained">
                  Cancel
                </Button>
              </Stack>
            </form>
          </Paper>
        ) : (
          <Box sx={{ position: 'relative', width: '10%', background: 'green', float: 'right' }}>
            <IconButton
              sx={{
                position: 'absolute',
                marginTop: '-3rem',
                boxShadow: ' 0px 0px 9px 0px rgba(0,0,0,0.75)',
                right: '0%',
                background: '#f9f9f9',
                color: '#1976D2',
                '&:hover': {
                  background: '#1976D2',
                  color: 'white',
                },
              }}
              className={classes.addCommentBtn}
              aria-label="update"
              onClick={handleOpenComment}
              size="large"
            >
              <ChatBubbleOutlineIcon
                sx={{
                  fontSize: '50px',
                }}
              />{' '}
            </IconButton>
            <Typography
              sx={{
                position: 'absolute',
                marginTop: '1.5rem',
                right: '0%',
                color: '#1976D2',
              }}
            >
              comment
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

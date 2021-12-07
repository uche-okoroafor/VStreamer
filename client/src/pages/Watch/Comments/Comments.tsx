import { Box, Stack, Typography, Avatar } from '@mui/material';
import moment from 'moment';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from '../useStyles';
import { useUserDetails } from '../../../context/useUserContext';
import { stringAvatar } from '../useStyles';
import AddComment from './AddComment/AddComment';
import LikeAndDislikeComment from './LikeAndDislikeComment/LikeAndDislikeComment';
import EditAndDeleteComment from './EditAndDeleteComment/EditAndDeleteComment';
import { useHistory } from 'react-router';
import { Paper } from '@mui/material';

interface Props {
  displayCommentBtn: boolean;
}

export default function Comments({ displayCommentBtn }: Props): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleSetWatchVideo } = useAllVideos();
  const { loggedInUser } = useAuth();
  const [comment, setComment] = useState('');
  const { handleGetUserDetails } = useUserDetails();
  const [openComment, setOpenComment] = useState(false);
  const [commentId, setCommentId] = useState('');
  const history = useHistory();
  const [isEditComment, setEditComment] = useState(false);

  useEffect(() => {
    if (allVideos) {
      handleSetWatchVideo(watchVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  const handleDisplayUserProfile = (): void => {
    if (watchVideo) {
      const user = { username: watchVideo.username, id: watchVideo.userId, email: 'undefined' };
      handleGetUserDetails(user);
      history.push(`/profile/${watchVideo.username}`);
    }
  };

  return (
    <>
      <Box style={{ minHeight: '100px', paddingTop: '20px', whiteSpace: 'nowrap' }}>
        <Typography
          sx={{
            margin: '10px',
            marginLeft: {
              xs: '2rem',
              sm: '2rem',
              md: '9rem',
              lg: '9rem',
              xl: '9rem',
            },
          }}
        >
          Comments
        </Typography>
        <Box
          sx={{
            marginLeft: {
              xs: '0rem',
              sm: '0rem',
              md: '5rem',
              lg: '5rem',
              xl: '5rem',
            },
            padding: '40px 0',
          }}
        >
          {watchVideo?.comments?.length ? (
            watchVideo?.comments?.map((comment) => (
              <Box key={comment._id}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar
                    style={{ cursor: 'pointer', border: '1px solid #1976D2' }}
                    onClick={handleDisplayUserProfile}
                    {...stringAvatar(comment.username.toUpperCase(), 45, 45)}
                    src={`/image/get-image/${comment.userId}`}
                  />
                  <Typography style={{ cursor: 'pointer' }} color="primary" onClick={handleDisplayUserProfile}>
                    {comment.username}
                  </Typography>
                  <Typography style={{ fontSize: '0.8rem' }}>
                    {moment(comment.commentDate).format('MMMM Do YYYY')}
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    marginLeft: {
                      xs: '3rem',
                      sm: '3rem',
                      md: '4rem',
                      lg: '4rem',
                      xl: '4rem',
                    },
                  }}
                >
                  <Paper
                    sx={{
                      padding: '10px',
                      borderRadius: '5px',
                      background: 'white',
                      minHeight: 80,
                      width: { xs: '100%', sm: '90%' },
                      overflowWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    <Typography>{comment.comment}</Typography>
                  </Paper>
                  <Stack
                    sx={{
                      marginLeft: {
                        xs: '2px',
                        sm: '2px',
                        md: '5px',
                        lg: '5px',
                        xl: '5px',
                      },
                      marginTop: '5px',
                    }}
                    direction="row"
                    spacing={3}
                  >
                    <LikeAndDislikeComment comment={comment} />
                    {loggedInUser?.id === comment.userId && (
                      <EditAndDeleteComment
                        setOpenComment={setOpenComment}
                        commentId={comment._id}
                        comment={comment.comment}
                        setEditComment={setEditComment}
                        setComment={setComment}
                        setCommentId={setCommentId}
                      />
                    )}
                  </Stack>
                </Stack>
              </Box>
            ))
          ) : (
            <Typography align="center">No comment for this video</Typography>
          )}{' '}
          {!displayCommentBtn && (
            <AddComment
              openComment={openComment}
              isEditComment={isEditComment}
              setEditComment={setEditComment}
              comment={comment}
              setOpenComment={setOpenComment}
              setComment={setComment}
              commentId={commentId}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

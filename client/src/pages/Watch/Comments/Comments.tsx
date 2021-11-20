import { Button, Box, TextareaAutosize } from '@mui/material';
import { ILike } from '../../../interface/VideoDetails';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from '../useStyles';
import { addComment, editComment, deleteComment } from '../../../helpers/APICalls/CommentApi';

export default function Comments(): JSX.Element {
  const classes = useStyles();
  const { allVideos, watchVideo, handleGetAllVideos, handleSetWatchVideo } = useAllVideos();
  const { loggedInUser } = useAuth();
  const [likes, setLikes] = useState<ILike[] | undefined>([]);
  const [comment, setComment] = useState('');

  //   useEffect(() => {
  //     setLikes(watchVideo?.likes);
  //     setdislikes(watchVideo?.dislikes);
  //   }, [watchVideo]);

  //   useEffect(() => {
  //     if (allVideos) {
  //       handleSetWatchVideo(watchVideo);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [allVideos]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    const loggedInUsername = loggedInUser?.username;
    if (watchVideo) {
      const { userId, videoId } = watchVideo;
      e.preventDefault();
      try {
        // const response = await addComment(comment, userId, videoId, loggedInUsername);
        const response = await deleteComment(userId, videoId, '59593f0a-0b7b-402a-99e3-a944b045bd18');
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Box style={{ minHeight: '100px', paddingTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            onChange={(e) => setComment(e.target.value)}
            placeholder="add a comment"
            style={{ width: 200 }}
          />

          <Button type="submit" color="primary" variant="contained">
            Comment
          </Button>
        </form>
      </Box>
    </>
  );
}

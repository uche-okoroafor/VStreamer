import { Box, Container, Paper, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import VideosList from '../../components/VideosList/VideosList';
import { useAllVideos } from '../../context/useAllVideosContext';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';

export default function Home(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { allVideos, handleGetAllVideos } = useAllVideos();
  const videoPlayerOptions = {
    width: '550',
    height: '300',
    autoPlay: false,
    displayDetails: true,
    component: 'Home',
    classes,
  };
  useEffect(() => {
    handleGetAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={{ padding: 50 }}>
      <Paper style={{ minHeight: '80vh', padding: ' 25px  10px', maxWidth: '90%', margin: '0 auto' }}>
        <VideosList videos={allVideos} videoPlayerOptions={videoPlayerOptions} />
      </Paper>
    </Container>
  );
}

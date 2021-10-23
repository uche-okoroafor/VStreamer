/* eslint-disable prettier/prettier */
import { Box, Container, Paper, Typography } from '@material-ui/core';
import VideosList from '../../components/Videos/VideosList';
import { useAllVideos } from '../../context/useAllVideosContext';
import { useAuth } from '../../context/useAuthContext';

export default function Home(): JSX.Element {
  const { loggedInUser } = useAuth();
  const { allVideos } = useAllVideos();
  const videoPlayerOptions = {
    width: '550',
    height: '300',
    autoPlay: false,
    displayDetails: true,
  };

  return (
    <Container>
      <Typography variant="h3" align="center">
        welcome {loggedInUser ? loggedInUser.username : 'Guest'}
      </Typography>
      <Paper style={{ minHeight: '80vh', maxWidth: '80%', margin: '0 auto' }}>
        <VideosList allVideos={allVideos} videoPlayerOptions={videoPlayerOptions} />
      </Paper>
    </Container>
  );
}

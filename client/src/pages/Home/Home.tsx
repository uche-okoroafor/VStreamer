/* eslint-disable prettier/prettier */
import { Box, Container, Paper, Typography } from '@material-ui/core';
import VideosList from '../../components/Videos/VideosList';
import { useAuth } from '../../context/useAuthContext';

export default function Home(): JSX.Element {
  const { loggedInUser } = useAuth();


  return (
    <Container>
      <Typography variant="h3" align="center">
        welcome {loggedInUser ? loggedInUser.username : 'Guest'}
      </Typography>
      <Paper style={{ minHeight: '80vh', maxWidth: '80%', margin: '0 auto' }}>
<Box>

<VideosList/>

</Box>

</Paper>
    </Container>
  );
}

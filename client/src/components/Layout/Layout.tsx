import { Box, CircularProgress } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import NavBar from './NavBar/NavBar';
import { useHistory } from 'react-router';
import { useSocket } from '../../context/useSocketContext';
import { useEffect } from 'react';
import { useState } from 'react';

function Layout(): JSX.Element {
  const { loggedInUser } = useAuth();

  const history = useHistory();
  const { initSocket } = useSocket();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) {
    return <CircularProgress />;
  }
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Box
      style={{
        display: !loggedInUser ? 'none' : 'block',
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* <Paper style={{ minHeight: '80vh', maxWidth: '80%', margin: '0 auto' }}>
        <Box></Box>
      </Paper> */}
      <NavBar loggedInUser={loggedInUser} />
    </Box>
  );
}

export default Layout;

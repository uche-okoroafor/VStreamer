import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { useAllVideos } from '../../context/useAllVideosContext';
import React, { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';


/**
 * @dev renders Login page
 */

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { allVideos, handleGetAllVideos } = useAllVideos();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (allVideos === undefined) handleGetAllVideos();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  const loginGuest = () => {
    login('guest@gmail.com', '123456').then((data) => {
      if (data.error) {
        setIsLoading(false);
        // updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setIsLoading(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        // updateSnackBarMessage(data.error);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Box className={classes.authWrapper} style={{ color: 'white' }}>
        <AuthHeader linkTo="/signup" asideText="Don't have an account?" btnText="Create account" />
        <Box width="100%" maxWidth={500} p={3} alignSelf="center">
          <Paper elevation={5} className={classes.loginContainer}>
            <Grid container>
              <Grid item xs>
                <Typography
                  className={classes.welcome}
                  align="center"
                  style={{ color: 'white' }}
                  component="h1"
                  variant="h5"
                >
                  Sign in
                </Typography>
              </Grid>
            </Grid>
            <LoginForm handleSubmit={handleSubmit} isLoading={isLoading} loginGuest={loginGuest} />
          </Paper>
        </Box>
        <Box alignSelf="center" />
      </Box>
      {loading && (
        <Box
          style={{
            background: 'white',
            position: 'fixed',
            width: '100%',
            height: '100%',
            left: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress style={{ color: '#2069AF' }} />
        </Box>
      )}
    </Grid>
  );
}

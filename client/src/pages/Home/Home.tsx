import { Box, Container, Paper, Grid, useMediaQuery, useTheme, Typography } from '@material-ui/core';
import { useEffect } from 'react';
import VideosList from '../../components/VideosList/VideosList';
import { useAllVideos } from '../../context/useAllVideosContext';
import { useAuth } from '../../context/useAuthContext';
import useStyles from './useStyles';

export default function Home(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { allVideos, handleGetAllVideos } = useAllVideos();
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up('sm'));

  const videoPlayerOptions = {
    width: '550',
    height: isSmallOrLess ? '300' : '200',
    autoPlay: false,
    displayDetails: true,
    component: 'Home',
    classes,
  };
  useEffect(() => {
    if (allVideos === undefined) handleGetAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  return (
    <Grid container component="div">
      <Grid
        item
        lg={10}
        md={11}
        sm={10}
        xs={12}
        style={{ minHeight: '100vh', padding: ' 25px  10px', margin: '0 auto' }}
      >
        <VideosList videos={allVideos} videoPlayerOptions={videoPlayerOptions} />
      </Grid>
    </Grid>
  );
}

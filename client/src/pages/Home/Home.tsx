import { Box, Grid, useMediaQuery, useTheme, CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import VideosList from '../../components/VideosList/VideosList';
import { useAllVideos } from '../../context/useAllVideosContext';
import useStyles from './useStyles';

export default function Home(): JSX.Element {
  const classes = useStyles();
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
  const rect2 = document.getElementById('pro1')?.getBoundingClientRect();

  const rect3 = document.getElementById('pro2')?.getBoundingClientRect();

  return (
    <Grid container component="div">
      <Box id="pro1"></Box>
      <Grid item lg={10} md={11} sm={10} xs={12} className={classes.videosContainer}>
        {allVideos !== undefined ? (
          <VideosList videos={allVideos} videoPlayerOptions={videoPlayerOptions} />
        ) : (
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
      <Box id="pro2"></Box>
    </Grid>
  );
}

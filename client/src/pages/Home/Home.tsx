import { Box, Grid, useMediaQuery, useTheme, CircularProgress } from '@material-ui/core';
import { useEffect } from 'react';
import VideosList from '../../components/VideosList/VideosList';
import { useAllVideos } from '../../context/useAllVideosContext';
import useStyles from './useStyles';

/**
 * @dev renders home page with list of videos and its details
 */


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

  return (
    <Grid container component="div">
      <Grid item lg={10} md={11} sm={10} xs={12} className={classes.videosContainer}>
        {allVideos !== undefined ? (
          <VideosList videos={allVideos} videoPlayerOptions={videoPlayerOptions} />
        ) : (
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

// import { Box } from '@mui/material';
// import { useContext, useEffect, useState } from 'react';
// import { useAllVideos } from '../../../../../context/useAllVideosContext';
// import { useHistory } from 'react-router-dom';
// import { List, Paper, Typography, ListItem, ListItemText } from '@material-ui/core';
// import { IVideoDetails } from '../../../../../interface/VideoDetails';

import { Typography } from '@mui/material';

interface IProps {
  searchedVideo: string;
}

export default function Profile(): JSX.Element {
  return <Typography variant="h3">welcome to Profile</Typography>;
}

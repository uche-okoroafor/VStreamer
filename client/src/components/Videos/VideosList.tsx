import React, { useState, useEffect, useContext } from 'react';
import { useAllVideos } from '../../context/useAllVideosContext';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import VideoPlayer from '../VideoPlayer/VideosPlayer';
import { IVideoDetails, IAllVideos } from '../../interface/VideoDetails';

interface IProps {
  allVideos: IAllVideos | undefined;
  videoPlayerOptions: {
    width: string;
    height: string;
    autoPlay: boolean;
    displayDetails: boolean;
  };
}

export default function VideosList({ allVideos, videoPlayerOptions }: IProps) {
  const { handleSetwatchVideo } = useAllVideos();
  const history = useHistory();

  function handleClickedSearchResult(video: IVideoDetails) {
    handleSetwatchVideo(video);
    history.push(`/watch/${video.videoTitle}`);
  }

  return (
    <React.Fragment>
      {allVideos ? (
        allVideos.map((video) => (
          <Box display="flex" justifyContent="center" key={video.videoId}>
            <Box>
              <Box onClick={() => handleClickedSearchResult(video)}></Box>
              <VideoPlayer videoSource={video.videoSource} videoPlayerOptions={videoPlayerOptions} />
            </Box>
            {videoPlayerOptions
              ? videoPlayerOptions.displayDetails && (
                  <Box>
                    <Typography>{video.videoTitle}</Typography>
                    <Typography>user</Typography>
                    <Typography>
                      <Link to={'/watch/' + video.videoTitle}>video duration</Link>
                    </Typography>
                    <Typography>likes</Typography>
                    <Typography>comments</Typography>
                    <Typography>views</Typography>
                  </Box>
                )
              : ''}
          </Box>
        ))
      ) : (
        <Typography>No Videos to Display</Typography>
      )}
    </React.Fragment>
  );
}

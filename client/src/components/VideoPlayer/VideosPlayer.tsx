import { duration } from '@material-ui/core';
import { Box, CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import { Component, useEffect, useRef } from 'react';
import Player from 'react-player';

interface IProps {
  videoSource: string | undefined;
  setVideoDuration: React.Dispatch<string>;
  videoPlayerOptions: {
    width: string;
    height: string;
    autoPlay: boolean;
    component: string;
    classes: any;
  };
}

export default function VideoPlayer({ videoSource, videoPlayerOptions, setVideoDuration }: IProps): JSX.Element {
  const { width, height, autoPlay, component, classes } = videoPlayerOptions;

  const handleDuration = (duration: number): void => {
    const durationInMinutes = duration / 60;
    setVideoDuration(durationInMinutes.toFixed(2).toString());
  };

  return (
    <>
      {videoSource ? (
        <Player
          playing={autoPlay}
          controls
          width={parseInt(width)}
          onDuration={(duration) => handleDuration(duration)}
          height={parseInt(height)}
          style={{ zIndex: 0 }}
          url={videoSource}
        />
      ) : (
        // !videoSource.includes('youtube') ? (
        //   <video id="videoId" autoPlay={autoPlay} width={width} height={height} controls style={{ zIndex: 0 }}>
        //     <source src={videoSource} type="video/mp4" />
        //     <source src={videoSource} type="video/ogg" />
        //     Your browser does not support HTML video.
        //   </video>
        // ) : (
        //   <iframe
        //     width={width}
        //     height={height}
        //     src={videoSource}
        //     title="YouTube video player"
        //     frameBorder="0"
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //     allowFullScreen
        //   ></iframe>
        // )
        <>
          <video id="videoId" autoPlay={autoPlay} width={width} height={height} controls style={{ zIndex: 0 }}>
            <source src={videoSource} type="video/mp4" />
            <source src={videoSource} type="video/ogg" />
            Your browser does not support HTML video.
          </video>
          {component !== 'UploadVideoForm' ? (
            <CircularProgress sx={{ position: 'absolute', top: '40%', right: '45%', color: 'white' }} />
          ) : (
            <Typography>Select video</Typography>
          )}
        </>
      )}
    </>
  );
}

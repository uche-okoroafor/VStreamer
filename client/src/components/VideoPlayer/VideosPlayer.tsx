import { Box, CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import { Component, useEffect, useRef } from 'react';

interface IProps {
  videoSource: string | undefined;

  videoPlayerOptions: {
    width: string;
    height: string;
    autoPlay: boolean;
    component: string;
    classes: any;
  };
}

export default function VideoPlayer({ videoSource, videoPlayerOptions }: IProps): JSX.Element {
  const { width, height, autoPlay, component, classes } = videoPlayerOptions;

  // useEffect(() => {
  //   if (videoSource) console.log(videoSource);
  // }, [videoSource]);

  return (
    <>
      {videoSource ? (
        !videoSource.includes('youtube') ? (
          <video id="video" autoPlay={autoPlay} width={width} height={height} controls style={{ zIndex: 0 }}>
            <source src={videoSource} type="video/mp4" />
            <source src={videoSource} type="video/ogg" />
            Your browser does not support HTML video.
          </video>
        ) : (
          <iframe
            width={width}
            height={height}
            src={videoSource}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      ) : (
        <>
          <video id="video" autoPlay={autoPlay} width={width} height={height} controls style={{ zIndex: 0 }}>
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

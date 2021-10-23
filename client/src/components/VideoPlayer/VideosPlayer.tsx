import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

interface IProps {
  videoSource: string | undefined;
  videoPlayerOptions: {
    width: string;
    height: string;
    autoPlay: boolean;
  };
}

export default function VideoPlayer({ videoSource, videoPlayerOptions }: IProps): JSX.Element {
  // const nameRef = useRef<HTMLVideoElement | undefined>(undefined);

  useEffect(() => {
    if (videoSource) console.log(document.getElementsByTagName('video'));
  }, [videoSource]);

  return (
    <>
      {videoSource ? (
        !videoSource.includes('youtube') ? (
          <video
            id="video"
            // ref={nameRef}
            width={videoPlayerOptions.width}
            height={videoPlayerOptions.height}
            controls
          >
            <source src={videoSource} type="video/mp4" />
            <source src={videoSource} type="video/ogg" />
            Your browser does not support HTML video.
          </video>
        ) : (
          <iframe
            width={videoPlayerOptions.width}
            height={videoPlayerOptions.height}
            src={videoSource}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )
      ) : (
        <Typography>Video source undefined</Typography>
      )}
    </>
  );
}

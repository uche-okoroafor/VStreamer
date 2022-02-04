import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
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
  displayControls: boolean;
}

export default function VideoPlayer({
  videoSource,
  videoPlayerOptions,
  setVideoDuration,
  displayControls,
}: IProps): JSX.Element {
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
          controls={displayControls}
          width={parseInt(width)}
          onDuration={(duration) => handleDuration(duration)}
          height={parseInt(height)}
          style={{ zIndex: 0 }}
          url={videoSource}
        />
      ) : (
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

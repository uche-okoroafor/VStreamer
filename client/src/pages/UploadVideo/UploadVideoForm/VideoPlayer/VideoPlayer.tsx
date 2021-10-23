/* eslint-disable prettier/prettier */
import { Container, Typography, Box } from '@material-ui/core';

interface Props {
  tempOtherVideoSource: string;
  videoSource: string;
  displayYouTubeVideo: string;
  tempYoutubeVideoSource: string;
  displayVideo: string;
}

export default function VideoPlayer({
  tempOtherVideoSource,
  videoSource,
  displayYouTubeVideo,
  tempYoutubeVideoSource,
  displayVideo,
}: Props): JSX.Element {

//  const classes = useStyles();


  return (
    <Box className="videoFrame">
{/* <DeleteForeverIcon /> */}
      {videoSource.length > 0 && (
        <Box display="flex" justifyContent="center">
          <Box style={{ display: displayVideo }}>
            <video width="500" height="315" controls>
              <source src={tempOtherVideoSource} type="video/mp4" />
              <source src={tempOtherVideoSource} type="video/ogg" />
              Your browser does not support HTML video.
            </video>
          </Box>
          <Box style={{ display: displayYouTubeVideo }}>
            <iframe
              width="560"
              height="315"
              src={tempYoutubeVideoSource}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      )}
    </Box>
  );
}

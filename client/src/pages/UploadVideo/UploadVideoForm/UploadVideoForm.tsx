/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Paper, TextField, Typography, Button, Box, CircularProgress, styled } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import VideoPlayer from './VideoPlayer/VideoPlayer';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setFile: React.Dispatch<
    React.SetStateAction<{
      name: string;
      lastModified: number;
      size: number;
      type: string;
    } | null>
  >;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  setVideoSource: React.Dispatch<React.SetStateAction<string>>;
  setVideoTitle: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
  uploadProgress: number | null | undefined;
  videoSource: string;
}

export default function UploadVideoForm({
  handleSubmit,
  setFile,
  setVideoId,
  setFileName,
  videoSource,
  setVideoSource,
  setVideoTitle,
  isSubmitting,
  uploadProgress,
}: Props): JSX.Element {
  //   const { handleUpdataData, user } = useContext(StateContext);
  const [tempOtherVideoSource, setTempOtherVideoSource] = useState('');
  const [tempYoutubeVideoSource, setTempYoutubeVideoSource] = useState('');
  const [displayVideo, setDisplayVideo] = useState('block');
  const [displayYouTubeVideo, setDisplayYouTubeVideo] = useState('none');

  //   const [videoSource, setVideoSource] = useState('');

  const Input = styled('input')({
    display: 'none',
  });
  //   const [isSubmitting, setSubmitting] = useState(false);

  //  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const video_Id = uuidv4();
    const { name, value, files } = e.target;
    setVideoId(video_Id);
    switch (name) {
      case 'videoSource':
        if (value.includes('youtu')) {
          handleYoutubeUrl(value);
        } else {
          setDisplayYouTubeVideo('none');
          setDisplayVideo('block');
          setTempOtherVideoSource(value);
          setVideoSource(value);
        }

        break;

      case 'videoFile':
        const videoTypeIndex = 6;
        if (files) {
          const videoType = files[0].type.slice(videoTypeIndex);
          setVideoTitle(files[0].name.replace(`.${videoType}`, ''));
          setTempOtherVideoSource(URL.createObjectURL(files[0]));
          setVideoSource(`/stream_videos/${video_Id}`);
          setFile(files[0]);
        }
        break;

      default:
        break;
    }
  };

  const handleYoutubeUrl = (videoFromYoutube: string): void => {
    setDisplayYouTubeVideo('block');
    setDisplayVideo('none');

    if (+videoFromYoutube.includes('embed') > 0) {
      setVideoSource(videoFromYoutube);

      return setTempYoutubeVideoSource(videoFromYoutube);
    } else {
      const urlParams = 'youtu.be/';
      const indexOfvideoId = videoFromYoutube.search(urlParams) + urlParams.length;
      const youTubeVideoIdLength = 11;
      const videoId = videoFromYoutube.substr(indexOfvideoId, youTubeVideoIdLength);
      const videoUrl = `https://www.youtube.com/embed/${videoId}`;
      setVideoSource(videoUrl);

      return setTempYoutubeVideoSource(videoUrl);
    }
  };

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;

    setVideoTitle(value);
  };
  return (
    <Container>
      <Paper style={{ minHeight: '80vh', maxWidth: '80%', margin: '0 auto' }}>
        <Box>
          <VideoPlayer
            tempOtherVideoSource={tempOtherVideoSource}
            videoSource={videoSource}
            displayYouTubeVideo={displayYouTubeVideo}
            tempYoutubeVideoSource={tempYoutubeVideoSource}
            displayVideo={displayVideo}
          />
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          {!videoSource.length ? (
            <>
              {' '}
              <TextField
                id="videoSource"
                label={<Typography>Enter Video Source</Typography>}
                fullWidth
                margin="normal"
                variant="outlined"
                name="videoSource"
                autoFocus
                onChange={handleChange}
              />
              <Box>
                <Typography align="center">OR</Typography>
              </Box>
              <Box display="flex" justifyContent="center">
                <label htmlFor="contained-button-file">
                  <Input
                    accept="video/mp4"
                    name="videoFile"
                    onChange={handleChange}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <Button fullWidth color="secondary" variant="contained" component="span">
                    Select Video
                  </Button>
                </label>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <TextField
                  id="videoTitle"
                  label={<Typography>Enter Video Source</Typography>}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="videoTitle"
                  autoFocus
                  onChange={handleTitleInput}
                />
              </Box>

              <Box>
                <TextField
                  id="videoTitle"
                  label={<Typography>Enter Video Source</Typography>}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="videoTitle"
                  autoFocus
                  onChange={handleTitleInput}
                />
              </Box>
              <Box textAlign="center">
                <Button type="submit" size="large" variant="contained" color="primary">
                  {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Upload Video'}
                  {isSubmitting && `${uploadProgress}%`}
                </Button>
              </Box>
            </>
          )}

          <div style={{ height: 95 }} />
        </form>
      </Paper>
    </Container>
  );
}

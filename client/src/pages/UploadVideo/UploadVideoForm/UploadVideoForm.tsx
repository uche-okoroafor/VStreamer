/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Paper, TextField, Typography, Button, Box, CircularProgress, styled } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import VideoPlayer from '../../../components/VideoPlayer/VideosPlayer';

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
  setFileName,
  videoSource,
  setVideoSource,
  setVideoTitle,
  isSubmitting,
  uploadProgress,
}: Props): JSX.Element {
  const [tempVideoSource, setTempVideoSource] = useState<string | undefined>(undefined);
  const videoPlayerOptions = {
    width: '560',
    height: '315',
  autoPlay: false,
  };

  const Input = styled('input')({
    display: 'none',
  });
  //   const [isSubmitting, setSubmitting] = useState(false);

  //  const classes = useStyles();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;
    console.log(name, 1);
    switch (name) {
      case 'videoSource':
        if (value.includes('youtu')) {
          handleYoutubeUrl(value);
        } else {
          setVideoSource(value);
          setTempVideoSource(value);
        }

        break;

      case 'videoFile':
        const videoTypeIndex = 6;
        console.log(name, 2);

        if (files) {
          const videoType = files[0].type.slice(videoTypeIndex);
          setVideoTitle(files[0].name.replace(`.${videoType}`, ''));
          setVideoSource(`/stream_videos/${Date.now()}`);
          setTempVideoSource(URL.createObjectURL(files[0]));
          setFile(files[0]);
          console.log(files, 1010);
        }
        break;

      default:
        break;
    }
  };

  const handleYoutubeUrl = (videoFromYoutube: string): void => {
    if (+videoFromYoutube.includes('embed') > 0) {
      setVideoSource(videoFromYoutube);

      return setTempVideoSource(videoFromYoutube);
    } else {
      const urlParams = 'youtu.be/';
      const indexOfvideoId = videoFromYoutube.search(urlParams) + urlParams.length;
      const youTubeVideoIdLength = 11;
      const videoId = videoFromYoutube.substr(indexOfvideoId, youTubeVideoIdLength);
      const videoUrl = `https://www.youtube.com/embed/${videoId}`;
      setVideoSource(videoUrl);

      return setTempVideoSource(videoUrl);
    }
  };

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;

    setVideoTitle(value);
  };
  return (
    <Container>
      <Paper style={{ minHeight: '80vh', maxWidth: '80%', margin: '0 auto' }}>
        <Box display="flex" justifyContent="center">
          {videoSource && <VideoPlayer videoSource={tempVideoSource} videoPlayerOptions={videoPlayerOptions} />}
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
                <input
                  accept="video/mp4"
                  name="fileUpload"
                  onChange={handleChange}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    ChooseFile
                  </Button>

                  <input
                    accept="video/mp4"
                    name="videoFile"
                    onChange={handleChange}
                    id="button-file"
                    multiple
                    type="file"
                  />
                <input
                  className="form-control"
                  type="file"
                  name="fileUpload"
                  accept="video/mp4"
                  onChange={handleChange}
                  id="inputGroupFile02"
                />
                </label>
              </Box>
              {/* <Box>
                <input
                  accept="video/mp4"
                  name="videoFile"
                  onChange={handleChange}
                  id="button-file"
                  multiple
                  type="file"
                />
                <input
                  className="form-control"
                  type="file"
                  name="fileUpload"
                  accept="video/mp4"
                  onChange={(e) => handleChange(e)}
                  id="inputGroupFile02"
                />
              </Box> */}
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

/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Paper, TextField, Typography, Button, Box, CircularProgress, styled } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import VideoPlayer from '../../../components/VideoPlayer/VideosPlayer';
import DeleteIcon from '@mui/icons-material/Delete';
import DropZone from '../../../components/DropZone/DropZone';
import RenderFile from '../../../components/RenderFile/RenderFile';

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
  setTitle: React.Dispatch<React.SetStateAction<string>>;
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
  setTitle,
  isSubmitting,
  uploadProgress,
}: Props): JSX.Element {
  const [tempVideoSource, setTempVideoSource] = useState<string | undefined>(undefined);
  const videoPlayerOptions = {
    width: '560',
    height: '315',
    autoPlay: true,
    component: 'UploadVideoForm',
    classes: null,
  };
  const Input = styled('input')({
    display: 'none',
  });
  //   const [isSubmitting, setSubmitting] = useState(false);

  //  const classes = useStyles();

  const handleChange = (name: string, value: string | undefined, file: any): void => {
    switch (name) {
      case 'videoSource':
        if (value) {
          if (value?.includes('youtu')) {
            handleYoutubeUrl(value);
          } else {
            setVideoSource(value);
            setTempVideoSource(value);
          }
        }

        break;

      case 'videoFile':
        const videoTypeIndex = 6;
        if (file) {
          const videoType = file.type.slice(videoTypeIndex);
          setTitle(file.name.replace(`.${videoType}`, ''));
          setVideoSource(`/stream_videos/${Date.now()}`);
          setTempVideoSource(URL.createObjectURL(file));
          setFile(file);
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

    setTitle(value);
  };
  return (
    <Container style={{ paddingTop: '5rem' }}>
      {!videoSource.length ? (
        <DropZone handleChange={handleChange} />
      ) : (
        <Paper style={{ minHeight: '80vh', maxWidth: '80%', margin: '0 auto' }}>
          <Box display="flex" justifyContent="center">
            <Box>
              <DeleteIcon onClick={() => setVideoSource('')} />
              <VideoPlayer videoSource={tempVideoSource} videoPlayerOptions={videoPlayerOptions} />
            </Box>
          </Box>

          <form onSubmit={handleSubmit} noValidate>
            <Box>
              <TextField
                id="title"
                label={<Typography>Enter Video Source</Typography>}
                fullWidth
                margin="normal"
                variant="outlined"
                name="title"
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
            <div style={{ height: 95 }} />
          </form>
        </Paper>
      )}
    </Container>
  );
}

/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Container, Paper, TextField, Typography, Button, Box, CircularProgress, styled } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import VideoPlayer from '../../../components/VideoPlayer/VideosPlayer';
import DeleteIcon from '@mui/icons-material/Delete';
import DropZone from '../../../components/DropZone/DropZone';
import RenderFile from '../../../components/RenderFile/RenderFile';
import VideoDetailsForm from './VideoDetailsForm/VideoDetailsForm';
// import { useAllVideos } from '../../../context/useAllVideosContext';
// import { useLocation } from 'react-router-dom';

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
  videoTitle: string;
  uploadSuccess: boolean | undefined;
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
  videoTitle,
  uploadSuccess,
}: Props): JSX.Element {
  // const location = useLocation();
  const [tempVideoSource, setTempVideoSource] = useState<string | undefined>(undefined);
  const videoPlayerOptions = {
    width: '560',
    height: '315',
    autoPlay: true,
    component: 'UploadVideoForm',
    classes: null,
  };

  // useEffect(() => {
  //   console.log(location.pathname);
  //   if (editVideo && location.pathname === '/edit-video') {
  //     setVideoSource(editVideo.videoSource);
  //     setTempVideoSource(editVideo.videoSource);
  //     setVideoTitle(editVideo.videoTitle);
  //   } else {
  //     handleSetEditVideo(undefined);
  //   }
  // }, [editVideo, handleSetEditVideo, location.pathname, setVideoSource, setVideoTitle]);

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
          setVideoTitle(file.name.replace(`.${videoType}`, ''));
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

  return (
    <Container style={{ paddingTop: '3rem' }}>
      {!videoSource.length ? (
        <DropZone handleChange={handleChange} />
      ) : (
        <Paper
          style={{
            minHeight: '80vh',
            maxWidth: '70%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box display="flex" justifyContent="center" style={{ paddingTop: '3rem', position: 'relative' }}>
            <DeleteIcon
              color="secondary"
              style={{ position: 'absolute', zIndex: 1, right: '17%', top: '17%', cursor: 'pointer' }}
              onClick={() => {
                setVideoTitle('');
                setVideoSource('');
              }}
            />
            <VideoPlayer videoSource={tempVideoSource} videoPlayerOptions={videoPlayerOptions} />
          </Box>

          <VideoDetailsForm
            handleSubmit={handleSubmit}
            setVideoTitle={setVideoTitle}
            isSubmitting={isSubmitting}
            uploadProgress={uploadProgress}
            videoTitle={videoTitle}
            uploadSuccess={uploadSuccess}
          />
        </Paper>
      )}
    </Container>
  );
}

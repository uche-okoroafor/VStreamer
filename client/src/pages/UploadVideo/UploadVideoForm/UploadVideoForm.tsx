import React from 'react';
import { Container, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import VideoPlayer from '../../../components/VideoPlayer/VideosPlayer';
import DeleteIcon from '@mui/icons-material/Delete';
import DropZone from './DropZone/DropZone';
import VideoDetailsForm from './VideoDetailsForm/VideoDetailsForm';
import IconButton from '@mui/material/IconButton';

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
  setSubmitting: React.Dispatch<boolean>;
  setUploadSuccess: React.Dispatch<boolean | undefined>;
  setArtist: React.Dispatch<string>;
  setDescription: React.Dispatch<string>;
  setCategory: React.Dispatch<string>;
  isSubmitting: boolean;
  uploadProgress: number | null | undefined;
  videoSource: string;
  videoTitle: string;
  category: string;
  uploadSuccess: boolean | undefined;
  setVideoDuration: React.Dispatch<string>;
}

export default function UploadVideoForm({
  handleSubmit,
  setFile,
  setUploadSuccess,
  setSubmitting,
  setFileName,
  videoSource,
  setVideoSource,
  setVideoTitle,
  isSubmitting,
  uploadProgress,
  videoTitle,
  uploadSuccess,
  setVideoDuration,
  setArtist,
  setDescription,
  setCategory,
  category,
}: Props): JSX.Element {
  // const location = useLocation();
  const [tempVideoSource, setTempVideoSource] = useState<string | undefined>(undefined);
  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.up('sm'));
  const videoPlayerOptions = {
    width: isSmallOrLess ? '560' : '480',
    height: isSmallOrLess ? '315' : '280',
    autoPlay: true,
    component: 'UploadVideoForm',
    classes: null,
  };

  const bytesToSize = (bytes: number | undefined): void => {
    const decimals = 2;
    if (bytes === 0) {
      setVideoDuration('0 Bytes');
    }
    if (bytes) {
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      setVideoDuration(parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]);
    }
  };

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
    <Box style={{ paddingTop: '3rem' }}>
      {!videoSource.length ? (
        <DropZone handleChange={handleChange} />
      ) : (
        <Paper
          sx={{
            minHeight: '80vh',
            width: { sm: '100%', md: '75%', lg: '60%' },
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box display="flex" justifyContent="center" style={{ paddingTop: '3rem', position: 'relative' }}>
            <IconButton
              style={{
                position: 'absolute',
                zIndex: 1,
                right: '2%',
                top: '17%',
                cursor: 'pointer',
              }}
              aria-label="update"
              onClick={() => {
                setVideoTitle('');
                setVideoSource('');
                setSubmitting(false);
                setUploadSuccess(undefined);
              }}
            >
              {' '}
              <DeleteIcon sx={{ color: 'red' }} />
            </IconButton>

            <VideoPlayer
              videoSource={tempVideoSource}
              setVideoDuration={setVideoDuration}
              videoPlayerOptions={videoPlayerOptions}
            />
          </Box>

          <VideoDetailsForm
            handleSubmit={handleSubmit}
            setVideoTitle={setVideoTitle}
            isSubmitting={isSubmitting}
            uploadProgress={uploadProgress}
            videoTitle={videoTitle}
            uploadSuccess={uploadSuccess}
            setArtist={setArtist}
            setDescription={setDescription}
            setCategory={setCategory}
            category={category}
          />
        </Paper>
      )}
    </Box>
  );
}

// "proxy": "https://vstreamer-api-server.herokuapp.com",

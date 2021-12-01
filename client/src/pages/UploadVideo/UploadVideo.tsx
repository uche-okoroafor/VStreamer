/* eslint-disable prettier/prettier */
import { Container, Typography, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import UploadVideoForm from './UploadVideoForm/UploadVideoForm';
import { uploadVideoDetails } from '../../helpers/APICalls/uploadVideo';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAllVideos } from '../../context/useAllVideosContext';

import { IVideoDetails } from '../../interface/VideoDetails';
import { useSnackBar } from '../../context/useSnackbarContext';
import { IViewerResponse } from '../../interface/ApiResponse';

interface IState {
  stringValue: string;
  numberValue: number | undefined | null;
  handleSubmit: () => void;
  file: {
    name: string;
    lastModified: number;
    size: number;
    type: string;
  } | null;
}

export default function UploadVideo(): JSX.Element {
  const { loggedInUser } = useAuth();
  const [file, setFile] = useState<IState['file']>(null);
  const [videoDuration, setVideoDuration] = useState('');
  const [fileName, setFileName] = useState('Choose a file');
  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState<IState['numberValue']>(0);
  const [videoSource, setVideoSource] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { handleGetAllVideos } = useAllVideos();
  const { updateSnackBarMessage } = useSnackBar();
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  console.log(videoDuration, 'videoDuration');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!videoTitle || !description || !category) {
      return;
    }

    setSubmitting(true);
    if (loggedInUser) {
      const videoDetails: IVideoDetails = {
        username: loggedInUser?.username,
        userId: loggedInUser?.id,
        userImage: loggedInUser?.userImage,
        videoTitle,
        videoId: '',
        videoSource,
        videoDescription: description,
        artist: artist,
        videoCategory: category,
        videoDuration,
        _id: '',
      };
      if (file) {
        await handleUploadVideoToCloud(videoDetails);
      } else {
        await handleUploadVideoDetails(videoDetails);
      }
    }
    setSubmitting(false);
  };

  const handleUploadVideoToCloud = async (videoDetails: IVideoDetails) => {
    const formData: any = new FormData();
    formData.append('video', file);
    try {
      const { data } = await axios.post(`/video/upload-video`, formData, {
        headers: {
          'content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      });
      if (data) {
        videoDetails.videoSource = data.url;
        console.log(videoDetails, 10101);
        await handleUploadVideoDetails(videoDetails);
      } else {
        updateSnackBarMessage('video not uploaded');
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('video not uploaded');
    }
  };

  const handleUploadVideoDetails = async (videoDetails: IVideoDetails): Promise<void> => {
    try {
      const { data } = await uploadVideoDetails(videoDetails);
      console.log(data, data?.success);
      if (data?.success) {
        setUploadSuccess(true);
        handleGetAllVideos();
      } else {
        updateSnackBarMessage('video not uploaded');
      }
    } catch (err) {
      setUploadSuccess(false);

      console.error(err);
      updateSnackBarMessage('video not uploaded');
    }
    setTimeout(() => {
      setUploadSuccess(undefined);
    }, 5000);
  };

  return (
    <Container style={{ minHeight: '90vh' }}>
      <UploadVideoForm
        handleSubmit={handleSubmit}
        videoSource={videoSource}
        setFile={setFile}
        setFileName={setFileName}
        setVideoSource={setVideoSource}
        setVideoTitle={setVideoTitle}
        videoTitle={videoTitle}
        isSubmitting={isSubmitting}
        uploadProgress={uploadProgress}
        uploadSuccess={uploadSuccess}
        setVideoDuration={setVideoDuration}
        setArtist={setArtist}
        setDescription={setDescription}
        setCategory={setCategory}
        category={category}
      />
    </Container>
  );
}

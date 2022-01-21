import { Box } from '@material-ui/core';
import { useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import UploadVideoForm from './UploadVideoForm/UploadVideoForm';
import { uploadVideoDetails } from '../../helpers/APICalls/uploadVideo';
import axios from 'axios';
import { useAllVideos } from '../../context/useAllVideosContext';
import { IVideoDetails } from '../../interface/VideoDetails';
import { useSnackBar } from '../../context/useSnackbarContext';

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
        await handleUploadVideoDetails(videoDetails);
      } else {
        updateSnackBarMessage('video not uploaded');
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('video not uploaded');
      setSubmitting(false);
    }
  };

  const handleUploadVideoDetails = async (videoDetails: IVideoDetails): Promise<void> => {
    try {
      const { data } = await uploadVideoDetails(videoDetails);
      if (data?.success) {
        setUploadSuccess(true);
        handleGetAllVideos();
      } else {
        updateSnackBarMessage('video not uploaded');
        setSubmitting(false);
        setUploadSuccess(false);
      }
    } catch (err) {
      setUploadSuccess(false);
      setSubmitting(false);

      console.error(err);
      updateSnackBarMessage('video not uploaded');
    }
  };

  return (
    <Box style={{ minHeight: '90vh' }}>
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
        setSubmitting={setSubmitting}
        setUploadSuccess={setUploadSuccess}
      />
    </Box>
  );
}

/* eslint-disable prettier/prettier */
import { Container, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import UploadVideoForm from './UploadVideoForm/UploadVideoForm';
import { uploadVideoDetails, uploadVideoLocally } from '../../helpers/APICalls/uploadVideo';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useAllVideos } from '../../context/useAllVideosContext';

import { IVideoDetails } from '../../interface/VideoDetails';

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
  //  const [file, setFile] = useState(null);

  const [fileName, setFileName] = useState('Choose a file');
  const [uploadSuccess, setUploadSuccess] = useState<boolean | undefined>(undefined);
  const [uploadProgress, setUploadProgress] = useState<IState['numberValue']>(0);
  const [videoSource, setVideoSource] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoId, setVideoId] = useState<string>('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { handleGetAllVideos } = useAllVideos();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    const video_Id = uuidv4();
    let videoDetails: IVideoDetails | undefined = undefined;
    setVideoId(video_Id);
    if (loggedInUser) {
      videoDetails = {
        username: loggedInUser.username,
        userId: loggedInUser.id,
        videoTitle,
        videoSource,
        videoId: video_Id,
        videoDescription: '',
        videoTags: '',
        videoCategory: '',
      };
    }

    if (file) {
      const formData: any = new FormData();
      formData.append('file', file);
      try {
        await axios
          .post(`/upload_video/${videoId}`, formData, {
            headers: {
              'content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            },
          })
          .then(async (response) => {
            try {
              await uploadVideoDetails(videoDetails);
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err, 400);
      }
      // handleGetAllVideos()
    } else {
      try {
        console.log(videoDetails, 2001000);
        const response = await uploadVideoDetails(videoDetails);
        if (response) {
          setUploadSuccess(true);
          handleGetAllVideos();
        }
      } catch (err) {
        if (err) {
          setUploadSuccess(false);

          console.log(err, 400);
          setTimeout(() => {
            setUploadSuccess(undefined);
          }, 5000);
        }
      }
    }

    // handleUpdataData(user._id, user.userName, true);
    setSubmitting(false);
  };

  // const handleUploadVideoDetails = async (e) => {
  //   e.preventDefault();
  //   const videoDetails = {
  //     title,
  //     videoSource,
  //     videoId,
  //   };
  //   try {
  //     const response = axios.post(
  //       `/upload_video/video_details/${user.userName}/${user._id}`,
  //       videoDetails
  //     );

  //     if (file) {
  //       handleUploadVideoLocally(videoId);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   handleUpdataData(user._id, user.userName, true);
  // };

  // const handleUploadVideoLocally = async (videoId) => {
  //   const formData = new FormData();
  //   console.log(user);
  //   formData.append("file", file);
  //   try {
  //     const response = await axios.post(`/upload_video/${videoId}`, formData, {
  //       headers: {
  //         "content-Type": "multipart/form-data",
  //       },
  //       onUploadProgress: (progressEvent) => {
  //         setUploadProgress(
  //           parseInt(
  //             Math.round(progressEvent.loaded * 100) / progressEvent.total
  //           )
  //         );
  //       },
  //     });

  //     const { fileName, filePath } = response.data;
  //   } catch (err) {
  //     if (err.response.status === 500) {
  //       console.log("server-problem");
  //     } else {
  //       console.log(err.response.status, 5000);
  //     }
  //   }
  // };

  return (
    <Container style={{ backgroundColor: '#f0f0f0', minHeight: '90vh' }}>
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
      />
    </Container>
  );
}

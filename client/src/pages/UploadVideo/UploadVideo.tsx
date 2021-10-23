/* eslint-disable prettier/prettier */
import { Container, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import UploadVideoForm from './UploadVideoForm/UploadVideoForm';
import { uploadVideoDetails, uploadVideoLocally } from '../../helpers/APICalls/uploadVideo';
import axios from 'axios';

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
  const [fileName, setFileName] = useState('Choose a file');
  const [uploadProgress, setUploadProgress] = useState<IState['numberValue']>(0);
  const [videoSource, setVideoSource] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    const userDetails: { username: string; email: string; id: string } | any = loggedInUser;
    const videoDetails = {
      username: userDetails.username,
      userId: userDetails.id,
      videoTitle,
      videoSource,
      videoId,
    };

    if (file) {
    const formData:any = new FormData();
    formData.append("file", file);
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
    } else {
      try {
        const response = await uploadVideoDetails(videoDetails);
        console.log(response);
      } catch (err) {
        console.log(err, 400);
      }
    }

    // handleUpdataData(user._id, user.userName, true);
    setSubmitting(false);
  };

  // const handleUploadVideoDetails = async (e) => {
  //   e.preventDefault();
  //   const videoDetails = {
  //     videoTitle,
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
    <Container>
      <Typography variant="h3">Upload Videos</Typography>
      <UploadVideoForm
        handleSubmit={handleSubmit}
        videoSource={videoSource}
        setFile={setFile}
        setVideoId={setVideoId}
        setFileName={setFileName}
        setVideoSource={setVideoSource}
        setVideoTitle={setVideoTitle}
        isSubmitting={isSubmitting}
        uploadProgress={uploadProgress}
      />
    </Container>
  );
}

/* eslint-disable prettier/prettier */
import axios from 'axios';
import { useEffect } from 'react';
import { useUploadVideo } from '../../context/useUploadVideoContext';

interface Istate {
  videoDetails: { videoTitle: string; videoSource: string; videoId: string };
}

export const uploadVideoDetails = async (videoDetails: Istate['videoDetails']): Promise<any> => {
  try {
    return axios.post(`/upload_video/video_details`, videoDetails);
  } catch (err) {
    console.log(err);
  }
};

// Promise<AuthApiData>


export const uploadVideoLocally = async (formData: any, videoId: string): Promise<any> => {
//   try {
//     const response = await axios.post(`/upload_video/${videoId}`, formData, {
//       headers: {
//         'content-Type': 'multipart/form-data',
//       },
//       onUploadProgress: (progressEvent) => {
//         setUpLoadProgress = Math.round(progressEvent.loaded * 100) / progressEvent.total;
//       },
//     });

//     return response.data;
//   } catch (err) {
//     // if (err.response.status === 500) {
//     //   console.log('server-problem');
//     // } else {
//     //   console.log(err.response.status, 5000);
//     // }
//   }
};

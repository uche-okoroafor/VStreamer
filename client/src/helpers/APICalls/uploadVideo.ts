/* eslint-disable prettier/prettier */
import axios from 'axios';
import { useEffect } from 'react';
import { useUploadVideo } from '../../context/useUploadVideoContext';
import { IVideoDetails } from '../../interface/VideoDetails';

export const uploadVideoDetails = async (videoDetails: IVideoDetails): Promise<any> => {
  try {
    return axios.post(`/upload-video/video-details`, videoDetails);
  } catch (err) {
console.log(err,10101022)
    // if (err) {
    //   return err;
    // }
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

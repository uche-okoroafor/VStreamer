/* eslint-disable prettier/prettier */
import axios from 'axios';
import { IAllVideos } from '../../interface/VideoDetails';

export const getAllVideos = async (): Promise<IAllVideos | undefined > => {
  try {
    const response = await axios.post(`/get-videos/all-videos`);
    return response.data;
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

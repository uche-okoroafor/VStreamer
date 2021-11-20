/* eslint-disable prettier/prettier */
import axios from 'axios';
import { IAllVideos, IVideoDetails } from '../../interface/VideoDetails';

export const getAllVideos = async (): Promise<IAllVideos | undefined> => {
  try {
    const response = await axios.post(`/videos/all-videos`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// Promise<AuthApiData>

export const deleteVideo = async (video: IVideoDetails | undefined): Promise<any> => {
  // console.log(video);
  try {
    return await axios.post('/videos/delete-video',{ video});
  } catch (err) {
    console.log(err);
  }
};

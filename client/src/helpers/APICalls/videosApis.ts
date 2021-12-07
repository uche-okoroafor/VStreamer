import axios from 'axios';
import { IResponse } from '../../interface/ApiResponse';
import { IVideoDetails } from '../../interface/VideoDetails';

export const getAllVideos = async (): Promise<Array<IVideoDetails> | undefined> => {
  try {
    const response = await axios.post(`/videos/all-videos`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteVideo = async (videoId: string): Promise<IResponse> => {
  return await axios.post('/videos/delete-video', { videoId });
};

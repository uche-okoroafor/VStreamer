import axios from 'axios';
import { useEffect } from 'react';
import { IResponse } from '../../interface/ApiResponse';
import { IVideoDetails } from '../../interface/VideoDetails';

export const uploadVideoDetails = async (videoDetails: IVideoDetails): Promise<IResponse> => {
  return axios.post(`/video/video-details`, videoDetails);
};

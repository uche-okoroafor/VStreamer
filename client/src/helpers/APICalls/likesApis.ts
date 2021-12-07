import axios from 'axios';
import { IUpdateLikesResponse } from '../../interface/ApiResponse';

export const updateLikes = async (
  loggedInUsername: string,
  userId: string,
  videoId: string,
  userImage?: string,
): Promise<IUpdateLikesResponse> => {
  return await axios.post('/likes/add-like', { loggedInUsername, userId, videoId, userImage });
};

export const updateDislikes = async (
  loggedInUsername: string,
  userId: string,
  videoId: string,
): Promise<IUpdateLikesResponse> => {
  return await axios.post('/likes/add-dislike', { loggedInUsername, userId, videoId });
};

export const removeLikes = async (userId: string, videoId: string): Promise<IUpdateLikesResponse> => {
  return await axios.post('/likes/remove-like', { userId, videoId });
};

export const removeDislikes = async (userId: string, videoId: string): Promise<IUpdateLikesResponse> => {
  return await axios.post('/likes/remove-dislike', { userId, videoId });
};

import axios from 'axios';
import { IUpdateLikesResponse } from '../../interface/ApiResponse';

export const updateCommentLikes = async (
  loggedInUsername: string,
  userId: string,
  videoId: string,
  commentId?: string,
  userImage?: string,
): Promise<IUpdateLikesResponse> => {
  return await axios.post('/comment/add-like', { loggedInUsername, userId, videoId, userImage, commentId });
};

export const updateCommentDislikes = async (
  loggedInUsername: string,
  userId: string,
  videoId: string,
  commentId?: string,
): Promise<IUpdateLikesResponse> => {
  return await axios.post('/comment/add-dislike', { loggedInUsername, userId, videoId, commentId });
};

export const removeCommentLikes = async (
  userId: string,
  videoId: string,
  commentId?: string,
): Promise<IUpdateLikesResponse> => {
  return await axios.post('/comment/remove-like', { userId, videoId, commentId });
};

export const removeCommentDislikes = async (
  userId: string,
  videoId: string,
  commentId?: string,
): Promise<IUpdateLikesResponse> => {
  return await axios.post('/comment/remove-dislike', { userId, videoId, commentId });
};

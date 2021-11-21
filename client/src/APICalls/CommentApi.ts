import axios from 'axios';
import { ICommentResponse } from '../../interface/ApiResponse';

export const addComment = async (
  comment: string,
  userId: string,
  videoId: string,
  loggedInUsername?: string,
): Promise<ICommentResponse> => {
  console.log(comment, userId, videoId, loggedInUsername);
  return await axios.post('/comment/add-comment', { comment, userId, videoId, loggedInUsername });
};

export const editComment = async (
  comment: string,
  userId: string,
  videoId: string,
  commentId?: string | undefined,
): Promise<ICommentResponse> => {
  return await axios.post('/comment/edit-comment', { comment, userId, videoId, commentId });
};

export const deleteComment = async (
  userId: string,
  videoId: string,
  commentId?: string | undefined,
): Promise<ICommentResponse> => {
  return await axios.post('/comment/delete-comment', { userId, videoId, commentId });
};

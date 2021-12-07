import axios from 'axios';
import { IResponse } from '../../interface/ApiResponse';

interface IParams {
  userId: string;
  videoId: string;
  commentId?: string | undefined;
}

export const addComment = async (
  comment: string,
  userId: string,
  videoId: string,
  loggedInUsername?: string,
): Promise<IResponse> => {
  return await axios.post('/comment/add-comment', { comment, userId, videoId, loggedInUsername });
};

export const editComment = async (
  comment: string,
  userId: string,
  videoId: string,
  commentId?: string | undefined,
): Promise<IResponse> => {
  return await axios.post('/comment/edit-comment', { comment, userId, videoId, commentId });
};

export const deleteComment = async ({ userId, videoId, commentId }: IParams): Promise<IResponse> => {
  return await axios.post('/comment/delete-comment', { userId, videoId, commentId });
};

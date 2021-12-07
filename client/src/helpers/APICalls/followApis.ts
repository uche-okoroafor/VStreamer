import axios from 'axios';
import { IResponse } from '../../interface/ApiResponse';

export const follow = async (loggedInUsername?: string, userId?: string): Promise<IResponse> => {
  return await axios.post('/follow/add-follower', { loggedInUsername, userId });
};

export const unfollow = async (loggedInUsername?: string, userId?: string): Promise<IResponse> => {
  return await axios.post('/follow/remove-follower', { loggedInUsername, userId });
};

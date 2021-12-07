import axios from 'axios';
import { IResponse, IGetUserResponse } from '../../interface/ApiResponse';

export const getUserDetails = async (userId: string): Promise<IGetUserResponse> => {
  return await axios.get(`/users/get-details/${userId}`);
};

export const unfollow = async (loggedInUsername?: string, userId?: string): Promise<IResponse> => {
  return await axios.post('/user/remove-follower', { loggedInUsername, userId });
};

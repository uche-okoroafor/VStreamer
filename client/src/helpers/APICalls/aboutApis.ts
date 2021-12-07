import axios from 'axios';
import { IResponse } from '../../interface/ApiResponse';

export const updateAboutUser = async (aboutUser: string | undefined): Promise<IResponse> => {
  return await axios.post('/about/update-about', { aboutUser });
};

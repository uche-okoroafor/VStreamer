import axios from 'axios';
import { IViewerResponse } from '../../interface/ApiResponse';

export const addViewer = async (
  loggedInUsername: string | undefined,
  userId: string | undefined,
  videoId: string | undefined,
): Promise<IViewerResponse> => {
  return await axios.post('/views/add-viewer', { loggedInUsername, userId, videoId });
};

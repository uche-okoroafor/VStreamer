import axios from 'axios';
import { IImageResponse, IResponse } from '../../interface/ApiResponse';
import { IFile } from '../../interface/File';

export const uploadImage = async (image: any): Promise<IResponse> => {
  const formData = new FormData();
  formData.append('image', image);
  return axios.post('/image/upload-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const getImageKey = async (userId: string): Promise<IImageResponse> => {
  return axios.get(`/image/get-key/${userId}`);
};

export const deleteImage = async (): Promise<IResponse> => {
  return axios.delete('/image/delete-image');
};

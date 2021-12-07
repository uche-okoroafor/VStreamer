import { string } from 'yup/lib/locale';
import { IUserDetails } from './User';

export interface IUpdateLikesResponse {
  data?: { success: boolean };
  error?: { message: string };
}

export interface IResponse {
  data?: { success: boolean; error?: { message: string } };
  error?: { message: string };
}

export interface IViewerResponse {
  data?: { success: boolean; error?: { message: string } };
  error?: { message: string };
}

export interface IGetUserResponse {
  data?: IUserDetails;
  error?: { message: string };
}
export interface IImageResponse {
  data: { key: string | undefined; error?: { message: string } };
}

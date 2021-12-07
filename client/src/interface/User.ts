import { IViews, IVideoDetails } from './VideoDetails';

export interface User {
  id: string;
  email: string;
  username: string;
  userImage?: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

export interface IFollowers {
  _id: string;
  username: string;
  userId: string;
}

export interface IUserDetails {
  userId: string;
  username: string;
  userImage: string;
  aboutUser: string;
  email: string;
  followers: Array<IFollowers>;
  views: Array<IViews>;
  videos: Array<IVideoDetails>;
}

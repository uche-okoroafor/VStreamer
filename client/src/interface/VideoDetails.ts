import { string } from 'yup/lib/locale';

export interface IAllVideos {
  // filter(arg0: (video: IVideoDetails) => boolean);
  // [x: string]: any;
  filter: any;
  map(arg0: (video: IVideoDetails) => JSX.Element): import('react').ReactNode;
  [index: number]: IVideoDetails;
}

export interface IVideoDetails {
  videoTitle: string;
  videoSource: string;
  videoId: string;
  username: string;
  userId: string;
  videoDescription: string;
  videoTags: string;
  videoCategory: string;
  likes?: ILike[];
  dislikes?: ILike[];
  views?: IViews[];
}

export interface ILike {
  username: string;
  userId: string;
  likeId: string;
}

export interface IViews {
  username: string;
  userId: string;
  viewId: string;
}

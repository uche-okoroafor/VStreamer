/* eslint-disable prettier/prettier */
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
  //videoDescription:string;
  //videoTags:string;
  //videoCategory:string;
}

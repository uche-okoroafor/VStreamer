export interface IVideoDetails {
  thumbnail?: string;
  _id: string;
  videoTitle: string;
  videoSource: string;
  videoId: string;
  username: string;
  userImage?: string;
  userId: string;
  videoDescription: string;
  datePosted?: any;
  videoDuration: string;
  artist: string;
  videoCategory: string;
  likes?: ILike[];
  dislikes?: ILike[];
  views?: IViews[];
  comments?: Array<IComment>;
}

export interface ILike {
  username: string;
  userId: string;
  likeId: string;
  userImage?: string;
}

export interface IViews {
  username: string;
  userId: string;
  userImage?: string;
  viewId: string;
}

export interface IFollowers {
  username: string;
  userId: string;
  userImage?: string;
  followId?: string;
  _id?: string;
}
export interface IComment {
  username: string;
  userId: string;
  userImage?: string;
  commentId?: string;
  comment: string;
  commentDate: Date;
  _id?: string;
  likes?: Array<ILike>;
  dislikes?: Array<ILike>;
}

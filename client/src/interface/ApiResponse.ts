export interface IUpdateLikesResponse {
  data?: { success: boolean };
  error?: { message: string };
}

export interface ICommentResponse {
  data?: { success: boolean };
  error?: { message: string };
}

export interface IViewerResponse {
  data?: { success: boolean; error?: { message: string } };
  error?: { message: string };
}

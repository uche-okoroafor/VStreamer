/* eslint-disable prettier/prettier */
import axios from 'axios';

import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { getAllVideos } from '../helpers/APICalls/videosApis';
// import logoutAPI from '../helpers/APICalls/logout';
import { IAllVideos, IVideoDetails } from '../interface/VideoDetails';

interface IAllVideosContext {
  handleGetAllVideos: () => void;
  handleSetWatchVideo: (videoDetails: IAllVideosContext['watchVideo']) => void;
  allVideos: IAllVideos | undefined;
  watchVideo: IVideoDetails | undefined;
  // handleSetEditVideo: (videoDetails: IAllVideosContext['watchVideo']) => void;
  // editVideo: IVideoDetails | undefined;
  // setEditVideo: React.Dispatch<React.SetStateAction<IVideoDetails | undefined>>;
}

export const AllVideosContext = createContext<IAllVideosContext>({
  handleGetAllVideos: () => null,
  handleSetWatchVideo: () => null,
  // handleSetEditVideo: () => null,
  // editVideo: undefined,
  allVideos: undefined,
  watchVideo: undefined,
  // setEditVideo:undefined
});

export const AllVideosProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [allVideos, setAllVideos] = useState<IAllVideosContext['allVideos']>(undefined);
  const [watchVideo, setWatchVideo] = useState<IAllVideosContext['watchVideo']>(undefined);
  // const [editVideo, setEditVideo] = useState<IAllVideosContext['watchVideo']>(undefined);
  const handleGetAllVideos = async (): Promise<void> => {
    try {
      const response = await getAllVideos();
      if (response) {
        setAllVideos(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetWatchVideo = (videoDetails: IAllVideosContext['watchVideo']): void => {
    const watchedVideo = allVideos?.filter((video: IVideoDetails) => video.videoId === videoDetails?.videoId);
    setWatchVideo(watchedVideo[0]);
  };

  // const handleSetEditVideo = (videoDetails: IAllVideosContext['watchVideo']): void => {
  //   setEditVideo(videoDetails);
  //   console.log('here');
  // };

  useEffect(() => {
    handleGetAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AllVideosContext.Provider
      value={{
        allVideos,
        // editVideo,
        watchVideo,
        handleGetAllVideos,
        handleSetWatchVideo,
        // handleSetEditVideo,
        // setEditVideo,
      }}
    >
      {children}
    </AllVideosContext.Provider>
  );
};

export function useAllVideos(): IAllVideosContext {
  return useContext(AllVideosContext);
}

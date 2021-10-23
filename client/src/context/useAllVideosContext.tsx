/* eslint-disable prettier/prettier */
import axios from 'axios';

import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { getAllVideos } from '../helpers/APICalls/getVideos';
// import logoutAPI from '../helpers/APICalls/logout';
import { IAllVideos, IVideoDetails } from '../interface/VideoDetails';

interface IAllVideosContext {
  handleGetAllVideos: () => void;
  handleSetwatchVideo: (videoDetails: IAllVideosContext['watchVideo']) => void;
  allVideos: IAllVideos | undefined;
  watchVideo: IVideoDetails | undefined;
}

export const AllVideosContext = createContext<IAllVideosContext>({
  handleGetAllVideos: () => null,
  handleSetwatchVideo: () => null,
  allVideos: undefined,
  watchVideo: undefined,
});

export const AllVideosProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [allVideos, setAllVideos] = useState<IAllVideosContext['allVideos']>(undefined);
  const [watchVideo, setwatchVideo] = useState<IAllVideosContext['watchVideo']>(undefined);
  const handleGetAllVideos = async (): Promise<void> => {
    try {
      const response = await getAllVideos();
      setAllVideos(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSetwatchVideo = (videoDetails: IAllVideosContext['watchVideo']): void => {
    setwatchVideo(videoDetails);
    console.log(watchVideo,10000);
  };
  useEffect(() => {
    handleGetAllVideos();
  }, [allVideos]);

  return (
    <AllVideosContext.Provider value={{ allVideos, watchVideo, handleGetAllVideos, handleSetwatchVideo }}>
      {children}
    </AllVideosContext.Provider>
  );
};

export function useAllVideos(): IAllVideosContext {
  return useContext(AllVideosContext);
}

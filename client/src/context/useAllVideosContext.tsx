import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { getAllVideos } from '../helpers/APICalls/videosApis';
import { useSnackBar } from './useSnackbarContext';
import { IVideoDetails } from '../interface/VideoDetails';

interface IAllVideosContext {
  handleGetAllVideos: () => void;
  handleSetWatchVideo: (videoDetails: IAllVideosContext['watchVideo']) => void;
  allVideos: Array<IVideoDetails> | undefined;
  watchVideo: IVideoDetails | undefined;
}

export const AllVideosContext = createContext<IAllVideosContext>({
  handleGetAllVideos: () => null,
  handleSetWatchVideo: () => null,

  allVideos: undefined,
  watchVideo: undefined,
});

export const AllVideosProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [allVideos, setAllVideos] = useState<IAllVideosContext['allVideos']>(undefined);
  const [watchVideo, setWatchVideo] = useState<IAllVideosContext['watchVideo']>(undefined);
  const { updateSnackBarMessage } = useSnackBar();

  const handleGetAllVideos = async (): Promise<void> => {
    try {
      const response = await getAllVideos();
      if (response) {
        setAllVideos(response);
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('videos is not updated');
    }
  };

  const handleSetWatchVideo = (videoDetails: IAllVideosContext['watchVideo']): void => {
    if (allVideos) {
      const watchedVideo = allVideos.filter((video: IVideoDetails) => video._id === videoDetails?._id);
      setWatchVideo(watchedVideo[0]);
    }
  };

  useEffect(() => {
    handleGetAllVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AllVideosContext.Provider
      value={{
        allVideos,
        watchVideo,
        handleGetAllVideos,
        handleSetWatchVideo,
      }}
    >
      {children}
    </AllVideosContext.Provider>
  );
};

export function useAllVideos(): IAllVideosContext {
  return useContext(AllVideosContext);
}

/* eslint-disable prettier/prettier */
import axios from 'axios';
import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
// import logoutAPI from '../helpers/APICalls/logout';

interface IAllVideosContext {
  allVideos:
    | [
        {
          videoTitle: string;
          videoSource: string;
          _id: string;
        },
      ]
    | undefined;
  handleGetAllVideos: () => void;
}

export const AllVideosContext = createContext<IAllVideosContext>({
  handleGetAllVideos: () => null,
  allVideos: undefined,
});

export const AllVideosProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [allVideos, setAllVideos] = useState<IAllVideosContext['allVideos']>(undefined);

  const handleGetAllVideos = async (): Promise<void> => {
    console.log('working',2000);
    try {
      const response = await axios.post(`/get-videos/all-videos`);
      // setAllVideos(response.data);
console.log(response.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetAllVideos();
  }, []);

  return <AllVideosContext.Provider value={{ allVideos, handleGetAllVideos }}>{children}</AllVideosContext.Provider>;
};

export function useAllVideos(): IAllVideosContext {
  return useContext(AllVideosContext);
}

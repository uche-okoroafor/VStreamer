/* eslint-disable prettier/prettier */
import axios from 'axios';

import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
// import { getAllVideos } from '../helpers/APICalls/videosApis';
// import logoutAPI from '../helpers/APICalls/logout';
import { IVideoDetails, IAllVideos } from '../interface/VideoDetails';
import { useAllVideos } from './useAllVideosContext';
import { User } from '../interface/User';

interface IUserDetailsContext {
  handleUserVideos: (userId: string) => void;
  handleGetUser: (user: User) => void;
  userVideos: IAllVideos | undefined;
  userDetails: User | undefined;
}

export const UserDetailsContext = createContext<IUserDetailsContext>({
  handleUserVideos: () => null,
  handleGetUser: () => null,
  userVideos: undefined,
  userDetails: undefined,
});

export const UserDetailsProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { allVideos } = useAllVideos();
  const [userVideos, setUserVideos] = useState<IUserDetailsContext['userVideos']>(undefined);
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined);
  const handleGetUser = (user: User): void => {
    setUserDetails(user);
    handleUserVideos(user.id);
  };

  const handleUserVideos = (userId: string): void => {
    const allUserVideos = allVideos?.filter((video: IVideoDetails) => video.userId === userId);
    setUserVideos(allUserVideos);
    console.log('handleUserVideos', allUserVideos);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userVideos,
        userDetails,
        handleGetUser,
        handleUserVideos,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export function useUserDetails(): IUserDetailsContext {
  return useContext(UserDetailsContext);
}

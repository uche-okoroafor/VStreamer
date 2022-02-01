import { getUserDetails } from '../helpers/APICalls/userApis';
import { useState, useContext, createContext, FunctionComponent } from 'react';
import { IVideoDetails } from '../interface/VideoDetails';
import { IUserDetails, User } from '../interface/User';
import { useSnackBar } from './useSnackbarContext';

interface IUserDetailsContext {
  handleGetUserDetails: (user: User) => void;
  userVideos: Array<IVideoDetails> | undefined;
  userDetails: IUserDetails | undefined;
}

export const UserDetailsContext = createContext<IUserDetailsContext>({
  handleGetUserDetails: () => null,
  userVideos: undefined,
  userDetails: undefined,
});

export const UserDetailsProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [userVideos, setUserVideos] = useState<IUserDetailsContext['userVideos']>(undefined);
  const [userDetails, setUserDetails] = useState<IUserDetails | undefined>(undefined);
  const { updateSnackBarMessage } = useSnackBar();

  const handleGetUserDetails = async (user: User): Promise<void> => {
    try {
      const response = await getUserDetails(user.id);
      console.log(response?.data, 'response?.data');
      if (response?.data) {
        setUserVideos(response.data.videos);
        setUserDetails(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userVideos,
        userDetails,
        handleGetUserDetails,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export function useUserDetails(): IUserDetailsContext {
  return useContext(UserDetailsContext);
}

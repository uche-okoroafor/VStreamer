import { getUserDetails } from '../helpers/APICalls/userApis';
import { useState, useContext, createContext, FunctionComponent, useEffect } from 'react';
import { IVideoDetails } from '../interface/VideoDetails';
import { IUserDetails, User } from '../interface/User';
import { useSnackBar } from './useSnackbarContext';
import { useAuth } from './useAuthContext';

interface IUserDetailsContext {
  handleGetUserDetails: (user: User) => void;
  updateUserAvatar: (avatarId: string) => void;
  userVideos: Array<IVideoDetails> | undefined;
  userDetails: IUserDetails | undefined;
  userAvatar: undefined | string;
  isLoading: boolean;
}
// `/image/get-image/${loggedInUser.id}`
export const UserDetailsContext = createContext<IUserDetailsContext>({
  handleGetUserDetails: () => null,
  updateUserAvatar: () => null,
  userVideos: undefined,
  userDetails: undefined,
  userAvatar: undefined,
  isLoading: true,
});

export const UserDetailsProvider: FunctionComponent = ({ children }): JSX.Element => {
  const { loggedInUser } = useAuth();
  const [userVideos, setUserVideos] = useState<IUserDetailsContext['userVideos']>(undefined);
  const [userDetails, setUserDetails] = useState<IUserDetails | undefined>(undefined);
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setUserAvatar(`/image/get-image/${loggedInUser?.id}`);
  }, [loggedInUser]);

  const handleGetUserDetails = async (user: User): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await getUserDetails(user.id);
      if (response?.data) {
        setUserVideos(response.data.videos);
        setUserDetails(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };
  const updateUserAvatar = (avatarId: string) => {
    setUserAvatar(avatarId);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userVideos,
        userDetails,
        handleGetUserDetails,
        updateUserAvatar,
        userAvatar,
        isLoading,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};

export function useUserDetails(): IUserDetailsContext {
  return useContext(UserDetailsContext);
}

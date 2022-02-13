import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useAuth } from '../../../context/useAuthContext';
import { useUserDetails } from '../../../context/useUserContext';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { follow, unfollow } from '../../../helpers/APICalls/followApis';
import { useSnackBar } from '../../../context/useSnackbarContext';
interface Props {
  isUser: boolean;
}
export default function Follow({ isUser }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const { userDetails, handleGetUserDetails } = useUserDetails();
  const { handleGetAllVideos } = useAllVideos();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userFollowing, setUserFollowing] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    if (loggedInUser && userDetails) {
      const { followers } = userDetails;
      const filterFollower = followers.filter((user) => user.userId === loggedInUser.id);
      if (filterFollower.length) {
        setUserFollowing(true);
      } else {
        setUserFollowing(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleFollower = async (): Promise<void> => {
    setIsSubmitting(true);

    if (userDetails) {
      const loggedInUsername = loggedInUser?.username;
      const userId = userDetails?.userId;
      const username = userDetails?.username;

      if (userFollowing) {
        try {
          const { data } = await unfollow(loggedInUsername, userId);
          if (data?.success) {
            handleGetUserDetails({ username, id: userId, email: 'undefined' });
          } else {
            updateSnackBarMessage('something went wrong,please try again');
          }
        } catch (err) {
          console.error(err);
          updateSnackBarMessage('something went wrong,please try again');
        }
      } else {
        try {
          const { data } = await follow(loggedInUsername, userId);
          if (data?.success) {
            handleGetUserDetails({ username, id: userId, email: 'undefined' });
          } else {
            updateSnackBarMessage('something went wrong,please try again');
          }
        } catch (err) {
          console.error(err);
          updateSnackBarMessage('something went wrong,please try again');
        }
      }
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Box style={{ marginBottom: 30 }}>
        {!isUser && (
          <Button
            onClick={handleFollower}
            disabled={isSubmitting}
            style={{ color: 'white' }}
            color="success"
            variant="contained"
          >
            {userFollowing ? 'unfollow' : 'follow'}
          </Button>
        )}
      </Box>
    </>
  );
}

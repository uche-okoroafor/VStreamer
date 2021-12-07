import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../../context/useAuthContext';
import { useUserDetails } from '../../../context/useUserContext';
import { IVideoDetails } from '../../../interface/VideoDetails';
import { deleteVideo } from '../../../helpers/APICalls/videosApis';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { useSnackBar } from '../../../context/useSnackbarContext';
interface Props {
  renderedComponent: string;
  video: IVideoDetails;
}

export default function UpdateVideo({ renderedComponent, video }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const { userDetails } = useUserDetails();
  const [isUser, setIsUser] = useState(false);
  const { handleGetAllVideos } = useAllVideos();
  const [isDeleting, setDeleting] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();

  // const history = useHistory();

  useEffect(() => {
    if (loggedInUser && userDetails) {
      if (loggedInUser.username === userDetails.username && renderedComponent === 'Profile') {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  }, [loggedInUser, userDetails, renderedComponent]);

  const handleDeleteVideoDetails = async (): Promise<void> => {
    setDeleting(true);
    try {
      const { data } = await deleteVideo(video._id);
      if (data?.success) {
        handleGetAllVideos();
      } else {
        updateSnackBarMessage('video not deleted');
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('video not deleted');
    }
    setDeleting(false);
  };

  return (
    <>
      {isUser && (
        <Box display="flex" justifyContent="space-between" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Button
            startIcon={<DeleteIcon />}
            disabled={isDeleting}
            onClick={handleDeleteVideoDetails}
            variant="contained"
            color="warning"
          >
            {isDeleting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Delete'}
          </Button>
        </Box>
      )}
    </>
  );
}

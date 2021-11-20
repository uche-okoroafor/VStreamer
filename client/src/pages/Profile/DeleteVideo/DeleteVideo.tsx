import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../../../context/useAuthContext';
import { useUserDetails } from '../../../context/useUserContext';
import { useHistory } from 'react-router-dom';
import { IVideoDetails } from '../../../interface/VideoDetails';
import { deleteVideo } from '../../../helpers/APICalls/videosApis';
import { useAllVideos } from '../../../context/useAllVideosContext';
interface Props {
  renderedComponent: string;
  video: IVideoDetails;
}

export default function UpdateVideo({ renderedComponent, video }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const { userDetails, handleUserVideos } = useUserDetails();
  const [isUser, setIsUser] = useState(false);
  const { handleGetAllVideos } = useAllVideos();
  const [isDeleting, setDeleting] = useState(false);

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

  // const handleEditVideoDetails = (): void => {
  //   handleSetEditVideo(video);
  //   history.push('/edit-video');
  // };

  const handleDeleteVideoDetails = async (): Promise<void> => {
    setDeleting(true);
    try {
      const response = await deleteVideo(video);
      console.log(response.data);
      if (response.data.nModified === 1) {
        try {
          await handleGetAllVideos();
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
    setDeleting(false);
  };

  return (
    <>
      {isUser && (
        <Box display="flex" justifyContent="space-between" sx={{ position: 'absolute', bottom: 0, right: 0 }}>
          {/* <Button sx={{ marginRight: 1 }} onClick={handleEditVideoDetails} startIcon={<EditIcon />} variant="outlined">
            Edit
          </Button> */}
          <Button
            startIcon={<DeleteIcon />}
            disabled={isDeleting}
            onClick={handleDeleteVideoDetails}
            variant="outlined"
          >
            {isDeleting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Delete'}
          </Button>
        </Box>
      )}
    </>
  );
}

import { Grid, Box } from '@mui/material';
import { ILike, IViews } from '../../../interface/VideoDetails';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import useStyles from '../useStyles';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { addViewer } from '../../../helpers/APICalls/viewsApi';
import { useSnackBar } from '../../../context/useSnackbarContext';

export default function Viewers(): JSX.Element {
  const classes = useStyles();
  const { watchVideo, handleGetAllVideos, handleSetWatchVideo, allVideos } = useAllVideos();
  const { loggedInUser } = useAuth();
  const [viewedVideo, setViewedVideo] = useState<string | undefined>(undefined);
  const { updateSnackBarMessage } = useSnackBar();
  const [viewers, setViewers] = useState<Array<IViews>>([]);

  const handleAddViewer = async (): Promise<void> => {
    if (loggedInUser) {
      try {
        const { data } = await addViewer(loggedInUser?.username, watchVideo?.userId, watchVideo?.videoId);
        if (data?.success) {
          handleGetAllVideos();
        }
      } catch (err) {
        console.error(err);
        updateSnackBarMessage('viwer not added');
      }
    }
    setViewedVideo(watchVideo?.videoId);
  };

  const checkUser = (): boolean => {
    const filterUser = viewers.filter((user) => user.userId === loggedInUser?.id);

    if (filterUser.length) {
      console.log(filterUser);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (allVideos) {
      handleSetWatchVideo(watchVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allVideos]);

  useEffect(() => {
    if (watchVideo?.views) {
      setViewers(watchVideo.views);
    }
    console.log('here 1', checkUser(), watchVideo?.views);

    if (viewedVideo !== watchVideo?.videoId && !checkUser()) {
      handleAddViewer();
      console.log('here 2');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchVideo]);

  return (
    <>
      <Box style={{ minHeight: '100px', paddingTop: '20px' }}>
        <Box>
          <RemoveRedEyeIcon />
          {viewers.length}
        </Box>
      </Box>
    </>
  );
}

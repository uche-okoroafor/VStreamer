import { Stack, Typography } from '@mui/material';
import { IViews } from '../../../interface/VideoDetails';
import { useAllVideos } from '../../../context/useAllVideosContext';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../../context/useAuthContext';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { addViewer } from '../../../helpers/APICalls/viewsApi';
import { useSnackBar } from '../../../context/useSnackbarContext';
import CommittedUsers from '../../../components/CommittedUsers/CommittedUsers';
import useStyles from '../useStyles';

export default function Viewers(): JSX.Element {
  const { watchVideo, handleGetAllVideos, handleSetWatchVideo, allVideos } = useAllVideos();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const [viewers, setViewers] = useState<Array<IViews>>([]);

  const classes = useStyles();
  const handleAddViewer = async (): Promise<void> => {
    if (loggedInUser) {
      try {
        const { data } = await addViewer(loggedInUser?.username, watchVideo?.userId, watchVideo?._id);
        if (data?.success) {
          handleGetAllVideos();
        } else {
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const checkUser = (): boolean => {
    if (watchVideo?.views?.length) {
      const filterUser = watchVideo.views.filter((user) => user.userId === loggedInUser?.id);
      if (filterUser.length) {
        return true;
      }
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
    if (!checkUser()) {
      handleAddViewer();
    }

    if (watchVideo?.views?.length) {
      setViewers(watchVideo.views);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchVideo]);

  const handleListPosition = () => {
    return '1.7rem';
  };
  return (
    <>
      <Stack direction="row" spacing={1} className={classes.viewsContainer}>
        <Typography>{viewers.length}</Typography>
        <RemoveRedEyeIcon />
        <Typography sx={{ fontWeight: '900' }}>views</Typography>
        <CommittedUsers listPosition={handleListPosition()} usersList={viewers} classStyle={classes.list} />
      </Stack>
    </>
  );
}

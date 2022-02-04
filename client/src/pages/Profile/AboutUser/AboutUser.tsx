import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, TextareaAutosize, Typography, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useUserDetails } from '../../../context/useUserContext';
import { updateAboutUser } from '../../../helpers/APICalls/aboutApis';
import IconButton from '@mui/material/IconButton';
import { useSnackBar } from '../../../context/useSnackbarContext';
import useStyles from '../useStyles';

interface Props {
  isUser: boolean;
}

export default function AboutUser({ isUser }: Props): JSX.Element {
  const { userDetails, handleGetUserDetails } = useUserDetails();
  const classes = useStyles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aboutUser, setAboutUser] = useState(userDetails?.aboutUser);
  const [edit, setEdit] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();

  useEffect(() => {
    if (userDetails) {
      setAboutUser(userDetails?.aboutUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails]);

  const handleSetAboutUser = async (): Promise<void> => {
    if (aboutUser === userDetails?.aboutUser) {
      return setEdit(false);
    }
    setIsSubmitting(true);

    if (userDetails) {
      const userId = userDetails?.userId;
      const username = userDetails?.username;
      try {
        const { data } = await updateAboutUser(aboutUser);
        if (data?.success) {
          await handleGetUserDetails({ username, id: userId, email: 'undefined' });
        } else {
          updateSnackBarMessage('something went wrong,please try again');
        }

        setEdit(false);
      } catch (err) {
        console.error(err);
        updateSnackBarMessage('something went wrong,please try again');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Box
        className={classes.bottomSpace}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        style={{ width: '100%' }}
      >
        <Typography style={{ margin: '5px' }} variant="h6">
          About
        </Typography>
        <Box style={{ width: '90%', position: 'relative' }}>
          {!edit && isUser && (
            <IconButton
              sx={{ position: 'absolute', top: '-13%', right: '0%' }}
              aria-label="update"
              color="primary"
              onClick={() => setEdit(true)}
            >
              <EditIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
          {!edit ? (
            <Box
              style={{
                width: '100%',
                minHeight: 150,
                borderRadius: '5px',
                padding: ' 10px',
                overflowWrap: 'break-word',
              }}
            >
              {aboutUser ? (
                <Typography align="center" fontStyle="italic">
                  {aboutUser}
                </Typography>
              ) : (
                isUser && (
                  <Typography align="center" style={{ color: '#EEEEEE' }} variant="subtitle1">
                    write something about yourself
                  </Typography>
                )
              )}
            </Box>
          ) : (
            <Box style={{ width: '100%' }}>
              <TextareaAutosize
                aria-label="minimum height"
                onChange={(e) => setAboutUser(e.target.value.slice(0, 100))}
                value={aboutUser}
                minRows={4}
                style={{ width: '100%', borderRadius: '5px', resize: 'none' }}
              />
              <Stack direction="row" justifyContent="center" spacing={2} sx={{ padding: '15px 10px' }}>
                <Button
                  disabled={isSubmitting}
                  style={{ width: '87px' }}
                  onClick={handleSetAboutUser}
                  variant="contained"
                >
                  {isSubmitting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'save'}
                </Button>
                <Button
                  onClick={() => {
                    setEdit(false);
                    setAboutUser(userDetails?.aboutUser);
                  }}
                  color="primary"
                  variant="contained"
                >
                  cancel
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

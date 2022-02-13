import { Box, Button, Paper, CircularProgress } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import useStyles from '../useStyles';
import { useState } from 'react';
import { stringAvatar } from '../useStyles';
import { IUserDetails } from '../../../interface/User';
import { uploadImage, deleteImage } from '../../../helpers/APICalls/imageApis';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { IFile } from '../../../interface/File';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSnackBar } from '../../../context/useSnackbarContext';
import { useUserDetails } from '../../../context/useUserContext';
interface Props {
  user: IUserDetails;
  isUser: boolean;
}

export default function ProfilePhoto({ user, isUser }: Props): JSX.Element {
  const classes = useStyles();
  const { userDetails, handleGetUserDetails, updateUserAvatar } = useUserDetails();
  const [image, setImage] = useState<IFile | null>(null);
  const [file, setFiles] = useState<string | undefined>(undefined);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const { updateSnackBarMessage } = useSnackBar();
  const [isSaving, setIsSaving] = useState(false);

  const onDrop = useCallback(
    (acceptedFile) => {
      setImage(acceptedFile[0]);
      setFiles(URL.createObjectURL(acceptedFile[0]));
    },
    [setImage],
  );
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpeg, image/png',
  });

  const handleUserImage = (): string => {
    if (file === undefined) {
      if (user.userImage) {
        return `/image/download-image/${user.userImage}`;
      } else {
        return '';
      }
    } else {
      return file;
    }
  };

  const handleSaveImage = async (): Promise<void> => {
    setUploadStatus(true);
    setIsSaving(true);
    try {
      const { data } = await uploadImage(image);
      if (data) {
        if (data.success) {
          handleGetUserDetails({ username: user.username, id: user.userId, email: 'undefined' });

          setFiles(undefined);
          setOpenUpdateForm(false);
          if (file) {
            updateUserAvatar(file);
          }
        } else if (data?.error) {
          updateSnackBarMessage(data?.error?.message);
        }
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('Unexpected error! Please try again');
    }
    setUploadStatus(false);
    setIsSaving(false);
  };
  const handleDeleteImage = async (): Promise<void> => {
    setUploadStatus(true);
    setFiles(undefined);
    setIsSaving(true);

    try {
      const { data } = await deleteImage();
      if (data) {
        if (data.success) {
          handleGetUserDetails({ username: user.username, id: user.userId, email: 'undefined' });

          setFiles(undefined);
          setOpenUpdateForm(false);
        } else if (data?.error) {
          updateSnackBarMessage(data?.error?.message);
        }
      }
    } catch (err) {
      console.error(err);
      updateSnackBarMessage('Unexpected error! Please try again');
    }
    setUploadStatus(false);
    setIsSaving(false);
  };

  return (
    <>
      {openUpdateForm && (
        <Box
          onClick={() => setOpenUpdateForm(false)}
          sx={{ position: 'fixed', width: '100%', height: '100vh', left: 0, top: 0 }}
        ></Box>
      )}
      <Box className={classes.bottomSpace} sx={{ position: 'relative' }}>
        <Avatar
          {...stringAvatar(user.username ? user.username.toUpperCase() : 'V', 100, 100)}
          src={handleUserImage()}
        />
        {!openUpdateForm ? (
          isUser && (
            <IconButton
              sx={{
                position: 'absolute',
                right: '10%',
                top: '80%',
                background: 'green',
                '&:hover': {
                  background: 'green',
                },
              }}
              aria-label="update"
              onClick={() => setOpenUpdateForm(true)}
            >
              <DriveFolderUploadIcon sx={{ color: 'white' }} />
            </IconButton>
          )
        ) : (
          <Paper
            sx={{
              position: 'absolute',
              whiteSpace: 'nowrap',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              margin: '0 auto',
            }}
          >
            {file === undefined ? (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragReject ? (
                  <Box>Drop </Box>
                ) : (
                  <Button sx={{ marginBottom: '10px' }} startIcon={<AddAPhotoIcon />} variant="contained" color="info">
                    browse
                  </Button>
                )}
              </div>
            ) : (
              <Button
                sx={{ marginBottom: '10px' }}
                startIcon={<SaveIcon />}
                variant="contained"
                color="success"
                type="submit"
                onClick={handleSaveImage}
              >
                {isSaving ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Save'}
              </Button>
            )}
            <Button
              onClick={handleDeleteImage}
              startIcon={<DeleteIcon />}
              style={{ background: '#E00000' }}
              variant="contained"
              color="warning"
            >
              Delete
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}

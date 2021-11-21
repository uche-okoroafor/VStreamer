import { Typography, Grid, Box, Button, Paper } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import useStyles from '../useStyles';
import { useState } from 'react';
import { stringAvatar } from '../useStyles';
import { User } from '../../../interface/User';
import Icon from '@material-ui/core/Icon/Icon';
import { uploadImage } from '../../../helpers/APICalls/imageApis';
import { IFile } from '../../../interface/File';
import UpdateIcon from '@mui/icons-material/Update';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  user: User;
}

export default function ProflePhoto({ user }: Props): JSX.Element {
  const classes = useStyles();
  // const { loggedInUser } = useAuth();
  const [image, setImage] = useState<IFile | null>(null);
  const [files, setFiles] = useState<string | undefined>(undefined);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('uploading...');
  const onDrop = useCallback(
    (acceptedFile) => {
      // onSetFile(acceptedFile[0]);
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

  const handleSaveImage = async (): Promise<void> => {
    console.log('no problem');
    // if (uploadStatus === 'uploading...') {
    //   return;
    // }
    // setUploadStatus('uploading...');
    try {
      const response = await uploadImage(image);
      // .then((data) => {
      //         if (data.error) {
      //           // updateSnackBarMessage(data.error.message);
      //           // setUploadState('picture upload failed!');
      //           // onSetFile(null);
      //           // setOpen(false);
      //           // setTimeout(() => {
      //           //   setUploadState('');
      //           // }, 3000);
      //         } else if (data.success) {
      //           // updateLoginContext(data.success);
      //           // setUploadState('picture uploaded successfully');
      //           // onSetFile(null);
      //           // setOpen(false);
      //           // setTimeout(() => {
      //           //   setUploadState('');
      //           // }, 3000);
      //         } else {
      //           // updateSnackBarMessage('Unexpected error! Please try again');
      //         }
      //       });

      console.log(response, 101010);
    } catch (err) {
      return console.log(err);
    }
    setUploadStatus('');
  };

  return (
    <>
      {openUpdateForm && (
        <Box
          onClick={() => setOpenUpdateForm(false)}
          sx={{ position: 'fixed', width: '100%', height: '100vh', left: 0, top: 0 }}
        ></Box>
      )}
      <Box sx={{ position: 'relative', marginBottom: '20px' }}>
        <Avatar {...stringAvatar(user.username.toUpperCase(), 100, 100)} src={files} />
        {!openUpdateForm ? (
          <IconButton
            sx={{ position: 'absolute', right: '10%', top: '80%' }}
            aria-label="update"
            color="secondary"
            onClick={() => setOpenUpdateForm(true)}
          >
            <UpdateIcon sx={{ color: 'white' }} />
          </IconButton>
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

            <Button
              sx={{ marginBottom: '10px' }}
              startIcon={<SaveIcon />}
              variant="contained"
              color="success"
              type="submit"
              onClick={handleSaveImage}
            >
              Save Image
            </Button>
            <Button startIcon={<DeleteIcon />} variant="contained" color="secondary">
              Delete
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
}

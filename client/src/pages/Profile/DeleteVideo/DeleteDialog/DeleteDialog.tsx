import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, CircularProgress } from '@mui/material';

interface Props {
  handleDeleteVideoDetails: () => Promise<void>;
  open: boolean;
  isDeleting: boolean;
  videoTitle: string;
  setOpen: React.Dispatch<boolean>;
}

export default function DeleteDialog({ handleDeleteVideoDetails, open, setOpen, isDeleting, videoTitle }: Props) {
  const handleClose = () => {
    setOpen(false);
  };
  const capitalizeFirstLetter = (title: string) => {
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete the video
            <Typography align="center" variant="h6" style={{ fontWeight: 'bold' }}>
              &quot;{capitalizeFirstLetter(videoTitle)}&quot;
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleDeleteVideoDetails} autoFocus>
            {isDeleting ? <CircularProgress style={{ fontSize: 0, width: '20px', height: '20px' }} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyles from './useStyles';
import Image from '../../../../Images/upload.png';
import { IFile } from '../../../../interface/File';
import { Paper, Typography, Grid } from '@mui/material';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';

interface Props {
  handleChange: (name: string, value: string | undefined, file: any | IFile[] | null) => void;
}

const DropZone = ({ handleChange }: Props): JSX.Element => {
  const onDrop = useCallback(
    (acceptedFile) => {
      handleChange('videoFile', undefined, acceptedFile[0]);
    },
    [handleChange],
  );

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'video/mp4, video/ogg',
  });
  const classes = useStyles();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    handleChange(name, value, null);
  };

  return (
    <Paper
      sx={{
        width: { xs: 300, sm: 400, md: 500 },
        height: { xs: '17rem', sm: '22rem', md: '22rem' },
      }}
      className={classes.dropBoxContainer}
    >
      <Box className={classes.dropBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <Grid
          className={isDragAccept ? classes.imageBoxAccept : isDragReject ? classes.imageBoxReject : classes.imageBox}
          sx={{ height: { xs: '12rem', sm: '16rem', md: '16rem', display: 'flex', flexDirection: 'column' } }}
        >
          <img loading="lazy" className={classes.uploadImage} src={Image} alt="" />
          {isDragReject ? (
            <Typography>Sorry, This app only supports Videos or MP4 files</Typography>
          ) : (
            <Box className={classes.typographyBox}>
              <Typography className={classes.typography}>
                drop your Video, <span className={classes.typographySpan}>browse</span>
              </Typography>
              <Typography className={classes.typography}>Only ogg or MP4 files supported</Typography>
            </Box>
          )}
        </Grid>
      </Box>
      <TextField
        style={{ width: '80%' }}
        name="videoSource"
        label="You can paste the video url here"
        onChange={handleInputChange}
        variant="filled"
      />
    </Paper>
  );
};

export default DropZone;

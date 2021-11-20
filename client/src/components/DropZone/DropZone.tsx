import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useStyles from './useStyles';
import { Box, TextField, Paper, Typography } from '@material-ui/core';
import Image from '../../Images/upload.png';
import { IFile } from '../../interface/File';

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
    <Paper className={classes.dropBoxContainer}>
      <Box className={classes.dropBox} {...getRootProps()}>
        <input {...getInputProps()} />
        <Box
          className={isDragAccept ? classes.imageBoxAccept : isDragReject ? classes.imageBoxReject : classes.imageBox}
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
        </Box>
      </Box>
      <TextField
        style={{ width: '80%' }}
        name="videoSource"
        label="You can paste the video url here"
        onChange={handleInputChange}
      />
    </Paper>
  );
};

export default DropZone;

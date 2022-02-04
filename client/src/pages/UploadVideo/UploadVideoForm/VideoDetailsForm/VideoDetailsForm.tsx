/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo } from 'react';
import { Container, Paper, TextField, MenuItem, Button, CircularProgress, styled } from '@material-ui/core';
import { Box, Typography } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { width } from '@mui/system';
import { Category } from '@material-ui/icons';
import { getJSDocReturnTag } from 'typescript';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  uploadProgress: number | null | undefined;
  setVideoTitle: React.Dispatch<string>;
  setArtist: React.Dispatch<string>;
  setDescription: React.Dispatch<string>;
  setCategory: React.Dispatch<string>;
  videoTitle: string;
  category: string;
  uploadSuccess: boolean | undefined;
}

export default function VideoDetailsForm({
  handleSubmit,
  setCategory,
  setArtist,
  setDescription,
  videoTitle,
  setVideoTitle,
  isSubmitting,
  uploadProgress,
  uploadSuccess,
  category,
}: Props): JSX.Element {
  const [uploadStatusProps, setUploadStatusProps] = useState({
    backgroundColor: '#1976D2',
    state: <Typography>Upload Video</Typography>,
  });

  useMemo(() => {
    if (isSubmitting) {
      if (uploadSuccess) {
        return setUploadStatusProps({ state: <Typography>Upload Successful</Typography>, backgroundColor: '#3aeb34' });
      } else {
        return setUploadStatusProps({
          state: <CircularProgress style={{ color: 'white' }} />,
          backgroundColor: '#1976D2',
        });
      }
    } else {
      if (uploadSuccess === undefined) {
        return setUploadStatusProps({ state: <Typography>Upload Video</Typography>, backgroundColor: '#1976D2' });
      } else {
        return (
          !uploadSuccess &&
          setUploadStatusProps({ state: <Typography>Upload Failed</Typography>, backgroundColor: '#eb4034' })
        );
      }
    }
  }, [isSubmitting, uploadSuccess]);

  const categories = [
    {
      value: 'Music Video',
      label: 'Music Video',
    },
    {
      value: 'Music Audio',
      label: 'Music Audio',
    },
    {
      value: 'Movie',
      label: 'Movie',
    },
    {
      value: 'Skit',
      label: 'Skit',
    },
  ];

  return (
    <>
      {' '}
      <Box sx={{ padding: '2rem', width: { xs: '95%', sm: '80%', md: '80%', lg: '80%' }, margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Box style={{ margin: '20px 0' }}>
            <TextField
              id="outlined-basic"
              onChange={(e) => setVideoTitle(e.target.value)}
              label="Title"
              fullWidth
              name="title"
              margin="normal"
              value={videoTitle}
              variant="filled"
              size="small"
              required
            />
          </Box>
          <Box style={{ margin: '20px 0' }}>
            <TextField
              id="outlined-select-currency"
              size="small"
              fullWidth
              variant="filled"
              select
              label="Select video Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>{' '}
          </Box>

          <Box style={{ margin: '20px 0' }}>
            <TextField
              size="small"
              id="outlined-basic"
              onChange={(e) => setArtist(e.target.value)}
              label="Artist"
              fullWidth
              name="Artist"
              variant="filled"
              required
            />
          </Box>

          <Box style={{ margin: '20px 0' }}>
            <TextField
              size="small"
              id="outlined-basic"
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              fullWidth
              name="description"
              variant="filled"
              required
            />
          </Box>
          <Box textAlign="center">
            <Button
              type="submit"
              size="large"
              variant="contained"
              style={{ background: uploadStatusProps.backgroundColor, color: 'white' }}
            >
              {uploadStatusProps.state}
              {isSubmitting && <span> &nbsp; &nbsp; {`${uploadProgress}%`}</span>}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}

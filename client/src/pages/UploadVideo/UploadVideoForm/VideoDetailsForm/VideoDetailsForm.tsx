/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Container, Paper, TextField, MenuItem, Button, CircularProgress, styled } from '@material-ui/core';
import { Box } from '@mui/material';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { width } from '@mui/system';
import { Category } from '@material-ui/icons';

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
  const [buttonColor, setButtonColor] = useState<string | undefined>('primary');
  useEffect(() => {
    if (uploadSuccess === undefined) {
      return setButtonColor('primary');
    } else {
      uploadSuccess ? setButtonColor('primary') : setButtonColor('secondary');
    }
  }, [uploadSuccess]);

  const categories = [
    {
      value: 'Music Video',
      label: 'Music Video',
    },
    {
      value: 'Music Aduio',
      label: 'Music Aduio',
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
    <Box sx={{ padding: '2rem', width: { xs: '95%', sm: '80%', md: '80%', lg: '80%' }, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <Box style={{ margin: '20px 0' }}>
          <TextField
            id="outlined-basic"
            onChange={(e) => setVideoTitle(e.target.value)}
            label="Title"
            fullWidth
            name="title"
            value={videoTitle}
            variant="outlined"
            size="small"
            required
          />
        </Box>
        <Box style={{ margin: '20px 0' }}>
          <TextField
            id="outlined-select-currency"
            size="small"
            fullWidth
            variant="outlined"
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
            variant="outlined"
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
            variant="outlined"
            required
          />
        </Box>
        <Box textAlign="center">
          <Button type="submit" size="large" variant="contained" color="primary">
            {isSubmitting ? (
              uploadSuccess ? (
                'Upload Successful'
              ) : (
                <CircularProgress style={{ color: 'white' }} />
              )
            ) : uploadSuccess === undefined ? (
              'Upload Video'
            ) : (
              !uploadSuccess && 'Upload Failed'
            )}
            {isSubmitting && `${uploadProgress}%`}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

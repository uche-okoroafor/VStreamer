/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Container, Paper, TextField, MenuItem, Button, Box, CircularProgress, styled } from '@material-ui/core';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import { width } from '@mui/system';
import { Category } from '@material-ui/icons';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  uploadProgress: number | null | undefined;
  setVideoTitle: React.Dispatch<React.SetStateAction<string>>;
  videoTitle: string;
  uploadSuccess: boolean | undefined;
}

export default function VideoDetailsForm({
  handleSubmit,
  //   setFile,
  //   setFileName,
  //   videoSource,
  //   setVideoSource,
  videoTitle,
  setVideoTitle,
  isSubmitting,
  uploadProgress,
  uploadSuccess,
}: Props): JSX.Element {
  const [category, setCategory] = useState('');
  console.log(uploadSuccess);
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
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('rhrjjrj');
  };

  return (
    <Box style={{ padding: '2rem', width: '80%', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} noValidate>
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
          />
        </Box>

        <Box style={{ margin: '20px 0' }}>
          <TextField
            size="small"
            id="outlined-basic"
            onChange={handleChange}
            label="Category"
            fullWidth
            name="category"
            variant="outlined"
          />
        </Box>
        <Box style={{ margin: '20px 0' }}>
          <TextField
            id="outlined-basic"
            size="small"
            onChange={handleChange}
            label="Tag"
            fullWidth
            name="tag"
            variant="outlined"
          />
        </Box>
        <TextField
          id="outlined-select-currency"
          size="small"
          fullWidth
          variant="outlined"
          select
          label="Select video Category"
          value={category}
          onChange={handleChange}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Box style={{ margin: '20px 0' }}>
          <TextField
            size="small"
            id="outlined-basic"
            onChange={handleChange}
            label="Description"
            fullWidth
            name="description"
            variant="outlined"
          />
        </Box>
        <Box textAlign="center">
          <Button type="submit" size="large" variant="contained" color="primary">
            {isSubmitting ? (
              <CircularProgress style={{ color: 'white' }} />
            ) : uploadSuccess === undefined ? (
              'Upload Video'
            ) : uploadSuccess ? (
              'Upload Successful'
            ) : (
              'Upload Failed'
            )}
            {isSubmitting && `${uploadProgress}%`}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

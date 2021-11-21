import axios from 'axios';
import { IFile } from '../../interface/File';

export const uploadImage = async (image: any): Promise<any> => {
  // try {
  const formData = new FormData();
  formData.append('image', image);

  // const formData = new FormData();
  // formData.append('image', image);
  // formData.append('description', description);
  // return console.log(formData, 2113223);
  //   const result = await axios.post('/images/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  //   // return result.data;
  // } catch (err) {
  console.log(formData);
  // }

  return await fetch(`/images/upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'File upload failed. Please try again.' },
    }));
};

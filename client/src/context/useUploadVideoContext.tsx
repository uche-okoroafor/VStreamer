/* eslint-disable prettier/prettier */
import axios from 'axios';
import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';

interface IVideosContext {
  handleUploadProgress: (progress: number) => void;
  uploadProgress: number | undefined;
}

export const UploadVideoContext = createContext<IVideosContext>({
  handleUploadProgress: () => null,
  uploadProgress: undefined,
});

export const UploadVideoProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [uploadProgress, setUploadProgress] = useState<IVideosContext['uploadProgress']>(undefined);

  const handleUploadProgress = useCallback(
    (progress: number) => {
      setUploadProgress(progress);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uploadProgress],
  );

  return <UploadVideoContext.Provider value={{ handleUploadProgress, uploadProgress }}>{children}</UploadVideoContext.Provider>;
};

export function useUploadVideo(): IVideosContext {
  return useContext(UploadVideoContext);
}

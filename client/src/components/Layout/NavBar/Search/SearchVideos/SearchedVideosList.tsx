import { useEffect, useState } from 'react';
import { useAllVideos } from '../../../../../context/useAllVideosContext';
import { useHistory } from 'react-router-dom';
import { List, Typography, ListItem, ListItemText } from '@material-ui/core';
import { IVideoDetails } from '../../../../../interface/VideoDetails';
interface IProps {
  searchedVideo: string;
  toggleDrawer: (
    open: boolean,
    height: string,
    zIndex: number,
    event: React.KeyboardEvent | React.MouseEvent | null,
  ) => void;
  setSearchedVideo: React.Dispatch<React.SetStateAction<string>>;
}

function SearchedVideosList({ searchedVideo, setSearchedVideo, toggleDrawer }: IProps): JSX.Element {
  const { allVideos, handleSetWatchVideo } = useAllVideos();
  const [searchResult, setSearchResult] = useState<Array<IVideoDetails>>([]);
  const history = useHistory();

  useEffect(() => {
    if (searchedVideo) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedVideo]);

  function handleSearch(): void {
    if (allVideos) {
      const filteredSearchedVideo = allVideos.filter((video) => {
        const trimmedSearchValue = searchedVideo.replace(/\s+/g, '').toLowerCase();
        return video.videoTitle.toLowerCase().includes(trimmedSearchValue);
      });
      setSearchResult(filteredSearchedVideo);
    }
  }

  function handleClickedSearchResult(video: IVideoDetails) {
    handleSetWatchVideo(video);
    toggleDrawer(false, '0', 0, null);
    setSearchedVideo('');
    history.push('/watch/' + video.videoTitle);
  }

  return (
    <List>
      {searchResult.length ? (
        searchResult.map((video: IVideoDetails) => (
          <ListItem button key={video.videoId} onClick={() => handleClickedSearchResult(video)}>
            <ListItemText primary={video.videoTitle} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <Typography variant="h6" align="center">
            Search not found
          </Typography>{' '}
        </ListItem>
      )}
    </List>
  );
}

export default SearchedVideosList;

import React, { useContext, useState } from "react";
import { StateContext } from "../Context/StateContext";
import { useHistory } from "react-router-dom";

function SearchVideos() {
  const { allVideos, handleViewedVideo } = useContext(StateContext);
  const [searchedVideo, SetSearchedVideo] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [displaySearchResult, setDisplaySearchResult] = useState("none");
  const history = useHistory();



  function handleInputChange(e) {
    const { value } = e.target;
    SetSearchedVideo(value);
    handleSumitSearch();
  }

  function handleSumitSearch(e) {
    let filteredSearchedVideo = allVideos.filter((video) => {
      const trimmedSearchValue = searchedVideo
        .replace(/\s+/g, "")
        .toLowerCase();
      return video.videoTitle.toLowerCase().includes(trimmedSearchValue);
    });
    setSearchResult(filteredSearchedVideo);
    setDisplaySearchResult("block");
    // e.preventDefault();
  }

  function handleCloseSearchResult() {
    setDisplaySearchResult("none");
    SetSearchedVideo("");
  }

  function handleWatchVideo(videoId, videoTitle) {
    handleViewedVideo(videoId);
    handleCloseSearchResult();
    history.push("/watch/" + videoTitle);
  }

  return (
    <React.Fragment>
      <form>
        <div className="search-container">
          <input
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="Search for Videos"
            value={searchedVideo}
          />
          <button onSubmit={handleSumitSearch}>Search</button>

          <div
            className="search-results"
            style={{ display: displaySearchResult }}
          >
            <ul>
              {searchResult.map((video) => (
                <li
                  key={video._id}
                  onClick={() => handleWatchVideo(video._id, video.videoTitle)}
                >
                  {video.videoTitle}
                </li>
              ))}
            </ul>
            <div
              className="search-backdrop"
              onClick={handleCloseSearchResult}
            ></div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
}

export default SearchVideos;

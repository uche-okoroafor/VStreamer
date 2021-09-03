import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../Context/StateContext";
import { Link } from "react-router-dom";

function UploadVideos() {
  const { uploadVideo } = useContext(StateContext);
  const [tempOtherVideoSource, setTempOtherVideoSource] = useState("");
  const [tempYoutubeVideoSource, setTempYoutubeVideoSource] = useState("");
  const [tempVideoSource, setTempVideoSource] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [displayVideo, setDisplayVideo] = useState("block");
  const [displayYouTubeVideo, setDisplayYouTubeVideo] = useState("none");

  // useEffect(() => displayVideoContainer(), [loginUser]);

  // https://www.youtube.com/embed/8YhAFBOSk1U
  // https://www.w3schools.com/html/mov_bbb.mp4
  // https://www.youtube.com/embed/FCUk7rIBBAE

  function getTemporaryUrl(e) {
    const { name, value, files } = e.target;
    switch (name) {
      case "videoSource":
        if (value.includes("youtu")) {
          handleYoutubeUrl(value);
        } else {
          setDisplayYouTubeVideo("none");
          setDisplayVideo("block");
          setTempOtherVideoSource(value);
          setTempVideoSource(value);
        }

        break;

      case "fileUpload":
        setTempOtherVideoSource(URL.createObjectURL(files[0]));
        setTempVideoSource(URL.createObjectURL(files[0]));

        break;

      default:
        break;
    }
  }

  function handleTitleInput(e) {
    const { name, value, files } = e.target;

    setVideoTitle(value);
  }

  function handleYoutubeUrl(videoSource) {
    setDisplayYouTubeVideo("block");
    setDisplayVideo("none");
    if (videoSource.includes("embed") > 0) {
      setTempVideoSource(videoSource);

      return setTempYoutubeVideoSource(videoSource);
    } else {
      const urlParams = "youtu.be/";
      const indexOfvideoId = videoSource.search(urlParams) + urlParams.length;
      const youTubeVideoIdLength = 11;
      const videoId = videoSource.substr(indexOfvideoId, youTubeVideoIdLength);
      const videoUrl = `https://www.youtube.com/embed/${videoId}`;
      setTempVideoSource(videoUrl);

      return setTempYoutubeVideoSource(videoUrl);
    }
  }

  function handleUploadVideo(e) {
    uploadVideo(videoTitle,tempVideoSource);
    e.preventDefault();

  }

  //   </div>
  // </div>
  // <input
  //   type="file"
  //   name="fileUpload"
  //   accept="video/mp4"
  //   ref="filesUploadVideo"
  //   @change="localFiles"
  //   v-show="false"
  // />

  return (
    <React.Fragment>
      <div className="container p-3 my-3   videoUpload-container">
        <form onSubmit={handleUploadVideo}>
          <div className="videoFrame">
            {( tempVideoSource.length > 0 ) && (
              <div>
                <div style={{ display: displayVideo }}>
                  <video width="500" heigth="315" controls>
                    <source src={tempOtherVideoSource} type="video/mp4" />
                    <source src={tempOtherVideoSource} type="video/ogg" />
                    Your browser does not support HTML video.
                  </video>
                </div>
                <div style={{ display: displayYouTubeVideo }}>
                  <iframe
                    width="560"
                    height="315"
                    src={tempYoutubeVideoSource}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

 
{( tempVideoSource.length <= 0 ) && (
<div>
          <div>
            <input
              type="text"
              name="videoSource"
              className="form-control"
              onChange={getTemporaryUrl}
              placeholder="Enter video Url"
            />
          </div>

  <br />
          <span>Or</span>

          <br />
          <br />
          <div>
            <input
              className="form-control"
              type="file"
              name="fileUpload"
              accept="video/mp4"
              onChange={getTemporaryUrl}
              id="inputGroupFile02"
            />
          </div>
</div>
)}

{( tempVideoSource.length > 0 ) && (

          <div className="required-video-details">

            <input type="text" name="videoTitle" onChange={handleTitleInput} placeholder="Enter Video Title" />
            {/* <input type="text"  name="videoType"  />
<input type="text"  name="videoTitle"  />
<input type="text"  name="videoTitle"  />
<input type="text"  name="videoTitle"  /> */}
          </div>
)}

          <div className=" upload-video">
            <button className=" btn btn-success " type="submit">
              UpLoad Video
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default UploadVideos;

import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../Context/StateContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function AllVideos({allVideos}) {
  const { userData,handleViewedVideo } = useContext(StateContext);
  const history = useHistory();



function handleWatchVideo(videoId,videoTitle){

handleViewedVideo(videoId)
  history.push("/watch/"+ videoTitle);

}

  return (
    <React.Fragment>
        {allVideos.map((video) => (
            <div className="videos" key={video._id}>

              <div className="video-frame"  >
<div className="video-click-background" onClick={()=>handleWatchVideo(video._id,video.videoTitle) }></div>

            { !video.videoSource.includes("youtube")  &&   <video width="550" heigth="300" controls>
                  <source
                    src={video.videoSource}
                    type="video/mp4"
                  />
                  <source
                    src={video.videoSource}
                    type="video/ogg"
                  />
                  Your browser does not support HTML video.
                </video>}

    { video.videoSource.includes("youtube") && <iframe
                    width="550"
                    height="300"
                    src={video.videoSource}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
}
              </div>
              <div className="video-details">
                <p>{video.videoTitle}</p>
                <p>user</p>
                <p><Link to={"/watch/" + video.videoTitle}>video duration</Link></p>
                <p>likes</p>
                <p>comments</p>
                <p>views</p>
              </div>
            </div>
         
        ))}
    </React.Fragment>
  );
}

export default AllVideos;

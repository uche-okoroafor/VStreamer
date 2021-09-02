import React, { useState, useEffect, useContext } from "react";
import { StateContext } from "../Context/StateContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";




function  Home (){

const {userData} =
    useContext(StateContext);








    return ( <React.Fragment>
<div className="home-container">
<h1>welcome &nbsp;
{
userData.userName
}
</h1>

<div className="home-videos-container container bg-success">
<div className="home-videos">
<div className="home-video">

          <video width="400" heigth="100" controls>
            <source src="" type="video/mp4" />
            <source src="" type="video/ogg" />
            Your browser does not support HTML video.
          </video>

</div>
<div className="home-video-details">
<p>videotitle</p>
<p>user</p>
<p>video duration</p>
<p>likes</p>
<p>comments
</p>
</div>





</div>


</div>
</div>

</React.Fragment> );
}
 
export default Home;
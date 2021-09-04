import React, { createContext, Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// import dogImages from '../dogImages.json';
// import catImages from '../catImages.json';
// import birdImages from '../birdImages.json';

export const StateContext = createContext();

class StateContextProvider extends Component {
  state = {
    userName: "",
    password: "",
    loginUser: "",
    data: "",
    routeTo: "",
    userData: [],
    response: "",
    userConfirmed: false,
allVideos:[]
  };

  componentDidMount() {
  	this.handleGetVideos();
  }

  // shuffleCards = () => {
  // 	let images = this.state.displayedImages;
  // 	for (let i = images.length - 1; i > 0; i--) {
  // 		const j = Math.floor(Math.random() * (i + 1));
  // 		[ images[i], images[j] ] = [ images[j], images[i] ];
  // 	}
  // 	this.setState({
  // 		dogImages: images
  // 	});
  // };

  // shuffleImages = () => {
  // 	let num = Math.floor(Math.random() * this.state.images.length);
  // 	this.setState({
  // 		displayedImages: this.state.images[num]
  // 	});
  // };
handleGetVideos= async ()=>{
try{
const response = await axios.post(`/download_videos/`)
this.setState({allVideos:response.data})

}
catch (err) { 
    console.log(err);
  } 
}

  handleUserAuthentication = async (userName, password) => {
    axios
      .get(`/login/${userName}/${password}`)
      .then((response) => {
        this.setState({
          userConfirmed: response.data.status,
        });
      })
      .then(() => {
        this.handleGetUserData(userName);
      })
      .catch((err) => console.log(err));
  };

  handleCreateUserAccount = (userName, password) => {
    axios
      .post(`/create_account/${userName}/${password}`)
      .then((response) => {
        this.setState({
          userConfirmed: response.data.status,
        });
      })
      .then(() => {
        this.handleGetUserData(userName);
      })

      .catch((err) => console.log(err));
  };

  handleGetUserData = async (userName) => {
    if (this.state.userConfirmed) {
      axios
        .get(`/login/${userName}`)
        .then((response) => {
          this.setState({
            userData: response.data.userData,
          });
          this.setState({
            loginUser: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({
        loginUser: false,
      });
    }
  };

  uploadVideo = async (videoTitle, videoSource) => {
    let userData = this.state.userData;
    const videoId = uuidv4();
  const userVideo = {
        videoTitle,
        videoSource,
        videoId,
    };


axios.post(`/upload_video/${this.state.userData.userName}/${this.state.userData._id}`
, userVideo)
      .then((response) => {
        console.log(response.data, "videos");
      })
      .catch((err) => console.log(err));
  };

  resetLoginUser = () => {
    this.setState({
      loginUser: "",
    });
  };

  render() {
    return (
      <StateContext.Provider
        value={{
          ...this.state,
          uploadVideo: this.uploadVideo,
          handleUserAuthentication: this.handleUserAuthentication,
          handleCreateUserAccount: this.handleCreateUserAccount,
          resetLoginUser: this.resetLoginUser,
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateContextProvider;

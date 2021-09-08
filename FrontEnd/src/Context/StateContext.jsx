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
    user: [],
    response: "",
    userConfirmed: false,
    allVideos: [],
    viewedVideo: {
      videoTitle: "",
      videoSource: "",
      _id: "22233",
     
    },
 userData: {
        userName: "Guest",
        videos: [],
      },
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

  handleGetVideos = async () => {
    try {
      const response = await axios.post(`/download_videos/`);
      this.setState({ allVideos: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  handleUserAuthentication = async (userName, password) => {
    let responseData = {};

    axios
      .post(`/login/${userName}/`, { password })
      .then((response) => {
        responseData = response.data;

        this.setState({
          userConfirmed: responseData.status,
        });
      })
      .then(() => {
        this.handleLoginUser(userName, responseData.userId);
      })
      .catch((err) => console.log(err));
  };

  handleCreateUserAccount = (userName, password) => {
    let responseData = {};

    axios
      .post(`/create_account/${userName}`, { password })
      .then((response) => {
        responseData = response.data;

        this.setState({
          userConfirmed: responseData.status,
        });
      })
      .then(() => {
        this.handleLoginUser(userName, responseData.userId);
      })

      .catch((err) => console.log(err));
  };

  handleLoginUser = async (userName, userId) => {
    if (this.state.userConfirmed) {
      try {
        const loginUser = await this.handleGetUserData(userId, userName, true);

        this.setState({
          loginUser,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({
        loginUser: false,
      });
    }
  };

  handleGetUserData = async (userId, userName, isUser) => {
    if (userName === this.state.user.userName) {
   return   this.setState({
        userData: this.state.user,
      });
    }

    try {
      const response = await axios.post(
        `/login/${userName}/user_data`,
        { userId }
      );
      if (isUser) {
        this.setState({
          user: response.data.userData,
        });
        this.setState({
          userData: response.data.userData,
        });

        return true;
      } else {
        this.setState({
          userData: response.data.userData,
        });
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };






  handleViewedVideo = (videoId) => {
    const viewedVideo = this.state.allVideos.filter(
      (video) => video._id === videoId
    );
    this.setState({
      viewedVideo: viewedVideo[0],
    });
    console.log(viewedVideo);
  };

  uploadVideo = async (videoTitle, videoSource) => {
    const videoId = uuidv4();
    const userVideo = {
      videoTitle,
      videoSource,
      videoId,
    };

    axios
      .post(
        `/upload_video/${this.state.user.userName}/${this.state.user._id}`,
        userVideo
      )
      .then((response) => {
        // console.log(response.data, "videos");
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
          handleViewedVideo: this.handleViewedVideo,
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateContextProvider;

import React, { createContext, Component } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// import dogImages from '../dogImages.json';
// import catImages from '../catImages.json';
// import birdImages from '../birdImages.json';

export const StateContext = createContext();

class StateContextProvider extends Component {
  state = {
    userName: "",
    password: "",
    secondPassword: "",
    userExist: "",
    data: "",
    routeTo: "",
    userData: [],

    // images: [ dogImages, catImages, birdImages ],
    // displayedImages: dogImages,
    // count: 0,
    // clicked: null
  };

  // componentDidMount() {
  // 	this.shuffleImages();
  // }

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

  handleUserAuthentication = async (userName, password) => {
    // this.setState({
    // routeTo:useHistory()
    // })
    // axios({
    //   method: 'get',
    //   url: '/user/12345',
    //   data: {
    //    userName,
    //    password
    //   }
    // })
    axios.get(`/login/${userName}/${password}`)
      .then((response) => {
        this.setState({
          userExist: response.data.status,
        })

// setTimeout(() => {
//  this.handleGetUserData(userName,password)	
// }, 2000);
      })
.then( 
()=>{
this.handleGetUserData(userName,password)	

}
)
      .catch((err) => console.log(err));
  };


handleGetUserData= async (userName,password)=>{
// console.log(this.state.userExist)

        if (this.state.userExist) {

         axios
            .get(`/login/${userName}`)
            .then((response) => {
              this.setState({
                userData: response.data.userData,
              });

            })
            .catch((err) => console.log(err));
        }

}




  handleCreateUserAccount = (userName, password) => {
    axios
      .post(`/create_account/${userName}/${password}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };


resetUserExist=()=>{
this.setState({
userExist:""
})


}



  render() {
    return (
      <StateContext.Provider
        value={{
          ...this.state,
          handleUserAuthentication: this.handleUserAuthentication,
          handleCreateUserAccount: this.handleCreateUserAccount,
         resetUserExist:this.resetUserExist
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

export default StateContextProvider;

import React, { Component } from "react";
import "./App.css";
import HomePage from "./routes/HomePage";
import UserPage from "./routes/UserPage";
import LoginPage from "./routes/LoginPage";
import UploadVideosPage from "./routes/UploadVideosPage"
import viewedVideoPage from "./routes/viewedVideoPage"

import NavBar from "./components/Nav";
import CreateAccountPage from "./routes/CreateAccountPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StateContextProvider from "./Context/StateContext";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  //   componentDidMount() {
  //     axios.get("/login/chigo/123456")
  //      .then((response) => {
  //         this.setState({
  //           data: response.data,
  //         });

  // console.log(this.state.data)
  //       })
  //       .catch((err) => console.log(err,20));

  // axios.post("/create_account/ucheBond/123456")
  //      .then((response) => {
  //         this.setState({
  //           data: response.data,
  //         });

  // console.log(this.state.data)
  //       })
  //       .catch((err) => console.log(err,20));

  // }

//  localFiles(e) {
//       this.tempSource = URL.createObjectURL(e.target.files[0]);
//     },


  render() {
    return (
      <div className="App">
        <StateContextProvider>
          <Router>
            <NavBar />
            {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */} 
           <Route path="/upload_videos" component={UploadVideosPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/create_account" component={CreateAccountPage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/profile/:user" component={UserPage} />
            <Route path="/watch/:videoTitle" component={viewedVideoPage} />
          </Router>
        </StateContextProvider>
      </div>
    );
  }
}

export default App;

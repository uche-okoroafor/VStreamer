import { Container, MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
// import { UploadVideoProvider } from './context/useUploadVideoContext';
import { AllVideosProvider } from './context/useAllVideosContext';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Watch from './pages/Watch/Watch';
import Profile from './pages/Profile/Profile';

import './App.css';
import UploadVideo from './pages/UploadVideo/UploadVideo';
import { UserDetailsProvider } from './context/useUserContext';
import DragDrop from './pages/DragDrop/Dragdrop';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              {/* <UploadVideoProvider> */}
              <AllVideosProvider>
                <UserDetailsProvider>
                  <Layout />
                  <Switch>
                    <>
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />
                      <Route exact path="/upload-video" component={UploadVideo} />
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/watch/:title" component={Watch} />
                      <Route exact path="/profile/:username" component={Profile} />
                      <Route exact path="/DragDrop" component={DragDrop} />

                      <Route path="/">
                        <Redirect to="/home" />
                      </Route>
                      <Route path="*">
                        <Redirect to="/login" />
                      </Route>
                    </>
                  </Switch>
                </UserDetailsProvider>
              </AllVideosProvider>
              {/* </UploadVideoProvider> */}
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;

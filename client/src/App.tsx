import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
// import { UploadVideoProvider } from './context/useUploadVideoContext';
import { AllVideosProvider } from './context/useAllVideosContext';
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Layout from './components/Layout/Layout';

import './App.css';
import UploadVideo from './pages/UploadVideo/UploadVideo';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              {/* <UploadVideoProvider> */}
              <AllVideosProvider>
                {/* <Layout> */}
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/upload-video" component={UploadVideo} />

                  <Route exact path="/dashboard">
                    <Dashboard />
                  </Route>
                  <Route path="*">
                    <Redirect to="/login" />
                  </Route>
                </Switch>
                {/* </Layout> */}
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

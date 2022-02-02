import React from 'react';
import { Route, Redirect } from 'react-router-dom';

interface IProps {
  component: React.FC;
  path: string;
  exact: boolean;
}

const ProtectedRoute: React.FC<IProps> = (props) => {
  return localStorage.getItem('user-token') ? <Route {...props} /> : <Redirect to="/login" />;
};
export default ProtectedRoute;

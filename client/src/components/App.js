import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Topnav from './Topnav';
import { Route } from  "react-router-dom";
import { 
  AuthRoute, 
  ProtectedRoute 
} from "../util/route";


import Games from "./games";
export default () => (
  <>
      <Topnav />
      <Route exact path="/" component={Dashboard} />
      <Route  path="/games" component={Games} />
      <AuthRoute path="/login" component={Login} />
      <AuthRoute path="/signup" component={Signup} />
      
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      
      
      
    </>
);
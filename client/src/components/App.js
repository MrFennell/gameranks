import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Topnav from './Topnav';
import { connect } from 'react-redux';
import { Route, Redirect } from  "react-router-dom";
import { 
  AuthRoute, 
  ProtectedRoute 
} from "../util/route";

import Games from "./games";

const mapStateToProps = ({ session }) => ({
    session
});


class App extends React.Component{

  render(){
    const user = this.props.session.username;
    return (
      <>
        <Topnav session={this.props.session}/>

        <Route exact path="/"> 
          {user ? <Redirect to="/dashboard" /> : <Welcome /> }
        </Route>
        <Route path="/games/:gameName" component={Games} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/signup" component={Signup} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        
      </>
    )
  }
}

export default connect(
    mapStateToProps,
)(App);
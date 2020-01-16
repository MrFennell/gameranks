import React from 'react';
import Welcome from './Welcome';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Topnav from './Topnav';
import Results from './search/Results';
import { createBrowserHistory } from "history";

import { connect } from 'react-redux';
import { Route, Redirect } from  "react-router-dom";
import { loadGames } from 'actions/profile/games';

import {
  AuthRoute, 
  ProtectedRoute 
} from "../util/route";

import Single from "./games/single";
import Games from "./games";

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    loadGames: () => dispatch(loadGames())
});

const customHistory = createBrowserHistory();

class App extends React.Component{
componentDidMount = () => this.props.loadGames();

componentDidUpdate(prevProps){
  if (this.props.session.userId !== prevProps.session.userId){
    return this.props.loadGames();
  }
}
  render(){
    const user = this.props.session.username;
    
    return (
      <div className="container">
        <Topnav history={customHistory} session={this.props.session}/>
        <Route exact path="/"> 
          {user ? <Redirect to="/dashboard" /> : <Welcome /> }
        </Route>
        <Route path="/games/game/:gameName" component={Single} />
        <Route path="/games/search/:query" component={Results} />
        <Route exact path="/games" component={Games} />
        <AuthRoute path="/login" component={Login} />
        <AuthRoute path="/signup" component={Signup} />
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        
      </div>
    )
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
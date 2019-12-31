import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session';
import PopularGames from './games/popular';

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const Dashboard = ({ logout, session }) => (
    <>

        <h1>Hi {session.username}</h1>
        <p>You are now logged in!</p>
        <button onClick={logout}>Logout</button>
        <PopularGames />
    </>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
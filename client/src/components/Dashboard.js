import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/session';
import PopularGames from './games/popular';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const Dashboard = ({ logout, session }) => (
    <Container>
    <h3>Welcome back {session.username}</h3>
        <PopularGames />
    </Container>
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
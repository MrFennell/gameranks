import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const mapStateToProps = ({ session, games }) => ({
    session,
    games
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

class Topnav extends React.Component{

    render(){
        const user = this.props.session.username;
        if(user){
            return(
                <div className="container">
                    <Navbar>
                        <Navbar.Brand>Gameranks</Navbar.Brand>
                        <Link to='/dashboard'>{user}</Link>
                        <Link to='/games'>Games</Link>
                        <button onClick={this.props.logout}>Logout</button>
                    </Navbar>
                </div>
            )
        }
        else{
            return(
                <div className="container">
                    <Navbar>
                    <Navbar.Brand>Gameranks</Navbar.Brand>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                        <Link to='/games'>Games</Link>
                    </Navbar>
                </div>
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topnav);
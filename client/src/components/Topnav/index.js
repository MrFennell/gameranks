import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const mapStateToProps = ({ session }) => ({
    session
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

class Topnav extends React.Component{

    render(){
        const user = this.props.session.username;
        if(user){
            return(
                <Navbar>
                    <Navbar.Brand>Gameranks</Navbar.Brand>
                    <Link to='/dashboard'>{user}</Link>
                    <button onClick={this.props.logout}>Logout</button>
                </Navbar>
            )
        }
        else{
            return(
                <Navbar>
                <Navbar.Brand>Gameranks</Navbar.Brand>
                    <Link to='/login'>Login</Link>
                    <Link to='/signup'>Signup</Link>
                </Navbar>
            )
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topnav);
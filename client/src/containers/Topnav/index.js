import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/session';
import { LinkContainer } from 'react-router-bootstrap'

import Search from './Search'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

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
                    <Navbar expand="md">
                        <LinkContainer to='/dashboard'><Navbar.Brand>Gameranks</Navbar.Brand></LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Nav.Link><Link to='/dashboard'>{user}</Link></Nav.Link> */}
                                <NavDropdown title={user} id="basic-nav-dropdown">
                                    <LinkContainer to='/dashboard'><NavDropdown.Item>Dashboard</NavDropdown.Item></LinkContainer>
                                    <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                                </NavDropdown>
                                <LinkContainer to='/games'><Nav.Link>Games</Nav.Link></LinkContainer>
                                {/* <Button onClick={this.props.logout} variant="secondary">Logout</Button> */}
                                
                            </Nav>
                            <Form inline>
                                <Search history={this.props.history} />
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }
        else{
            return(
                <div className="container">
                    <Navbar>
                    <Navbar.Brand>Gameranks</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <LinkContainer to='/login'><Nav.Link>Login</Nav.Link></LinkContainer > 
                            <LinkContainer to='/signup'><Nav.Link>Signup</Nav.Link></LinkContainer>
                            <LinkContainer to='/games'><Nav.Link>Games</Nav.Link></LinkContainer>
                        </Nav>
                            <Form inline>
                                <Search history={this.props.history} />
                            </Form>
                        </Navbar.Collapse>
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
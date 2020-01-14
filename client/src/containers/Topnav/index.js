import React from 'react';
import { connect } from 'react-redux';
import { logout } from 'actions/session';
import { Link } from 'react-router-dom';
import Search from './Search'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                    <Navbar expand="lg">
                        <Navbar.Brand><Link Link to='/dashboard'>Gameranks</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                {/* <Nav.Link><Link to='/dashboard'>{user}</Link></Nav.Link> */}
                                <NavDropdown title={user} id="basic-nav-dropdown">
                                    <NavDropdown.Item><Link to='/dashboard'>Profile</Link></NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item onClick={this.props.logout}>Logout</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link><Link to='/games'>Games</Link></Nav.Link>
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
                            <Nav.Link><Link to='/login'>Login</Link> </Nav.Link>
                            <Nav.Link><Link to='/signup'>Signup</Link></Nav.Link>
                            <Nav.Link><Link to='/games'>Games</Link></Nav.Link>
                            
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
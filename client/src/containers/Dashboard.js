import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'

const mapStateToProps = ({ session, want }) => ({
    session, want
});

class Dashboard extends Component {
    render() {
        return (
            <>
                <Container>

                    <h3>Welcome back {this.props.session.username}</h3>
                    <Nav variant="tabs">
                        <LinkContainer to='/dashboard/collection'><Nav.Link>Collection</Nav.Link></LinkContainer>
                        <LinkContainer to='/dashboard/wishlist'><Nav.Link>Wishlist</Nav.Link></LinkContainer>
                        <LinkContainer to='/dashboard/likes'><Nav.Link>Likes</Nav.Link></LinkContainer>
                    </Nav>
                </Container>   
            </>
        );
    }
}

export default connect(
    mapStateToProps
)(Dashboard);
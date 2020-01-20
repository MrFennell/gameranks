import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Wishlist from 'containers/profile/Wishlist';

const mapStateToProps = ({ session, want }) => ({
    session, want
});

class Dashboard extends Component {
    render() {
        return (
            <>
                <Container>
                    <h3>Welcome back {this.props.session.username}</h3>
                    <Wishlist wishlist={this.props.want}/>
                </Container>   
            </>
        );
    }
}

export default connect(
    mapStateToProps
)(Dashboard);
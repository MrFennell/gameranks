import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const mapStateToProps = ({ session }) => ({
    session
});

class Dashboard extends Component {
    render() {
        return (
            <>
                <Container>
                    <h3>Welcome back {this.props.session.username}</h3>
                </Container>   
            </>
        );
    }
}

export default connect(
    mapStateToProps
)(Dashboard);
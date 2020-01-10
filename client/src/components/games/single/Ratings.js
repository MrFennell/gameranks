
import React, { Component } from 'react';
import Want from '../components/icons/Want';
import { connect } from 'react-redux';
import { like } from 'actions/profile';
import Played from '../components/icons/Played';
import Like from '../components/icons/Like';

 const mapStateToProps = ({ session, games }) => ({
    session, games
});

const mapDispatchToProps = (dispatch, ownProps)=> ({
    like: () => dispatch(like(ownProps))
});


class Ratings extends Component {
    
    render() {
        return (
            <div>
                <Want className="single-game-icon" />
                <Played className="single-game-icon"  />
                <Like onClick={() => this.props.like(this.props.game)}  className="single-game-icon" />
                <div onClick={() => this.props.like(this.props.game)} >Fake Like</div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ratings);
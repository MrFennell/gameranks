
import React, { Component } from 'react';
import Want from 'components/icons/Want';
import { connect } from 'react-redux';
import { 
    addPlayed,
    removePlayed,

    }from 'actions/profile/games';
import { 
    addLike, 
    removeLike,
    }from 'actions/profile/likes';

import { 
    addOwned, 
    removeOwned,
    }from 'actions/profile/owned';

import { 
    addWant, 
    removeWant,
    }from 'actions/profile/want';

import Played from 'components/icons/Played';
import Like from 'components/icons/Like';

const mapStateToProps = ({ session, games, likes, owned, want }) => ({
    session, games, likes, owned, want
});

const mapDispatchToProps = (dispatch, ownProps)=> ({
    addLike: () => dispatch(addLike(ownProps)),
    removeLike: () => dispatch(removeLike(ownProps)),
    addPlayed: () => dispatch(addPlayed(ownProps)),
    removePlayed: () => dispatch(removePlayed(ownProps)),
    addWant: () => dispatch(addWant(ownProps)),
    removeWant: () => dispatch(removeWant(ownProps)),
    addOwned: () => dispatch(addOwned(ownProps)),
    removeOwned: () => dispatch(removeOwned(ownProps))
});

class Ratings extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            game: this.props.id,
            likes:false,
            owned: false,
            played: false,
            want: false
        }
    }
    
    componentDidMount = () => this.searchGame();
    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            this.searchGame();
        }
    }
    searchGame = () => {
        const game = this.props.id;
        const likesResult = this.props.likes.find(e => e.game_id === game);
        const ownedResult = this.props.owned.find(e => e.game_id === game);
        const wantResult = this.props.want.find(e => e.game_id === game);
        if (likesResult)
            {this.setState({likes: true});}
        if (ownedResult)
            {this.setState({owned: true});}
        if (wantResult)
            {this.setState({want: true});}  
    }
    
    
    setLike = () => {
        if (this.state.likes === true){
            this.setState({likes: false})
            this.props.removeLike()
        }
        else{
            this.setState({likes: true})
            this.props.addLike()
        }
    }
    setOwned= () => {
        if (this.state.owned === true){
            this.setState({owned: false})
            this.props.removeOwned()
        }
        else{
            this.setState({owned: true})
            this.props.addOwned()
        }
    }
    // setPlayed = () => {
    //     if (this.state.played === true){
    //         this.setState({played: false})
    //         this.props.removePlayed()
    //     }
    //     else{
    //         this.setState({played: true})
    //         this.props.addPlayed()
    //     }
    // }
    setWant = () => {
        if (this.state.want === true){
            this.setState({want: false})
            this.props.removeWant()
        }
        else{
            this.setState({want: true})
            this.props.addWant()
        }
    }
    render() {
        
        const iconTrue = {
            color: 'green',
        }
        const iconFalse = {
            color: 'black',
        }
        const likeStyle = ((this.state.likes === true) ? iconTrue : iconFalse)
        // const playedStyle = ((this.state.played === true) ? iconTrue : iconFalse)
        const ownedStyle = ((this.state.owned === true) ? iconTrue : iconFalse)
        const wantStyle = ((this.state.want === true) ? iconTrue : iconFalse)
        if (this.props.session.userId){
            return (
                <div>
                    <div onClick={this.setWant}>
                       <Want style={wantStyle} className="single-game-icon" />
                    </div>
                    <div onClick={this.setOwned}>
                        <Played style={ownedStyle} className="single-game-icon"  />
                    </div>
                    <div onClick={this.setLike}>
                        <Like style={likeStyle} className="single-game-icon"/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <Want className="single-game-icon" />
                    <Played className="single-game-icon"  />
                    <Like className="single-game-icon"/>
                </div>
            );
        }
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ratings);

import React, { Component } from 'react';
import Want from 'components/icons/Want';
import { connect } from 'react-redux';
import { 
    addLike, 
    removeLike, 
    addPlayed,
    removePlayed,
    addWant,
    removeWant
    }from 'actions/profile/games';
import Played from 'components/icons/Played';
import Like from 'components/icons/Like';

 const mapStateToProps = ({ session, games }) => ({
    session, games
});

const mapDispatchToProps = (dispatch, ownProps)=> ({
    addLike: () => dispatch(addLike(ownProps)),
    removeLike: () => dispatch(removeLike(ownProps)),
    addPlayed: () => dispatch(addPlayed(ownProps)),
    removePlayed: () => dispatch(removePlayed(ownProps)),
    addWant: () => dispatch(addWant(ownProps)),
    removeWant: () => dispatch(removeWant(ownProps))
});

class Ratings extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            game: this.props.id,
            inMemory: false,
            likes:false,
            owned: false,
            played: false,
            want: false
        }
    }
    
    componentDidMount = () => this.searchGame();
    searchGame = () => {
        const game = this.props.id;
        const gameResult = this.props.games.find(e => e.game_id === game);
        if (gameResult){
            this.setState
                ({
                    inMemory: true,
                    likes: (gameResult.likes ? gameResult.likes : false),
                    owned:(gameResult.owned ? gameResult.owned : false),
                    played: (gameResult.played ? gameResult.played : false),
                    want: (gameResult.want ? gameResult.want : false),
                });
        }
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
    setPlayed = () => {
        if (this.state.played === true){
            this.setState({played: false})
            this.props.removePlayed()
        }
        else{
            this.setState({played: true})
            this.props.addPlayed()
        }
    }
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
        const playedStyle = ((this.state.played === true) ? iconTrue : iconFalse)
        const wantStyle = ((this.state.want === true) ? iconTrue : iconFalse)
        if (this.props.session.userId){
            return (
                <div>
                    <div onClick={this.setWant}>
                       <Want style={wantStyle} className="single-game-icon" />
                    </div>
                    <div onClick={this.setPlayed}>
                        <Played style={playedStyle} className="single-game-icon"  />
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
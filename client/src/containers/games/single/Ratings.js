
import React, { Component } from 'react';
import Want from 'components/icons/Want';
import { connect } from 'react-redux';
import { addLike, removeLike } from 'actions/profile';
import Played from 'components/icons/Played';
import Like from 'components/icons/Like';

 const mapStateToProps = ({ session, games }) => ({
    session, games
});

const mapDispatchToProps = (dispatch, ownProps)=> ({
    
    addLike: () => dispatch(addLike(ownProps)),
    removeLike: () => dispatch(removeLike(ownProps))
});

class Ratings extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            game: this.props.id,
            inMemory: false,
            likes:false,
            owned: false
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
                    owned:(gameResult.owned ? gameResult.owned : false)
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
    render() {
        
        const iconTrue = {
            color: 'green',
        }

        const iconFalse = {
            color: 'black',
        }
        const likeStyle = ((this.state.likes === true) ? iconTrue : iconFalse)
        return (
            <div>
                <Want className="single-game-icon" />
                <Played className="single-game-icon"  />
                <div onClick={this.setLike} >
                {/* <div onClick={() => this.props.like(this.props.game)} > */}
                    <Like style={likeStyle} className="single-game-icon"/>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ratings);
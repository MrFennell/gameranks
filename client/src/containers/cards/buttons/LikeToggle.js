import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLike, removeLike }from 'actions/profile/likes';
import Like from 'components/icons/Like';

const mapStateToProps = ({likes}) => ({
    likes
});

const mapDispatchToProps = (dispatch, ownProps)=> ({
    addLike: () => dispatch(addLike(ownProps)),
    removeLike: () => dispatch(removeLike(ownProps)),
});

class LikeToggle extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            likes:false,
        }
    }

    componentDidMount = () => this.searchGame();
    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            this.searchGame();
        }
    }
    searchGame = () => {
        const likesResult = this.props.likes.find(e => e.game_id === this.props.id);
        if (likesResult)
            {this.setState({likes: true});}
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
            <div onClick={this.setLike}>
                <Like style={likeStyle} className="single-game-icon"/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LikeToggle);
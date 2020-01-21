import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addOwned, removeOwned }from 'actions/profile/owned';
import Own from 'components/icons/Own';

const mapStateToProps = ({owned}) => ({
    owned
});

const mapDispatchToProps = (dispatch, ownProps)=> ({
    addOwned: () => dispatch(addOwned(ownProps)),
    removeOwned: () => dispatch(removeOwned(ownProps)),
});

class OwnToggle extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            owned:false,
        }
    }

    componentDidMount = () => this.searchGame();
    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            this.searchGame();
        }
    }
    searchGame = () => {
        const ownedResult = this.props.owned.find(e => e.game_id === this.props.id);
        if (ownedResult)
            {this.setState({owned: true});}
    }
    setOwn = () => {
        if (this.state.owned === true){
            this.setState({owned: false})
            this.props.removeOwned()
        }
        else{
            this.setState({owned: true})
            this.props.addOwned()
        }
    }
    render() {
        const iconTrue = {
            color: 'green',
        }
        const iconFalse = {
            color: 'black',
        }
        const ownedStyle = ((this.state.owned === true) ? iconTrue : iconFalse)

        return (
            <div onClick={this.setOwn}>
                <Own style={ownedStyle} className="single-game-icon"/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnToggle);
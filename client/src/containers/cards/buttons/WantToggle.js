import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addWant, removeWant }from 'actions/profile/want';
import Want from 'components/icons/Want';

const mapStateToProps = ({want}) => ({
    want
});

const mapDispatchToProps = (dispatch, ownProps)=> ({
    addWant: () => dispatch(addWant(ownProps)),
    removeWant: () => dispatch(removeWant(ownProps)),
});

class WantToggle extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
            want:false,
        }
    }
    
    componentDidMount = () => this.searchGame();
    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            this.searchGame();
        }
    }
    searchGame = () => {
        const WantResult = this.props.want.find(e => e.game_id === this.props.id);
        if (WantResult)
            {this.setState({want: true});}
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
        const Wantstyle = ((this.state.want === true) ? iconTrue : iconFalse)

        return (
            <div onClick={this.setWant}>
                <Want style={Wantstyle} className="single-game-icon"/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WantToggle);
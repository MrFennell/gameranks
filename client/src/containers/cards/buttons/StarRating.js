import React, { Component } from 'react';
// import Rating from 'react-rating';
import { connect } from 'react-redux';
import { addRating, removeRating }from 'actions/profile/ratings';
import { FaStar } from 'react-icons/fa';

const mapStateToProps = ({ratings}) => ({
    ratings
});

const mapDispatchToProps = (dispatch )=> ({
    addRating: (e) => dispatch(addRating(e)),
    removeRating: (e) => dispatch(removeRating(e)),
});

class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            starRating: 0,
            ratingSaved: 0,
            starColor: 'white',
            rating:  false
        };
    }
    componentDidMount = () => this.searchGame();
    componentDidUpdate(prevProps){
        if (this.props.id !== prevProps.id){
            this.searchGame();
        }
    }
    searchGame = () => {
        const ratingFound = this.props.ratings.find(e => e.game_id === this.props.id);
       
        if (ratingFound)
            {
                this.setState({
                    rating: true, 
                    ratingSaved: ratingFound.rating, 
                    starRating: ratingFound.rating,
                    starColor: 'orange',
                })
            }
    }

    handleClick(e) {

        if (e === this.state.ratingSaved){ //clicking the same rating twice will reset rating
           this.setState({
                ratingSaved: 0,
                starColor: 'yellow'
            });
            this.props.removeRating({
                'id':this.props.id,
                'rating':this.state.starRating
                })
        }
        else{
            this.setState({
                ratingSaved: e,
                starColor: 'orange'
            });
            this.props.addRating({
                'id':this.props.id,
                'rating':this.state.starRating
                })
        }
        
    }
    mouseOver = (e) => {
        if (this.state.starColor === 'white'){
            this.setState({starRating: e, starColor: 'yellow'});
        }
        else {
            this.setState({starRating: e});
        }
        
    }
    mouseOut = () => {
         this.setState({starRating: this.state.ratingSaved});
    }
    render() {


        const iconTrue = {
            color: this.state.starColor,
            stroke: 'white',
            strokeWidth: '12px'
        }
        const iconFalse = {
            color: 'transparent',
            stroke: 'transparent',
            
        }
        const iconFalseB = {
            stroke: 'white',
            strokeWidth: '12px',
            color: 'transparent'
        }

        const stars = this.state.starRating;
        return (
            
            <div>

                <div className="star-container">

                    {/* star 1 */}
                    <div className="star">
                   
                        <div className="starA" 
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(1)}
                            onClick={() => this.handleClick(1)}
                        >   
                            <FaStar style={(stars === 1) ? iconTrue: iconFalse}/>
                        </div>
                        <div  className="starB"
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(2)}
                            onClick={() => this.handleClick(2)}
                        >
                            
                            <FaStar style={(this.state.starRating >= 2) ? iconTrue: iconFalseB}/>
                        </div>
                    </div>

                    {/* star 2 */}
                    <div className="star">
                        <div className="starA" 
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(3)}
                            onClick={() => this.handleClick(3)}
                        >
                            <FaStar style={(stars >= 3) ? iconTrue: iconFalse}/>
                        </div>
                        <div  className="starB"
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(4)}
                            onClick={() => this.handleClick(4)}
                        >
                            <FaStar style={(this.state.starRating >= 4) ? iconTrue: iconFalseB}/>
                        </div>
                    </div>

                    {/* star 3 */}
                    <div className="star">
                        <div className="starA" 
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(5)}
                            onClick={() => this.handleClick(5)}
                        >
                            <FaStar style={(stars >= 5) ? iconTrue: iconFalse}/>
                        </div>
                        <div  className="starB"
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(6)}
                            onClick={() => this.handleClick(6)}
                        >
                            <FaStar style={(this.state.starRating >= 6) ? iconTrue: iconFalseB}/>
                        </div>
                    </div>

                    {/* star 4 */}
                    <div className="star">
                        <div className="starA" 
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(7)}
                            onClick={() => this.handleClick(7)}
                        >
                            <FaStar style={(stars >= 7) ? iconTrue: iconFalse}/>
                        </div>
                        <div  className="starB"
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(8)}
                            onClick={() => this.handleClick(8)}
                        >
                            <FaStar style={(this.state.starRating >= 8) ? iconTrue: iconFalseB}/>
                        </div>
                    </div>

                    {/* star 5 */}
                    <div className="star">
                        <div className="starA" 
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(9)}
                            onClick={() => this.handleClick(9)}
                        >
                            <FaStar style={(stars >= 9) ? iconTrue: iconFalse}/>
                        </div>
                        <div  className="starB"
                            onMouseOut={() => this.mouseOut()}
                            onMouseOver={() => this.mouseOver(10)}
                            onClick={() => this.handleClick(10)}
                        >
                            <FaStar style={(this.state.starRating >= 10) ? iconTrue: iconFalseB}/>
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StarRating);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardSmall from "containers/cards/CardSmall";
const mapStateToProps = ({want}) => ({want});

class Wishlist extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        
        this.state = {
            gameResults: [],
            errors: null,
            games:[]
        }
    }
    componentDidMount(props){
        this._isMounted = true;
        const games = this.props.want;
        if (games !== []){
            this.getCovers(games);
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.want !== prevProps.want){
            this.getCovers(this.props.want);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
  
    async getCovers(games){
            
            
            await fetch('/api/search/covers',{
                method:"POST",
                headers: { 'Content-type': 'application/json'},
                body: JSON.stringify({games})
            })
            .then(res => res.json())
                .then (
                    (result) => {
                        if (this._isMounted){
                            this.setState({
                                gameResults: result,
                            });
                        }
                    },
                    (errors) => {
                        this.setState({
                            isLoaded: true,
                            errors
                        });
                    }
                )
        }
    
    render() {
        const gameArray =  Object.values(this.state.gameResults);
        if(gameArray !== []){

            return (
                <div className="container">

                {gameArray.map ((e, index) => (

                    <CardSmall 
                        key={index}
                        id={e.id}
                        slug={e.slug}
                        name={e.name}
                        src={e.cover ?
                            `https://images.igdb.com/igdb/image/upload/t_cover_uniform/${e.cover.image_id}.jpg` 
                            : `https://images.igdb.com/igdb/image/upload/t_cover_uniform/co1l49.jpg`}
                    />
               ))}
            </div>
        )

        }else return <div>no result</div>
        
    }
}

export default connect(
    mapStateToProps
)(Wishlist);
import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({want}) => ({want});

class Wishlist extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            gameResults: [],
            errors: null,
            games:[]
        }
    }
    componentDidMount(props){
        
        const games = this.props.wishlist;
        if (games !== []){
            this.getCovers(games);
        }
        
    }

    componentDidUpdate(prevProps){
        if (this.props.wishlist !== prevProps.wishlist){
            this.getCovers(this.props.wishlist);
        }
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
                        this.setState({
                            gameResults: result,
                        });
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
            <div className="top">
                {gameArray.map ((e, index) => (
                    <div key={index}>
                        <p>{e.name}</p>
                        <img src={
                            e.cover ?
                            `https://images.igdb.com/igdb/image/upload/t_cover_uniform/${e.cover.image_id}.jpg` : 
                            `https://images.igdb.com/igdb/image/upload/t_cover_uniform/co1l49.jpg`} 
                            alt= {e.name}
                        />
                    </div>
                ))}
            </div>
        )

        }else return <div>no result</div>
        
    }
}

export default connect(
    mapStateToProps
)(Wishlist);
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class PopularGames extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            games: [],
            errors: null,
            isLoaded: false
        }
    }
    componentDidMount(){
        this.getPopular();
    }
    async getPopular(){
        await fetch('/api/popular',{
            method:"POST"
        })
        .then(res => res.json())
            .then (
                (result) => {
                    this.setState({
                        isLoaded: true,
                        games: result
                        
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
        const {errors, isLoaded, games} = this.state;
        if (errors){
            return <div>Error: {errors}</div>;
        }else if (!isLoaded){
                return (
                <>
                    <h3>Popular Games</h3>
                    <div>Loading...</div>;
                </>
                )
        }else {
            return (
                <div className="container">
                    <h3>Popular Games</h3>
                    {games.map(game => (
                        <div key={game.id}>
                            <img
                                src={`https://images.igdb.com/igdb/image/upload/t_cover_uniform/${game.cover.image_id}.jpg`}
                                alt={game.name}
                             />
                            <Link to={{
                                pathname:"/games/game/" + game.slug,
                                state: {
                                    gameId: game.id,
                                    gameName: game.name
                                }
                                }}>
                                {game.name}
                                
                            </Link>
                        </div>
                    ))}
                </div>
            );
        }
    }
}

export default PopularGames;
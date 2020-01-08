import React from 'react';
// import Screenshots from './gamedetails/Screenshots';
// import Artworks from './gamedetails/Artworks';
// import { HeaderBanner } from './gamedetails/HeaderBanner';


import Ratings from './Ratings';
import Platforms from './Platforms'
import GameModes from './GameModes'
import Genres from './Genres'
import Companies from './Companies'

class Single extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            gameResult: {},
            errors: null,
            isLoaded: false,
        }
    }
    componentDidMount(props){
        const gameId = this.props.location.state.gameId;
        this.getGame(gameId);
    }
    async getGame(gameId){
        await fetch('/api/game',{
            method:"POST",
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify({gameId:gameId})
        })
        .then(res => res.json())
            .then (
                (result) => {
                    this.setState({
                        isLoaded: true,
                        gameResult: result
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
   
    render(){
        const {errors, isLoaded} = this.state;
        const game = this.state.gameResult[0];
        
        if (errors){
            return <div>Error: {errors}</div>;
        }else if (!isLoaded){
                return (
                    <>
                        <div>Loading...</div>;
                    </>
                )
        }else {
            return (
                <div className="container">
                    {/* <div id="header-banner" style={{backgroundImage: `url(https://images.igdb.com/igdb/image/upload/t_cover_un iform/${game.cover.image_id}.jpg)`}} > */}
                    <div className="game-summary">
                        <img 
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_uniform/${game.cover.image_id}.jpg`}
                            alt={game.name}
                        />
                        <Ratings game={game} />
                         
                        <h3>{game.name}</h3>
                        <p>{game.summary}</p>
                        
                    </div>
                    <div className="game-platform">
                       <Platforms platforms={game.platforms}/>
                    </div>
                    <div className="game-game-modes">
                       <GameModes game_modes={game.game_modes}/>
                    </div>
                    <div className="game-genres">
                       <Genres genres={game.genres}/>
                    </div>
                    <div className="game-companies">
                       <Companies companies={game.involved_companies}/>
                    </div>
                    
                    {/* <Screenshots 
                        screenshots={game.screenshots} 
                        name={game.name}
                    />
                    <Artworks 
                        artworks={game.artworks} 
                        name={game.name}
                    /> */}
                </div>
            );
        }
    }
};

export default Single;
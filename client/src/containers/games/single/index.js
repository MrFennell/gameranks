import React from 'react';
// import Screenshots from './gamedetails/Screenshots';
// import Artworks from './gamedetails/Artworks';
// import { HeaderBanner } from './gamedetails/HeaderBanner';
import { connect } from 'react-redux';
import Ratings from './Ratings';
import Platforms from './game-data/Platforms'
import GameModes from './game-data/GameModes'
import Genres from './game-data/Genres'
import Companies from './game-data/Companies'

 const mapStateToProps = ({ session, games }) => ({
    session, games
})

class Single extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            gameResult: {},
            errors: null,
            isLoaded: false,
            inUserMemory: false,
            likes: false,
            owned: false
        }
    }
    componentDidMount(props){
        const gameId = this.props.location.state.gameId;
        this.getGame(gameId);
        
    }
    findGameInStore = () => {
        const game = this.state.gameResult[0];
        console.log(game)
        const findGame = this.props.games.find(e => e.game_id === game.id);
        if (findGame){
            this.setState
                ({
                    inUserMemory: true,
                    likes: (findGame.likes ? findGame.likes : false),
                    owned:(findGame.owned ? findGame.owned : false)
                });
        }
    }
    //get game from api
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
                        gameResult: result,
                        storedGame: {}
                    });
                },
                (errors) => {
                    this.setState({
                        isLoaded: true,
                        errors
                    });
                }
            )
        .then(
            this.findGameInStore
        )
    }
    //check if game is in user store
    async CheckStore(){

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
                       
                        <Ratings 
                        
                            id={game.id}
                        
                        />
                         
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

export default connect(
    mapStateToProps
    // ,
    // mapDispatchToProps
)(Single);
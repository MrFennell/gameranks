import React from 'react';

class Games extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            gameResult: {},
            errors: null,
            isLoaded: false
        }
    }
    componentDidMount(props){
        const gameId = this.props.location.state.gameId;
        console.log(gameId);
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
         const {errors, isLoaded, gameResult} = this.state;
        const game = this.state.gameResult[0];
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
                <>
                    <h3>{game.name}</h3>
                        <img 
                            src={`https://images.igdb.com/igdb/image/upload/t_cover_uniform/${game.cover.image_id}.jpg`}
                            alt={game.name}
                            />

                    
                </>
            );
        }
    }
};

export default Games;
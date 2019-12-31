import React, { Component } from 'react';

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
                <>
                    <h3>Popular Games</h3>
                    {games.map(game => (
                        <div key={game.id}>
                            <img src={`https://images.igdb.com/igdb/image/upload/t_screenshot_med/${game.screenshots[0].image_id}.jpg`} />
                            {game.name}
                        </div>
                    ))}
                </>
            );
        }
    }
}

export default PopularGames;
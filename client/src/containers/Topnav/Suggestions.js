import React from 'react';
import { Link } from 'react-router-dom';

// const styles = {
//     position: 'absolute',
//     top: 46,
//     padding: 10

// }

const Suggestions = (props) => {
    const options = props.results.map(game => (
        <div key={game.id}>
            <Link to={{
                pathname:"/games/" + game.slug,
                state: {
                    gameId: game.id,
                    gameName: game.name
                }
                }}>
                {game.name}
            </Link>
        </div>
    ))
    if(props.displayResults === true){
        return (
            <ul>
                {options}
            </ul>
        );
    }else{
        return ''
    }
    
};

export default Suggestions;
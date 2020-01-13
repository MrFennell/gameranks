import React from 'react';

const GameModes = (props) => {
    const modes = props.game_modes;
    if (modes){
    return (
            <>
            <h4>Game Modes</h4>
                {modes.map(e => (
                    <div key={e.id}>
                        {e.name}
                    </div>
                ))}
            </>
        );
    }
    else{
        return <h4>Game Modes</h4>
    }
    
};

export default GameModes;
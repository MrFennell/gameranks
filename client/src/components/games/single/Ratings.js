import React from 'react';
import Want from '../components/icons/Want';
import Played from '../components/icons/Played';
import Like from '../components/icons/Like';

const Ratings = () => {
    return (
        <div>
            <Want className="single-game-icon" />
            <Played className="single-game-icon"  />
            <Like className="single-game-icon" />
        </div>
    );
};

export default Ratings;
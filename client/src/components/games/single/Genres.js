import React from 'react';

const Genres = (props) => {
    const genres = props.genres;
    return (
        <>
        <h4>Genre</h4>
            {genres.map(e => (
                <div key={e.id}>
                    {e.name}
                </div>
            ))}
        </>
    );
};

export default Genres;
import React from 'react';

const Genres = (props) => {
    const genres = props.genres;
    if(genres){
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

    }
    else{
        return <h4>Genre</h4>;
    }
    
};

export default Genres;
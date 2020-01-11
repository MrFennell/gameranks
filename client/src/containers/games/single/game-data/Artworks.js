import React from 'react';

const Artworks = props => {
    const artworks = props.artworks
    if(artworks){
        return (
                <>  
                    {artworks.map(e => (
                        <div key={e.id}>
                            <img
                                src={`https://images.igdb.com/igdb/image/upload/t_thumb/${e.image_id}.jpg`}
                                alt={`Screenshot for ${props.name}`}
                             />
                        </div>
                    ))}
                </>
            )
    }
    else{
        return ''
    }
};

export default Artworks;
import React from 'react';

const ResultThumbnail = (props) => {
    
    if (props.result.cover){
        
        return (
            <img
                src={`https://images.igdb.com/igdb/image/upload/t_cover_uniform/${props.result.cover.image_id}.jpg`}
                alt={props.result.name}
                height='100px'
            />
        )
        
       
    }
    return (
        <div>
            no cover
        </div>
    );
};

export default ResultThumbnail;
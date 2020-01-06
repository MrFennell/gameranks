import React from 'react';

const Screenshots = props => {
    const screenshots = props.screenshots;
    if(screenshots){
        return (
                <>  
                    {screenshots.map(e => (
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

export default Screenshots;
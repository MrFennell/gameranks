import React from 'react';

const MediumThumb = (props) => {
    return (
        <div>
            <img
                className = "thumbnail-medium"
                src={props.src}
                alt={props.alt}
            />
        </div>
    );
};

export default MediumThumb;
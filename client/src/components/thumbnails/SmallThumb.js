import React from 'react';

const SmallThumb = () => {
    return (
            <img
                className = "thumbnail-small"
                src={props.src}
                alt={props.alt}
            />
    );
};

export default SmallThumb;
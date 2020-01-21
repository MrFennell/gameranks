import React from 'react';

const SmallThumb = (props) => {
    return (
            <img
                className="thumbnail-small"
                src={props.src}
                alt={props.alt}
            />
    );
};

export default SmallThumb;
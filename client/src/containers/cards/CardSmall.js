import React from 'react';
import SmallThumb from 'components/thumbnails/SmallThumb';
import LikeToggle from 'containers/cards/buttons/LikeToggle';
import WantToggle from 'containers/cards/buttons/WantToggle';
import OwnToggle from 'containers/cards/buttons/OwnToggle';

const CardSmall = (props) => {
    return (
        <div>
            <div className="image-container">
                <SmallThumb 
                    src={props.src} 
                    alt={props.name}
                />
            
            </div>
            <LikeToggle id={props.id} />
            <WantToggle id={props.id} />
            <OwnToggle id={props.id} />
            <p>{props.name}</p>

        </div>
    );
};

export default CardSmall;
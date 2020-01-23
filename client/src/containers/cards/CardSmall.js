import React, { useState  } from 'react';
import { Link } from 'react-router-dom';

import SmallThumb from 'components/thumbnails/SmallThumb';
import LikeToggle from 'containers/cards/buttons/LikeToggle';
import WantToggle from 'containers/cards/buttons/WantToggle';
import OwnToggle from 'containers/cards/buttons/OwnToggle';
import StarRating from 'containers/cards/buttons/StarRating';

function CardSmall(props) {

    const [isShown, setIsShown] = useState(false)
 
    return (
            <div 
                className="small-card" 
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
            >

                <div className="image-container">
                        <div className={`imageOverlay ${isShown ? 'dimmed' : ''}`}>
                            <SmallThumb 
                                src={props.src} 
                                alt={props.name}
                            />
                        </div>

                        {/* <div className={isShown ? 'input-overlay' : 'hidden'}> */}
                        <div className='input-overlay'>
                            <Link to={{
                                pathname:"/games/game/" + props.slug,
                                state: {
                                    gameId: props.id,
                                    gameName: props.name
                                }
                                }}><p className='small-card-title'>{props.name}</p>
                            </Link>
                            <StarRating />
                            <div className='buttons'>
                                <WantToggle id={props.id} />
                                <OwnToggle id={props.id} />
                                <LikeToggle id={props.id} />
                            </div>
                            {/* <p className='small-card-title'>{props.name}</p> */}
                            
                        </div>

                </div>
                
                
        
            </div>
        );
    
};

export default CardSmall;
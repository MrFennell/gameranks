import React from 'react';
import { FaRegClock } from 'react-icons/fa';

const Want = (props) => {
    return (
        <div className={props.className} style={props.style} >
            <FaRegClock />
        </div>
    );
};

export default Want;
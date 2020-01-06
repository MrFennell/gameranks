import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Played = (props) => {
    return (
        <div className={props.className} style={props.style}>
            <FaCheckCircle />
        </div>
    );
};

export default Played;
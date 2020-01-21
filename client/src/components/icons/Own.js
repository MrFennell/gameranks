import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Own = (props) => {
    return (
        <div className={props.className} style={props.style}>
            <FaCheckCircle />
        </div>
    );
};

export default Own;
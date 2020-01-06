import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';



const Like = (props) => {
    return (
        <div className={props.className} style={props.style}>
            <AiOutlineLike />
        </div>
    );
};

export default Like;
import React from 'react';
import { AiOutlineLike } from 'react-icons/ai';



const Like = (props) => {
    return (
            <AiOutlineLike className={props.className} style={props.style} />
    );
};

export default Like;
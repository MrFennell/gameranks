import React from 'react';


const Platforms = (props) => {
    const platforms = props.platforms;
    return (
        <>
        <h4>Platforms</h4>
            {platforms.map(e => (
                <div key={e.id}>
                    {e.name}
                </div>
            ))}
        </>
    );
};

export default Platforms;
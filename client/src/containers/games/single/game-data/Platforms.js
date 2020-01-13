import React from 'react';


const Platforms = (props) => {
    const platforms = props.platforms;
    if (platforms){
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
    }else{
        return <h4>Platforms</h4>
    }
    
};

export default Platforms;
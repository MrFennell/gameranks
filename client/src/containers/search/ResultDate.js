import React from 'react';

const ResultDate = (props) => {
    
    if (props.result.release_dates){
        const month = props.result.release_dates[0].m;
        const year = props.result.release_dates[0].y;
        const formattedMonth = ("0" + month).slice(-2);

        return <p>{formattedMonth}/{year}</p>
    }
    return (
        <div>
            
        </div>
    );
};

export default ResultDate;
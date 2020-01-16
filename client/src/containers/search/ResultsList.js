import React from 'react';
import { Link } from 'react-router-dom';
const ResultsList = (props) => {
        if (props.results !== []){
            return (
                <>
                
                {props.results.map (result => (
                    
                    <div key={result.id}>
                        <Link  to={{
                            pathname:"/games/game/" + result.slug,
                            state: {
                                gameId: result.id,
                                gameName: result.name
                            }
                            }}>
                            {result.name}
                        </Link>
                    </div>
                    
                       
                
                    )
                )}
            </>
            )
        }
    return <div>No results.</div>
};

export default ResultsList;
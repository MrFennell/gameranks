import React from 'react';
import { Link } from 'react-router-dom';
import ResultThumbnail from './ResultThumbnail';
import ResultDate from './ResultDate';
const ResultsList = (props) => {
        if (props.results !== []){
            return (
                <>
                    {props.results.map (result => (
                        <Link key={result.id} to={{
                            pathname:"/games/game/" + result.slug,
                            state: {
                                gameId: result.id,
                                gameName: result.name
                            }
                        }}>
                            <div className="search-results-list" >
                                <p>{result.name}</p>
                                <ResultThumbnail result={result} />
                                <ResultDate result={result}/>
                            </div>
                        </Link>
                        )
                    )}
                </>
            )
        }
    return <div>No results.</div>
};

export default ResultsList;
import React, { Component } from 'react';
import ResultsList from './ResultsList';

const queryString = require('query-string');


class Results extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            queryObj: {},
            results: [],
            offset: 0,
            query: null
        }
    }
    componentDidMount(){
        this.getSearchResults();
    }

    componentDidUpdate(prevProps){
        if (this.props.location.search !== prevProps.location.search){
             this.getSearchResults();
        }
    }
    async getSearchResults() {
        const parsed = queryString.parse(this.props.location.search);
        const query = parsed.game
        parsed.offset = this.state.offset;
        this.setState({
            queryObj: parsed,
            query: query
        })
        if(parsed){
        await fetch('/api/search/',{
                    method:"POST",
                    body: JSON.stringify({query: parsed}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then (
                        (result) => {
                            this.setState({
                                results: result,
                            });
                        },
                        (errors) => {
                            this.setState({
                                errors,
                            });
                        }
                )
        }

    }
    render() {
        return (
            <div>
                <h2>Showing game results for "{this.state.query}".</h2>
                <ResultsList results={this.state.results} />

            </div>
        )
    }
}

export default Results;
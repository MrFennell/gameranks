import React, { Component } from 'react';
import Suggestions from 'components/topnav/search/Suggestions';
import debounce from 'lodash/debounce';

class Search extends Component {
    constructor(props) {
        super(props);
        
        this.getData = debounce(this.getData, 500);
        this.state = {
            query: '',
            results: [],
            displayResults: false,
            errors: null
        }
    }

    async getData(){
        await fetch('/api/search',{
            method:"POST",
            body: JSON.stringify({query: this.state.query}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then (
                (result) => {
                    this.setState({
                        results: result,
                        displayResults: true
                    });
                },
                (errors) => {
                    this.setState({
                        errors,
                        displayResults: false
                    });
                }
        )
    }

    handleInputChange = () =>{
        this.setState({
            query: this.search.value
        } , () => {
            if (this.state.query && this.state.query.length > 1 ){
                this.getData()
            }else{
                this.setState({
                        results: [],
                        displayResults: false
                    });
            }
            })
        }
    handleInputExit = () => {
        this.setState({
            displayResults: false
        })
    }
    render() {
        return (
            <form>
                <input 
                    placeholder="Search games..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputExit}
                />
                <p>{this.state.query}</p>
                <Suggestions 
                    history={this.props.history} 
                    displayResults={this.state.displayResults} 
                    results={this.state.results} />
            </form>
        );
    }
}

export default Search;

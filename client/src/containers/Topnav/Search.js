import React, { Component } from 'react';
import Suggestions from './Suggestions';
import debounce from 'lodash/debounce';
import {withRouter} from 'react-router-dom'
import Form  from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Search extends Component {
    constructor(props) {
        super(props);
        
        // this.getData = debounce(this.getData, 200);
        
        this.state = {
            query: '',
            results: [],
            displayResults: false,
            errors: null,
            redirect: false
        }
    }
    componentDidUpdate(prevProps){
        if (this.props.location !== prevProps.location){
            this.setState({displayResults: false});
            this.search.value = '';
        }
    }
    async getData(){
        await fetch('/api/search/gameSuggestions',{
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
        
    handleSubmit = () => {
        this.setState({
            query: this.search.value,
            displayResults: false
        })
        this.search.value = '';
        this.props.history.push({
            pathname:'/games/search/:query',
            search: "?game="+this.state.query
        })
    }
    closeSuggestions = () => {
        this.setState({displayResults: false});
        this.search.value = '';
    }
    render() {
        if(this.state.displayResults === false){
            return (
            <Form.Group onSubmit={this.handleSubmit}>
                <Form.Control 
                    placeholder="Search games..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                
                <Button onClick={this.handleSubmit}>Search</Button>
            </Form.Group>
        );
        }
         return (
            <Form.Group onSubmit={this.handleSubmit}>
                <Form.Control 
                    placeholder="Search games..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                
                <Button onClick={this.handleSubmit}>Search</Button>
                <div id="suggestion-container">

                    <Suggestions 
                        history={this.props.history} 
                        displayResults={this.state.displayResults} 
                        results={this.state.results}     
                    />
                    <p className="close-suggestions"onClick={this.closeSuggestions}>close</p>
                </div>
                
            </Form.Group>
        );
    }
}

export default withRouter(Search);

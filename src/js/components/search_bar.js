import React from 'react';
import '../../styles/main.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = { term: '' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onClicked=this.onClicked.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onClicked()
    {
        this.props.onSearchTermChange(this.state.term);
    }

    render(){
        return (
                <div className="searchbar offset-md-4 col-md-4">
                    <div className="input-group">
                        <input type="text" className="form-control search-bar" placeholder="Type to search videos" value={this.state.term} onChange={this.onInputChange}/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" onClick={this.onClicked}>Search</button>
                        </div>
                    </div>            
                </div>   
        );        
    }
}

export default SearchBar;
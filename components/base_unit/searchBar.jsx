import React, { Component } from 'react';

class SearchBar extends Component {
    state = {  
        searchValue: "",
    } 
    render() { 
        return (
            <React.Fragment>
                <div className="search-bar">
                    <input value={this.state.searchValue} onChange={this.handleChange} className='search-bar-input' type="text" placeholder='标题, 关键字' />
                    <i className='search-icon-box'>
                        <svg className="search-icon" viewBox="0 0 512 512"><path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z"/></svg>
                    </i>
                </div>
            </React.Fragment>
        );
    }

    handleChange = (e) => {
        this.setState({searchValue: e.target.value});
    }
}
 
export default SearchBar;
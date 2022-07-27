import React, { Component } from 'react';

class Filter extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <div className='article-filter-container'>
                    <div className="article-filter">
                        <span>
                            <input 
                                type="text" className="form-control" placeholder='搜索文章' 
                                style={{opacity: "80%"}}
                            />
                            <span className='bi bi-search article-filter-search-icon'></span>
                        </span>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default Filter;
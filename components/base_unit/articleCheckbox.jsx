import React, { Component } from 'react';
import styled from 'styled-components';

class ArticleCheckbox extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <ArticleCheckboxStyle>
                    <input onChange={(e) => this.onClickChange(e)} className=" article-checkbox form-check-input" type="checkbox" id='article-checkbox' checked={this.props.isPublic} />
                    <label htmlFor='article-checkbox'>公开</label>
                </ArticleCheckboxStyle>
            </React.Fragment>
        );
    }

    onClickChange = (e) => {
        if(this.props.isPublic) {
            this.props.changeIsPublic(false);
        }
        else {
            this.props.changeIsPublic(true);
        }
    }
}
 
export default ArticleCheckbox;

const ArticleCheckboxStyle = styled.div`
    width: 100%;
    display: flex;
    margin: 20px 0px 0px 0px;
    padding: 0px;
    justify-content: flex-end;
    align-items: center;

    & .article-checkbox {
        margin: 0px 10px 0px 0px;
    }
`;
import React, { Component } from 'react';
import styled from 'styled-components';

class HomeItem extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <HomeItemStyled>
                    <img src={this.props.imageUrl} alt='' />
                </HomeItemStyled>
            </React.Fragment>
        );
    }
}
 

const HomeItemStyled = styled.div`
    width: 100%;
    margin-top: 10px;

    & img {
        max-width: 100%;
        border: 1px solid #E8E8E8;
        border-radius: 5px;
        display: block;
        margin: 0 auto;
    }
`

export default HomeItem;
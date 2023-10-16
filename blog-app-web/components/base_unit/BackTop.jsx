import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

class BackTop extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <BackTopStyle>
                    <div className='scroll-backtop'>
                        <span onClick={e => this.handleClickBackTop(e)} title='回到顶部'>
                            <svg width="48px" height="48px" fill="currentColor" className="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                            </svg>
                        </span>
                    </div>
                </BackTopStyle>
            </React.Fragment>
        );
    }

    handleClickBackTop = (e) => {
        // 回到顶部
        $(document).scrollTop(0);
    }
}
 

const BackTopStyle = styled.div`
    width: calc(100% + 4rem);
    position: absolute;
    display: flex;
    justify-content: flex-end;

    & .scroll-backtop {
        position: fixed;
        margin-left: 200px;
        bottom: 4rem;

        background-color: white;
        width: 48px;
        height: 48px;
        border: 1px solid #6190E8;
        border-radius: 50%;
        box-sizing: border-box;
        box-shadow: 0px 1px 12px 1px #6190E8;
    }

    & span {
        cursor: pointer;
    }

    & svg {
        position: relative;
        right: 1px;
    }

    & path {
        fill: #6190E8;
    }
`

export default BackTop;
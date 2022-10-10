import React, { Component } from 'react';
import styled from 'styled-components';
import $ from "jquery";
import HomeItem from './base_unit/homeItem';
import HomeHead from './base_unit/homehead';
import { requestUrl } from '../API/requestUrl';

class Home extends Component {
    state = {  
        imageList: [],
    } 

    componentDidMount() {
        $.ajax({
            url: `${requestUrl}/image/getHomeImageList/`,
            type: "get",
            
            success: (resp) => {
                if(resp.result === "success") {
                    this.setState({imageList: resp.images});
                }
                else {
                    window.location.href = '/404'; //跳转到404
                }
            }
        });
    }

    render() { 
        return (
            <React.Fragment>
                <HomeStyle>
                    <HomeHead 
                        updateImages = {this.updateImages}
                    />

                    <div className="home-body-images">
                        {
                            this.state.imageList.map((image) => {
                                return (
                                    <HomeItem 
                                        key={parseInt(image.imageId)}
                                        imageUrl = {`${requestUrl}` + image.imageUrl}
                                    />
                                );
                            })
                        }
                    </div>

                </HomeStyle>
            </React.Fragment>
        );
    }

    // 更新图片
    updateImages = () => {
        $.ajax({
            url: `${requestUrl}/image/getHomeImageList/`,
            type: "get",
            
            success: (resp) => {
                if(resp.result === "success") {
                    this.setState({imageList: resp.images});
                }
                else {
                    window.location.href = '/404';
                }
            }
        });
    }
}

export default Home;

const HomeStyle = styled.div.attrs(props => {
    return {
        className: "card",
    }
})`
    & {
        margin: 0 auto;
        min-height: 35rem;
        width: 75%;
        background-color: rgba(255, 255, 255, 10%);
        border: none;
    }

    & .home-body-images {
        width: 100%;
    }
`
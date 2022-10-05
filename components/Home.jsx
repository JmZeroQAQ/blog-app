import React, { Component } from 'react';
import Card from './base_unit/card';
import styled from 'styled-components';
import $ from "jquery";
import HomeItem from './base_unit/homeItem';
import HomeHead from './base_unit/homehead';

class Home extends Component {
    state = {  
        imageList: [],
    } 

    componentDidMount() {
        $.ajax({
            url: "http://150.158.182.65/image/getHomeImageList/",
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
                <Card style={this.getCardStyle()}>
                    <HomeStyle>
                        <HomeHead 
                            updateImages = {this.updateImages}
                        />

                        {
                            this.state.imageList.map((image) => {
                                return (
                                    <HomeItem 
                                        key={parseInt(image.imageId)}
                                        imageUrl = {"http://150.158.182.65" + image.imageUrl}
                                    />
                                );
                            })
                        }
                    </HomeStyle>
                </Card>
            </React.Fragment>
        );
    }

    // 更新图片
    updateImages = () => {
        $.ajax({
            url: "http://150.158.182.65/image/getHomeImageList/",
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

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "75%",
            backgroundColor: "rgba(255, 255, 255, 10%)",
            // boxShadow: "2px 1px 12px #DDDDDD",
            border: "none",
        };

        return style;
    }
}
 
const HomeStyle = styled.div`
    
`

export default Home;
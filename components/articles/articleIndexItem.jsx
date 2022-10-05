import React, { Component } from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import { TOKEN } from '../token/identityToken';
import { checkedSet } from './checkedArticleSet';

class ArticleIndexItem extends Component {
    state = {  
        checked: false,
    }

    componentDidUpdate() {
        this.checkedAll();
    }

    render() { 
        return (
            <React.Fragment>
                <ItemStyle>
                    <td><input onChange={this.handleChangeChecked} checked={this.state.checked} className="form-check-input check-box" type="checkbox" value="" id="flexCheckDefault" /></td>
                    <td><span className='article-title'>{this.props.title}</span></td>
                    <td><span className='article-user'>{this.props.user}</span></td>
                    <td>{this.props.time}</td>
                    <td className='article-backend-table-action'>
                        <i onClick={this.handleClickDelete} title='删除' className="bi bi-x" style={{display: "inline-block", color: "red", fontSize: "32px"}}></i>
                        <i onClick={this.handleClickModify} title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "7px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                    </td>
                </ItemStyle>
            </React.Fragment>
        );
    }

    handleClickDelete = (e) => {
        $.ajax({
            url: "http://150.158.182.65/article/delete/",
            type: "get",
            headers: {
                'authorization': "Bearer " + TOKEN.access_token,
            },

            data: {
                articleId: this.props.aid,
            },
            success: (resp) => {
                if(resp.result === "success") {
                    this.props.updateArticles();
                }
                else {
                    console.log(resp.result);
                }
            }
        })
    }

    handleClickModify = (e) => {
        window.location.href = `/modify/${this.props.aid}`;
    }

    handleChangeChecked = (e) => {
        // 取消选中
        if(this.state.checked) {
            if(checkedSet.has(this.props.aid)) {
                checkedSet.delete(this.props.aid);
            }
        }

        // 选中
        if(!this.state.checked) {
            if(!checkedSet.has(this.props.aid)) {
                checkedSet.add(this.props.aid);
            }
        }

        this.props.updateSelectedLength(checkedSet.getLength());
        
        if(this.props.changeCheckAll !== "normal") {
            this.props.changeCheckAll("normal");
        }

        if(checkedSet.getLength() === this.props.articleCount && !this.props.checked) {
            this.props.changeChecked(true);
        }

        if(checkedSet.getLength() < this.props.articleCount && this.props.checked) {
            this.props.changeChecked(false);
        }
        this.setState({checked: this.state.checked ? false : true});
    }

    checkedAll() {
        if(this.props.checkAll === "checkAll" && !this.state.checked) {
            if(!checkedSet.has(this.props.aid)) {
                checkedSet.add(this.props.aid);
                this.props.updateSelectedLength(checkedSet.getLength());
            }
            this.setState({checked: true});
        }

        if(this.props.checkAll === "cancelAll" && this.state.checked) {
            if(checkedSet.has(this.props.aid)) {
                checkedSet.delete(this.props.aid);
                this.props.updateSelectedLength(checkedSet.getLength());
                this.setState({checked: false});
            }
        }
    }
}
 
const ItemStyle = styled.tr`
    & i {
        cursor: pointer;
    }

    & td {
        line-height: 52px;
        padding: 0px;
    }

    & i:hover{
        transform: scale(1.2);
        transition: 300ms;
    }

    & .article-title {
        color: #212121;
        cursor: pointer;
    }

    & .article-title:hover {
        color: #00A1D9;
        /* border-bottom: 1px solid #89BFCD; */
    }

    & .article-user {
        color: #212121;
        cursor: pointer;
    }

    & .article-user:hover {
        color: #00A1D9;
        /* border-bottom: 1px solid #89BFCD; */
    }

    & .check-box {
        position: relative;
        top: 16px;
        left: 8px
    }

`

export default ArticleIndexItem;
import React, { Component } from 'react';
import styled from 'styled-components';
import ArticleIndexItem from './articleIndexItem';
import $ from 'jquery';
import { checkedSet } from './checkedArticleSet';
import {TOKEN, OnTokenLoad} from '../token/identityToken';
import SearchBar from '../base_unit/searchBar';
import BackTop from '../base_unit/BackTop';
import NoticeToast from '../base_unit/noticeToast';
import { requestUrl } from '../../API/requestUrl';

class ArticleIndex extends Component {
    state = {  
        checked: false,
        checkAll: "normal",
        selectedLength: 0,
        current_count: 0,
        articles: [],
        current_select: 1,
        mode: "normal",
        searchValue: "",
        notice: false,
        noticeMessage: "",
        messageType: "",
    } 

    componentDidMount() {
        checkedSet.Init();
        $(window).on('scroll.index', this.handleScroll);

        OnTokenLoad(() => {
            $.ajax({
                url: `${requestUrl}/article/getlist/`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
                data: {
                    current_count: this.state.current_count,
                },
    
                success: (resp) => {
                    if(resp.result === "success") {
                        this.setState(
                            {
                                articles: [
                                    ...resp.articles,
                                ],
                                current_count: this.state.current_count + parseInt(resp.article_size),
                            }
                        );
                    }
                    else {
                        this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                            }, 3 * 1000);
                        });
                    }
                }
            });
        });
    }

    componentWillUnmount() {
        // 取消对滚动条的监听
        $(window).off('scroll.index');
    }

    render() { 
        return (
            <React.Fragment>
                <ArticleIndexStyle>
                    <div className="article-index col-md-10 col-sm-12">
                        <BackTop />
                        <SearchBar 
                            searchValue={this.state.searchValue}
                            handleChange={this.handleInputChange}
                            onSearch={this.onSearch}
                        />

                        {this.getOperateBox()}
                        <ArticleBackendStyle>
                            <table className="article-index-table table table-striped">
                                <thead>
                                    <tr>
                                        <th className='table-head-select'>
                                            <input onChange={this.handleChangeChecked} checked={this.state.checked} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        </th>
                                        <th className='table-head-title'>标题</th>
                                        {/* <th >作者</th> */}
                                        <th >时间</th>
                                        <th className='table-head-controler'>操作</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {this.state.articles.map(e => {
                                        return (
                                            <ArticleIndexItem 
                                                key={e.aid}
                                                title={e.title}
                                                user={e.author}
                                                time={e.time}
                                                aid={e.aid}
                                                articleCount={this.state.articles.length}
                                                checkAll={this.state.checkAll}
                                                changeCheckAll={this.changeCheckAll}
                                                changeChecked={this.changeChecked}
                                                checked={this.state.checked}
                                                updateSelectedLength={this.updateSelectedLength}
                                                updateArticles={this.updateArticles}
                                            />
                                        );
                                    })}
                                </tbody>

                            </table>
                        </ArticleBackendStyle>
                        </div>
                    {this.getNotice()}
                </ArticleIndexStyle>
            </React.Fragment>
        );
    }

    getNotice() {
        if(this.state.notice) {
            return (
                <NoticeToast 
                    messageType = {this.state.messageType}
                    message = {this.state.noticeMessage}
                    handleClick = {this.handleClickNotice}
                />
            );
        }
    }

    handleClickNotice = () => {
        if(this.state.notice === true)
            this.setState({notice: false});
    }

    // 搜索触发后 执行的函数
    onSearch = () => {
        let mode = this.state.searchValue === "" ? "normal" : "search";

        this.setState({mode: mode, current_count: 0, selectedLength: 0, checkAll: "cancelAll", checked: false}, () => {
            checkedSet.Init();

            $.ajax({
                url: `${requestUrl}/article/search/`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                data: {
                    searchValue: this.state.searchValue,
                    current_count: this.state.current_count,
                },
    
                success: (resp) => {
                    if(resp.result === 'success') {
                        this.setState({
                            articles: [
                                ...resp.articles,
                            ],
                            current_count: this.state.current_count + resp.article_size,
                        });
                    }
                    else {
                        this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                                window.location.reload();// 直接刷新一下吧
                            }, 3 * 1000);
                        });
                    }
                }
            });
        });
    }

    handleInputChange = (e) => {
        this.setState({searchValue: e.target.value});
    }

    getOperateBox() {
        if(this.state.selectedLength) {
            return (
                <React.Fragment>
                    <OperateBoxStyle>
                        <div className="select col-12 col-lg-4">
                            <div className='select-name'><span>已选择: </span></div>
                            <div className='select-message'>{this.state.selectedLength}/{this.state.articles.length}</div>
                        </div>

                        <div className="operator col-12 col-lg-4">
                            <div className="operator-content">
                                <div className='select-name'><span>选择操作: </span></div>

                                <div className="operator-item">
                                    <input onClick={() => this.setState({current_select: 1})} className="form-check-input" type="radio" id='operate-item1' name='operate-item1' readOnly={true} checked={this.state.current_select === 1 ? true : false}/>
                                    <label htmlFor='operate-item1'>删除</label>
                                </div>

                                <div className="operator-item">
                                    <input onClick={() => this.setState({current_select: 2})} className="form-check-input" type="radio" id='operate-item2' name='operate-item2' readOnly={true} checked={this.state.current_select === 2 ? true : false}/>
                                    <label htmlFor='operate-item2'>隐藏</label>
                                </div>

                                <div className="operator-item">
                                    <input onClick={() => this.setState({current_select: 3})} className="form-check-input" type="radio" id='operate-item3' name='operate-item3' readOnly={true} checked={this.state.current_select === 3 ? true : false}/>
                                    <label htmlFor='operate-item3'>公开</label>
                                </div>
                            </div>
                        </div>

                        <div className="select-action col-12 col-lg-4 mb-2 mb-lg-0">
                            <div className="d-flex justify-content-lg-end align-items-center">
                                <div className='select-name'><span>操作: </span></div>
                                <button onClick={e => this.handleClickAction(e)} className='btn btn-primary'>批量修改</button>
                            </div>
                        </div>
                    </OperateBoxStyle>
                </React.Fragment>
            );
        }
    }

    handleClickAction = (e) => {
        let articleIdSet = Array.from(checkedSet.getSet());

        // 删除
        if(this.state.current_select === 1) {
            $.ajax({
                url: `${requestUrl}/article/batchOperate/`,
                type: "post",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },

                data: {
                    operator: "delete",
                    articleIdSet: JSON.stringify(articleIdSet),
                },

                success: (resp) => {
                    if(resp.result === "success") {
                        this.updateArticles();
                        this.setState({notice: true, noticeMessage: "删除成功!", messageType: "normal"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                            }, 3 * 1000);
                        });
                    }
                    else {
                        this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                            }, 3 * 1000);
                        });
                    }
                }
            });
        }

        else if(this.state.current_select === 2) {
            $.ajax({
                url: `${requestUrl}/article/batchOperate/`,
                type: "post",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },

                data: {
                    operator: "self",
                    articleIdSet: JSON.stringify(articleIdSet),
                },

                success: (resp) => {
                    if(resp.result === "success") {
                        this.updateArticles();
                        this.setState({notice: true, noticeMessage: "修改成功", messageType: "normal"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                            }, 3 * 1000);
                        });
                    }
                    else {
                        this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                            }, 3 * 1000);
                        });
                    }
                },
            });
        }

        else if(this.state.current_select === 3) {
            $.ajax({
                url: `${requestUrl}/article/batchOperate/`,
                type: "post",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },

                data: {
                    operator: "all",
                    articleIdSet: JSON.stringify(articleIdSet),
                },

                success: (resp) => {
                    if(resp.result === "success") {
                        this.updateArticles();
                        this.setState({notice: true, noticeMessage: "修改成功", messageType: "normal"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                            }, 3 * 1000);
                        });
                    }
                    else {
                        this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                            setTimeout(() => {
                                this.setState({notice: false});
                            }, 3 * 1000);
                        });
                    }
                },
            });
        }
    }

    handleChangeChecked = (e) => {
        // 取消选中
        let checkAll = "normal";
        // 取消选中
        if(this.state.checked) {
            checkAll = "cancelAll";
        }

        // 选中
        if(!this.state.checked) {
            checkAll = "checkAll";
        }

        this.setState({checked: this.state.checked ? false : true, checkAll: checkAll});
    }

    changeCheckAll = (newstat) => {
        this.setState({checkAll: newstat});
    }

    changeChecked = (newstat) => {
        this.setState({checked: newstat});
    }

    updateSelectedLength = (newLength) => {
        this.setState({selectedLength: newLength});
    }

    // 删除文章后执行, 更新文章列表
    updateArticles = () => {
        this.setState({current_count: 0, searchValue: "", mode: "normal", selectedLength: 0, checkAll: "cancelAll"}, () => {
            checkedSet.Init();
            $.ajax({
                url: `${requestUrl}/article/search/`,
                type: "get",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                data: {
                    searchValue: '',
                    current_count: 0,
                },
    
                success: (resp) => {
                    if(resp.result === 'success') {
                        this.setState({
                            articles: [
                                ...resp.articles,
                            ],
                            current_count: this.state.current_count + resp.article_size,
                        });
                    }
                    else {
                        this.setState({
                            articles: [],
                            current_count: 0,
                        });
                    }
                }
            });
        });
    }

    handleScroll = (e) => {
        if(this.state.articles.length === 0) {
            return ;
        }

        if($(document).scrollTop() >= $(document).height() - $(window).height()) {
            if(this.state.mode === "normal") {
                $.ajax({
                    url: `${requestUrl}/article/getlist/`,
                    type: "get",
                    headers: {
                        'Authorization': "Bearer " + TOKEN.access_token,
                    },
                    data: {
                        current_count: this.state.current_count,
                    },
        
                    success: (resp) => {
                        if(resp.result === "success") {
                            this.setState(
                                {
                                    articles: [
                                        ...this.state.articles,
                                        ...resp.articles,
                                    ],
                                    current_count: this.state.current_count + parseInt(resp.article_size),
                                }
                            );
                        }
                        else {
                            this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                                setTimeout(() => {
                                    this.setState({notice: false});
                                }, 3 * 1000);
                            });
                        }
                    }
                });
            }
            
            else if(this.state.mode === "search") {
                $.ajax({
                    url: `${requestUrl}/article/search/`,
                    type: "get",
                    headers: {
                        'Authorization': "Bearer " + TOKEN.access_token,
                    },
        
                    data: {
                        searchValue: this.state.searchValue,
                        current_count: this.state.current_count,
                    },
        
                    success: (resp) => {
                        if(resp.result === 'success') {
                            this.setState({
                                articles: [
                                    ...this.state.articles,
                                    ...resp.articles,
                                ],
                                current_count: this.state.current_count + resp.article_size,
                            });
                        }
                        else {
                            this.setState({notice: true, noticeMessage: resp.result, messageType: "warning"}, () => {
                                setTimeout(() => {
                                    this.setState({notice: false});
                                }, 3 * 1000);
                            });
                        }
                    }
                });
            }
        }
    }
}

const ArticleIndexStyle = styled.div.attrs(props => {
    return {
        className: "row",
    }
})`
    & .article-index {
        margin: 0 auto;
        min-height: 35rem;
        background-color: white;
        margin-bottom: 2rem;
        border: 1px solid #DDDDDD;
        border-radius: 10px;
        box-shadow: 2px 1px 12px #DDDDDD;
        padding: 30px;
    }

`

const OperateBoxStyle = styled.div.attrs(props => {
    return {
        className: "row align-items-center",
    }
})`
    box-sizing: border-box;
    min-height: 60px;
    border: 2px solid #6190E8;
    border-radius: 10px;
    padding: 0 20px;
    margin-bottom: 20px;

    & .select-name {
        display: inline-block;
        margin-right: 15px;
    }

    & .select-name span {
        font-size: 16px;
        font-weight: 600;
    }

    & .select-message {
        display: inline-block;
        font-size: 16px;
    }

    & .operator-content {
        margin: 0 auto;
    }


    & .operator-item {
        display: inline-block;
        margin-right: 15px;
    }

    & .operator-item input {
        margin-right: 10px;
    }

    & .select-action button {
        background-color: #F15C18;
        border: none;
        padding: auto 0;
        width: 6rem;
    }
`

const ArticleBackendStyle = styled.div`
    & .article-index-table {
        width: 100%;
    }

    & thead tr {
        width: 100%;
        border-bottom: 2px solid black;
    }

    thead>tr th {
        padding: 0;
    }

    & .table-head-select {
        padding-left: 10px;
    }

    & .table-head-title {
        /* width: 45%; */
    }

    & .table-head-controler {
        text-align: center;
    }

    .article-backend-table-action {
        text-align: center;
    }
`

export default ArticleIndex;
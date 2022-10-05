import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../base_unit/card';
import ArticleIndexItem from './articleIndexItem';
import $ from 'jquery';
import { checkedSet } from './checkedArticleSet';
import {TOKEN, OnTokenLoad} from '../token/identityToken';
import SearchBar from '../base_unit/searchBar';
import BackTop from '../base_unit/BackTop';
import NoticeToast from '../base_unit/noticeToast';

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
                url: "http://150.158.182.65/article/getlist/",
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
                <Card style={this.getCardStyle()}>
                    <BackTop />
                    <SearchBar 
                        searchValue={this.state.searchValue}
                        handleChange={this.handleInputChange}
                        onSearch={this.onSearch}
                    />

                    {this.getOperateBox()}
                    <ArticleBackendStyle>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        <input onChange={this.handleChangeChecked} checked={this.state.checked} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </th>
                                    <th >标题</th>
                                    <th >作者</th>
                                    <th >时间</th>
                                    <th >操作</th>
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

                    {this.getNotice()}
                </Card>
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
                url: "http://150.158.182.65/article/search/",
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

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "85%",
            backgroundColor: "rgba(255, 255, 255, 100%)",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }

    getOperateBox() {
        if(this.state.selectedLength) {
            return (
                <React.Fragment>
                    <OperateBoxStyle>
                        <div className="select">
                            <div className='select-name'><span>已选择: </span></div>
                            <div className='select-message'>{this.state.selectedLength}/{this.state.articles.length}</div>
                        </div>

                        <div className="operator">
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

                        <div className="select-action">
                            <div className='select-name'><span>操作: </span></div>
                            <button onClick={e => this.handleClickAction(e)} className='btn btn-primary'>批量修改</button>
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
                url: "http://150.158.182.65/article/batchOperate/",
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
                url: "http://150.158.182.65/article/batchOperate/",
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
                url: "http://150.158.182.65/article/batchOperate/",
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
                url: "http://150.158.182.65/article/search/",
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
                    url: "http://150.158.182.65/article/getlist/",
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
                    url: "http://150.158.182.65/article/search/",
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

const OperateBoxStyle = styled.div`
    box-sizing: border-box;
    height: 60px;
    border: 2px solid #6190E8;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;

    & .select {

    }

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

    & .operator {
        display: inline-block;
        margin: 0 auto;
    }


    & .operator-item {
        display: inline-block;
        margin-right: 15px;
    }

    & .operator-item input {
        margin-right: 10px;
    }

    & .btn {
        display: inline-block;
        margin-right: auto;
        background-color: #F15C18;
        border: none;
        padding: auto 0;
        width: 6rem;
    }
`

const ArticleBackendStyle = styled.div`
    & th {
        border-bottom: 2px solid black;
    }

    thead>tr>th:nth-child(1) {
        width: 5%;
    }

    thead>tr>th:nth-child(2) {
        width: 50%;
    }

    thead>tr>th:nth-child(3) {
        width: 15%;
    }
    thead>tr>th:nth-child(4) {
        width: 15%;
    }
    thead>tr>th:nth-child(5) {
        text-align: center;
    }

    .article-backend-table-action {
        text-align: center;
    }
`

export default ArticleIndex;
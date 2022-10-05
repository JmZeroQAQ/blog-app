import React, { Component } from 'react';
import Card from '../base_unit/card';
import BaseEditor from '../base_unit/baseEditor';
import $ from 'jquery';
import { TOKEN, OnTokenLoad } from '../token/identityToken';
import NoticeToast from './../base_unit/noticeToast';
import PreviewModal from '../base_unit/previewModal';
import { PREVIEW_MODAL } from '../base_unit/Modal/previewModal';
import { shortcutKey, placeholder } from '../base_unit/markDown/setting';
import EditorResizable from './editorResizable';
import { useParams } from 'react-router-dom';
import ArticleCheckbox from './../base_unit/articleCheckbox';
import { User } from '../base_unit/User/userInfo';

class ArticleModify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: "",
            notice: false,
            errorNotice: false,
            errorMessage: "",
            editorHeight: 416,
            preview: false,
            load: false,
            isPublic: true,
            storageButton: true,
            submitButton: true,
        }

        OnTokenLoad(() => {
            $.ajax({
                url: "http://150.158.182.65/article/get/",
                type: "get",
                data: {
                    articleId: this.props.params.article_id,
                },
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                success: (resp) => {
                    if(resp.result === "success") {
                        let title = resp.title;
                        let keywords = resp.keywords;
                        let content = resp.content;
    
                        this.setState({textValue: content, load: true, isPublic: resp.visible === "all"}, () => {
                            $('.articleEditor-title').val(title);
                            $('.articleEditor-keywords').val(keywords);
                        });
                    }
                    else {
                        window.location.href = '/404';
                    }
                }
            });
        })
        
    }

    render() { 
        return (
            <React.Fragment>
                {this.getContent()}
            </React.Fragment>
        );
    }

    // 改变编辑器高度API
    changeEditorHeight = (dy) => {
        this.setState({editorHeight: this.state.editorHeight + dy});
    }

    getContent() {
        if(this.state.load) {
            return (
                <Card style={this.getCardStyle()}>
                    <div onKeyDown={(e) => this.handleKeydownPreview(e)} style={{outline: "none"}} tabIndex='-1' className="article-editor">
                        <div className="article-editor-head row">
                            <div className="article-editor-head-title col-md-7">
                                <input type="text" className="form-control articleEditor-title" placeholder='标题' maxLength={30} />
                            </div>

                            <div className="article-editor-head-keyword col-md-5">
                                <input type="text" className="form-control articleEditor-keywords" placeholder='关键字, 逗号隔开' maxLength={30} />
                            </div>
                        </div>

                        <div className="article-editor-body">
                            <div style={this.getEditorContainerStyle()} className="artcile-editor-body-container">
                                <div style={{height: "100%"}} className="article-editor-body-textEditor">
                                    <BaseEditor 
                                        newref={this.refArticleEditor}
                                        theme='solarized_light'
                                        mode='markdown'
                                        fontSize={18}
                                        value={this.state.textValue}
                                        width='100%'
                                        height={`${this.state.editorHeight - 14}px`}
                                        wrapEnabled={false}
                                        onEditorChange={this.onEditorChange}
                                        shortcutKey={shortcutKey}
                                        placeholder={placeholder}
                                    />

                                    <EditorResizable 
                                        changeEditorHeight={this.changeEditorHeight}
                                        editorHeight={this.state.editorHeight}
                                    />

                                </div>
                            </div>

                            <ArticleCheckbox 
                                changeIsPublic={this.changeIsPublic}
                                isPublic={this.state.isPublic}
                            />

                            <div className="article-editor-body-button">
                                <button onClick={this.handleClickStorage} className='article-editor-btn-storage'>保存</button>
                                <button onClick={this.handleClickSubmit} className='article-editor-btn-submit'>修改</button>
                            </div>

                        </div>
                    </div>

                    {this.getNotice()}
                    {this.getErrorNotice()}

                    {this.getPreview()}
                </Card>
            );
        }
    }

    changeIsPublic = (flag) => {
        this.setState({isPublic: flag});
    }

    getPreview() {
        if(this.state.preview)
            return (
                <PreviewModal
                    content={this.state.textValue}
                    offPreview={this.offPreview}
                    handleClickStorage={this.handleClickStorage}
                    handleClickSubmit={this.handleClickSubmit}
                    mode="modify"
                />
            );
    }

    // 预览框的状态
    offPreview = () => {
        this.setState({preview: false});
    }

    getNotice() {
        if(this.state.notice) {
            return (
                <NoticeToast 
                    message = {"保存成功"}
                    handleClick = {this.handleClickNotice}
                />
            );
        }
    }

    getErrorNotice() {
        if(this.state.errorNotice)
            return (
                <NoticeToast 
                    messageType="warning"
                    message={this.state.errorMessage}
                    handleClick = {this.handleClickErrorNotice}
                />
            );
    }

    // 关闭通知
    handleClickErrorNotice = () => {
        if(this.state.errorNotice === true)
            this.setState({errorNotice: false});
    }

    onEditorChange = (res) => {
        this.setState({textValue: res});
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "70%",
            backgroundColor: "rgba(255, 255, 255, 75%)",
            boxShadow: "2px 1px 12px #DDDDDD",
        };

        return style;
    }

    getEditorContainerStyle() {
        let style = {
            height: `${this.state.editorHeight.toString()}px`,
            border: "2px solid #D2D2D2",
            boxSizing: "border-box",
            borderRadius: "0px 0px 5px 5px",
            backgroundColor: "#FBF1D3",
        }

        return style;
    }

    getBrief() {
        let str = this.state.textValue + '\n';
        str = str.substring(0, Math.min(str.length, 120));

        let brief = str.replace(/[`#*[\]{}~><()@]/g, "");
        brief = brief.trim();

        return brief;
    }


    handleClickSubmit = () => {
        if(this.state.submitButton) {
            $('.article-editor-btn-submit').css("cursor", "not-allowed");
            this.setState({submitButton: false});

            let title = $('.articleEditor-title').val();
            let keywords = $('.articleEditor-keywords').val();
            let content = this.state.textValue + '\n';
            let brief = this.getBrief();
            let visible = this.state.isPublic ? "all" : "self";
    
            $.ajax({
                url: "http://150.158.182.65/article/modify/",
                type: "post",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                data: {
                    articleId: this.props.params.article_id,
                    title,
                    content,
                    keywords,
                    brief,
                    visible,
                },
    
                success: (res) => {
                    if(res.result !== "success") {
                        console.log(res);
                        if(this.state.errorNotice === false) {
                            this.setState({errorNotice: true, errorMessage: res.result});
                            setTimeout(() => {
                                $('.article-editor-btn-submit').css("cursor", "pointer");
                                this.setState({errorNotice: false, submitButton: true});
                            }, 2 * 1000); // unit: ms
                        }
                    }
                    else {
                        // success
                        $('.article-editor-btn-submit').css("cursor", "pointer");
                        let username = User.getUserName();
                        window.location.href = `/article/${username}/${this.props.params.article_id}/`;
                    }
                },
            });
        }
    }

    handleClickStorage = () => {
        if(this.state.storageButton) {
            $('.article-editor-btn-storage').css("cursor", "not-allowed");
            this.setState({storageButton: false, notice: true},
                () => {
                    setTimeout(() => {
                        this.setState({storageButton: true, notice: false})
                        $('.article-editor-btn-storage').css("cursor", "pointer");
                    }, 0.8 * 1000);  
                }
            );
            
            let title = $('.articleEditor-title').val();
            let keywords = $('.articleEditor-keywords').val();

            localStorage.setItem("EditorTitle", title)
            localStorage.setItem("Editorkeywords", keywords);
            localStorage.setItem("EditorValue", this.state.textValue);
        }
    }

    handleClickNotice = () => {
        if(this.state.notice === true)
            this.setState({notice: false});
    }

    // 打开预览
    handleKeydownPreview = (e) => {
        if(e.ctrlKey && e.key === 'q') {
            // setState callback 当渲染完成后调用
            this.setState({preview: true}, () => PREVIEW_MODAL.showModal());
        }
    }
}

// eslint-disable-next-line
export default props => (
    <ArticleModify 
        {...props}
        params={useParams()}
    />
);
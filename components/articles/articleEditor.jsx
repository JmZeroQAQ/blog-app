import React, { Component } from 'react';
import BaseEditor from '../base_unit/baseEditor';
import $ from 'jquery';
import { TOKEN } from '../token/identityToken';
import NoticeToast from './../base_unit/noticeToast';
import PreviewModal from '../base_unit/previewModal';
import { PREVIEW_MODAL } from '../base_unit/Modal/previewModal';
import { shortcutKey, placeholder } from '../base_unit/markDown/setting';
import EditorResizable from './editorResizable';
import ArticleCheckbox from '../base_unit/articleCheckbox';
import { User } from '../base_unit/User/userInfo';
import { requestUrl } from '../../API/requestUrl';
import styled from 'styled-components';

class TextEditor extends Component {
    state = {  
        textValue: "",
        notice: false,
        errorNotice: false,
        errorMessage: "",
        editorHeight: 380, //编辑器高度
        preview: false,
        isPublic: true,
        storageButton: true,
        submitButton: true,
        isUnloadNotice: false,
    } 
    // 编辑器的实例对象
    refArticleEditor = React.createRef();

    componentDidMount() {
        // 设置文章列表标题
        document.title="新建文章";

        // 设置退出提醒
        window.onbeforeunload = (e) => {
            if(this.state.isUnloadNotice) {
                return "编辑器数据未保存,是否退出?";
            }
        }

        $('.navbar-create').addClass("active");

        let title, keywords, textValue;

        title = localStorage.getItem("EditorTitle") || "";
        keywords = localStorage.getItem("Editorkeywords") || "";
        textValue = localStorage.getItem("EditorValue") || "";

        // localStorage.removeItem("EditorTitle");
        // localStorage.removeItem("Editorkeywords");
        // localStorage.removeItem("EditorValue");

        $('.articleEditor-title').val(title);
        $('.articleEditor-keywords').val(keywords);
        this.setState({textValue: textValue}, () => {
            // 当上次保存的内容加载完后，选中所有内容
            let e = this.refArticleEditor.current.editor;
            e.selectAll();
        });
    }

    componentWillUnmount() {
        $('.navbar-create').removeClass("active");
        window.onbeforeunload = null; // 移除事件的监听
    }

    render() { 
        return (
            <React.Fragment>
                <TextEditorStyle>
                    <div onKeyDown={(e) => this.handleKeydownPreview(e)} tabIndex='-1' className="article-editor">
                        <div className="article-editor-head row">
                            <div className="article-editor-head-title col-md-7 col-sm-12 col-xs-12">
                                <input type="text" className="form-control articleEditor-title" placeholder='标题' maxLength={20} />
                            </div>

                            <div className="article-editor-head-keyword col-md-5 col-sm-12 col-xs-12 mt-2 mt-md-0">
                                <input type="text" className="form-control articleEditor-keywords" placeholder='关键字, 逗号隔开' maxLength={12} />
                            </div>
                        </div>

                        <div className="article-editor-body">
                            <div style={this.getEditorContainerStyle()} className="artcile-editor-body-container">
                                <div onPaste={this.handlePaste} style={{height: "100%"}} className="article-editor-body-textEditor">
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
                                <div className="row justify-content-end px-2">
                                    <button onClick={this.handleClickStorage} className='me-md-3 col-md-2 col-sm-12 col-xs-12 article-editor-btn-storage'>保存</button>
                                    <button onClick={this.handleClickSubmit} className='mt-sm-2 mt-2 mt-md-0 col-md-2 col-sm-12 col-xs-12 article-editor-btn-submit'>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.getNotice()}
                    {this.getErrorNotice()}
                    {this.getPreview()}
                </TextEditorStyle>
            </React.Fragment>
        );
    }

    // 实现图片粘贴
    handlePaste = (e) => {
        let image = e.clipboardData.files[0];
        if(!image) {
            return ;
        }

        let imageName = image.name;
        let imageType = imageName.split('.');
        let imageSize = image.size;
        imageType = imageType[1];

        if(imageType !== "png" && imageType !== "jpg" && imageType !== 'gif' && imageType !== "jpeg") {
            return ;
        }

        if (imageSize <= 1 * 1024 * 1024) { // Unit: MB
            let data = new FormData();
            data.append("file", image);

            $.ajax({
                url: `${requestUrl}/image/articleImageUpload/`,
                type: "post",
                headers:{
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
                data: data,
                processData: false,
                contentType: false,

                success: (resp) => {
                    if(resp.result === "success") {
                        let imageUrl = `${requestUrl}` + resp.imageUrl;
                        imageUrl = `![](${imageUrl})` ;
                        let editor = this.refArticleEditor.current.editor;
                        editor.insert(imageUrl);
                    }
                    else {
                        this.setState({errorNotice: true, errorMessage: "粘贴图片失败!"}, () => {
                            setTimeout(() => {
                                this.setState({errorNotice: false})
                            }, 3 * 1000)
                        });
                    }
                }
            });
        }
    }

    changeIsPublic = (flag) => {
        this.setState({isPublic: flag});
    }

    changeEditorHeight = (dy) => {
        this.setState({editorHeight: this.state.editorHeight + dy});
    }

    getPreview() {
        if(this.state.preview)
            return (
                <PreviewModal
                    content={this.state.textValue}
                    offPreview={this.offPreview}
                    handleClickStorage={this.handleClickStorage}
                    handleClickSubmit={this.handleClickSubmit}
                />
            );
    }

    // 预览框的状态
    offPreview = () => {
        this.setState({preview: false});
    }

    getNotice() {
        let message = "保存成功!";

        if(this.state.notice) {
            return (
                <NoticeToast 
                    message = {message}
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

    handleClickErrorNotice = () => {
        if(this.state.errorNotice === true)
            this.setState({errorNotice: false});
    }

    onEditorChange = (res) => {
        if(this.state.isUnloadNotice === false) {
            this.setState({textValue: res, isUnloadNotice: true});
            return ;
        }

        this.setState({textValue: res});
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
        // str = str.substring(0, Math.min(str.indexOf('\n'), 120));
        str = str.substring(0, Math.min(str.length, 120));

        let brief = str.replace(/[`#*[\]{}~><()@]/g, "");
        brief = brief.trim();

        return brief;
    }

    // 提交button
    handleClickSubmit = () => {
        if(this.state.submitButton) {
            $('.article-editor-btn-submit').css("cursor", "not-allowed");
            this.setState({submitButton: false, isUnloadNotice: false});

            let title = $('.articleEditor-title').val();
            let keywords = $('.articleEditor-keywords').val();
            let content = this.state.textValue + '\n';
            let brief = this.getBrief();
            let visible = this.state.isPublic ? "all" : "self";
    
            $.ajax({
                url: `${requestUrl}/article/create/`,
                type: "post",
                headers: {
                    'Authorization': "Bearer " + TOKEN.access_token,
                },
    
                data: {
                    title,
                    content,
                    keywords,
                    brief,
                    visible,
                },
    
                success: (res) => {
                    if(res.result !== "success") {
                        if(this.state.errorNotice === false) {
                            this.setState({errorNotice: true, errorMessage: res.result});
                            setTimeout(() => {
                                $('.article-editor-btn-submit').css("cursor", "pointer");
                                this.setState({errorNotice: false, submitButton: true});
                            }, 2 * 1000); // unit: ms
                        }
                    }
                    else {
                        $('.article-editor-btn-submit').css("cursor", "pointer");
                        let articleId = res.articleId;
                        if(articleId !== '') {
                            let username = User.getUserName();
                            window.location.href = `/article/${username}/${articleId}/`;
                        }
                    }
                },
            });
        }
    }

    // 保存button
    handleClickStorage = () => {
        if(this.state.storageButton) {
            $('.article-editor-btn-storage').css("cursor", "not-allowed");

            this.setState({storageButton: false, notice: true, isUnloadNotice: false},
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

export default TextEditor;

const TextEditorStyle = styled.div.attrs((props) => {
    return {
        className: "card col-md-10 col-xs-12 col-sm-12 round shadow",
    };
})`
    & {
        margin: 0 auto;
        padding: 10px;
    }

    & .article-editor {
        outline: none;
    }
`
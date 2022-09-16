import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../base_unit/card';
import BaseEditor from '../base_unit/baseEditor';
import $ from 'jquery';
import { TOKEN } from '../token/identityToken';
import NoticeToast from './../base_unit/noticeToast';
import PreviewModal from '../base_unit/previewModal';
import { PREVIEW_MODAL } from '../base_unit/Modal/previewModal';
import { shortcutKey, placeholder } from '../base_unit/markDown/setting';
import EditorResizable from './editorResizable';

class TextEditor extends Component {
    state = {  
        textValue: "",
        notice: false,
        errorNotice: false,
        errorMessage: "",
        editorHeight: 416,
        preview: false,
    } 
    // 编辑器的实例对象
    refArticleEditor = React.createRef();

    componentDidMount() {
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

    render() { 
        return (
            <React.Fragment>
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

                            <div className="article-editor-body-button">
                                <button onClick={this.handleClickStorage} className='article-editor-btn-storage'>保存</button>
                                <button onClick={this.handleClickSubmit} className='article-editor-btn-submit'>{this.props.mode ? "修改": "提交"}</button>
                            </div>

                        </div>
                    </div>

                    {this.getNotice()}
                    {this.getErrorNotice()}

                    {this.getPreview()}
                </Card>
            </React.Fragment>
        );
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
        let message = this.props.mode ? "修改成功" : "保存成功!";

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
        str = str.substring(0, Math.min(str.indexOf('\n'), 60));

        let brief = str.replace(/[`#*[\]{}~><()@]/g, "");
        brief = brief.trim();

        return brief;
    }


    handleClickSubmit = () => {
        let title = $('.articleEditor-title').val();
        let keywords = $('.articleEditor-keywords').val();
        let content = this.state.textValue + '\n';
        let brief = this.getBrief();
        let visible = "self";

        $.ajax({
            url: "http://192.168.43.142/article/create/",
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
                        this.setState({errorNotice: true, errorMessage: "提交失败!"});
                        setTimeout(() => {
                            this.setState({errorNotice: false});
                        }, 5 * 1000); // unit: ms
                    }
                }
                else {
                    let articleId = res.articleId;
                    if(articleId !== '') {
                        let username = this.props.userInfo.username;
                        window.location.href = `/article/${username}/${articleId}/`;
                    }
                }
            },
        });
    }

    handleClickStorage = () => {
        let title = $('.articleEditor-title').val();
        let keywords = $('.articleEditor-keywords').val();

        localStorage.setItem("EditorTitle", title)
        localStorage.setItem("Editorkeywords", keywords);
        localStorage.setItem("EditorValue", this.state.textValue);

        if(this.state.notice === false) {
            this.setState({notice: true});
            setTimeout(() => {
                this.setState({notice: false});
        }, 5 * 1000); //单位: ms
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

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo,
    };
}

export default connect(mapStateToProps) (TextEditor);
import React, { Component } from 'react';
import Card from '../base_unit/card';
import BaseEditor from '../base_unit/baseEditor';
import $ from 'jquery';
import { TOKEN } from '../token/identityToken';
import NoticeToast from './../base_unit/noticeToast';
import PreviewModal from '../base_unit/previewModal';

class TextEditor extends Component {
    state = {  
        flush: true,
        notice: false,
        errorNotice: false,
        errorMessage: "",
    } 

    textValue = "";

    componentDidMount() {
        if(localStorage.getItem("EditorTitle")) {
            $('.articleEditor-title').val(localStorage.getItem("EditorTitle"));
        }

        if(localStorage.getItem("Editorkeywords")) {
            $('.articleEditor-keywords').val(localStorage.getItem("Editorkeywords"));
        }

        if(localStorage.getItem("EditorValue")) {
            this.textValue = localStorage.getItem("EditorValue");
        }

        // localStorage.removeItem("EditorTitle");
        // localStorage.removeItem("Editorkeywords");
        // localStorage.removeItem("EditorValue");

        this.setState({flush: true});
    }

    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <div className="article-editor">
                        <div className="article-editor-head row">
                            <div className="article-editor-head-title col-md-7">
                                <input type="text" className="form-control articleEditor-title" placeholder='标题' maxLength={30} />
                            </div>

                            <div className="article-editor-head-keyword col-md-5">
                                <input type="text" className="form-control articleEditor-keywords" placeholder='关键字, 逗号隔开' maxLength={30} />
                            </div>
                        </div>

                        <div className="article-editor-body">
                            <div className="artcile-editor-body-container">
                                <div className="article-editor-body-textEditor">
                                    <BaseEditor 
                                        theme='solarized_light'
                                        mode='markdown'
                                        fontSize={18}
                                        width='100%'
                                        height='calc(100% - 10px)'
                                        wrapEnabled={false}
                                        onEditorChange={this.onEditorChange}
                                        value={this.textValue}
                                    />
                                    <div className="resizable">

                                    </div>

                                </div>
                            </div>

                            <div className="article-editor-body-button">
                                <button onClick={this.handleClickStorage} className='article-editor-btn-storage'>保存</button>
                                <button onClick={this.handleClickSubmit} className='article-editor-btn-submit'>提交</button>
                            </div>

                        </div>
                    </div>

                    {this.getNotice()}
                    {this.getErrorNotice()}
                    
                    <PreviewModal
                        content={this.textValue}
                    />
                </Card>
            </React.Fragment>
        );
    }

    getNotice() {
        if(this.state.notice) {
            return (
                <NoticeToast 
                    message = "保存成功"
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
        this.textValue = res;
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

    getBrief() {
        let str = this.textValue + '\n';
        str = str.substring(0, Math.min(str.indexOf('\n'), 60));

        let brief = str.replace(/[`#*[\]{}~><()@]/g, "");
        brief = brief.trim();

        return brief;
    }

    handleClickSubmit = () => {
        let title = $('.articleEditor-title').val();
        let keywords = $('.articleEditor-keywords').val();
        let content = this.textValue + '\n';
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
            },
        });
    }

    handleClickStorage = () => {
        let title = $('.articleEditor-title').val();
        let keywords = $('.articleEditor-keywords').val();

        localStorage.setItem("EditorTitle", title)
        localStorage.setItem("Editorkeywords", keywords);
        localStorage.setItem("EditorValue", this.textValue);

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
}

export default TextEditor;
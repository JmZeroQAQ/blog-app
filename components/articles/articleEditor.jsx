import React, { Component } from 'react';
import Card from '../base_unit/card';
import BaseEditor from '../base_unit/baseEditor';

class TextEditor extends Component {
    state = {  } 

    textValue = "";

    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <div className="article-editor">
                        <div className="article-editor-head row">
                            <div className="article-editor-head-title col-md-7">
                                <input type="text" className="form-control" placeholder='标题' maxLength={25} />
                            </div>

                            <div className="article-editor-head-keyword col-md-5">
                                <input type="text" className="form-control" placeholder='关键字, 逗号隔开' maxLength={13} />
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
                                <button className='article-editor-btn-storage'>保存</button>
                                <button className='article-editor-btn-submit'>提交</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </React.Fragment>
        );
    }

    onEditorChange = (res) => {
        this.textValue = res;
        console.log(res);
    }

    getCardStyle = () => {
        const style = {
            margin: "0 auto",
            minHeight: "35rem",
            width: "70%",
            backgroundColor: "rgba(255, 255, 255, 75%)",
        };

        return style;
    }
}

export default TextEditor;
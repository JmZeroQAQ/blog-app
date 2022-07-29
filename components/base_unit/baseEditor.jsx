import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';


import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-tomorrow';


class BaseEditor extends Component {
    state = {  
        settings: {   }
    } 

    render() { 
        return (
            <React.Fragment>
                <AceEditor
                    placeholder={this.props.placeholder || "请输入内容,支持markdown语法"}
                    // 代码格式
                    mode={this.props.mode || 'markdown'}
                    // 主题
                    theme={this.props.theme || "solarized_light"}
                    // 内容变化时执行的回调函数
                    onChange={(e) => this.props.onEditorChange(e)}
                    name="articleEditor"
                    //字体大小
                    fontSize={this.props.fontSize || 18}
                    // 宽度
                    width={this.props.width || '100%'}
                    height={this.props.height || '100%'}
                    // 显示行号
                    showLineNumbers={this.props.showLineNumbers || true}
                    // 是否自动补全
                    wrapEnabled={this.props.wrapEnabled || true}
                    enableLiveAutocompletion={this.props.enableLiveAutocompletion || false}
                />
            </React.Fragment>
        );
    }
}
 
export default BaseEditor;
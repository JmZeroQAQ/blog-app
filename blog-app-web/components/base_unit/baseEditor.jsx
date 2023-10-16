import React, { Component } from 'react';
import AceEditor from 'react-ace';
import $ from 'jquery';
import 'ace-builds/src-noconflict/mode-markdown';
// import 'ace-builds/src-noconflict/mode-c_cpp';
// import 'ace-builds/src-noconflict/mode-python';

import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/keybinding-vscode';

// 自动补全
import 'ace-builds/src-noconflict/ext-language_tools';

//自动提词
// import 'ace-builds/src-noconflict/snippets/markdown';

// 自动引用所有插件，主题，代码mode
// import 'ace-builds/webpack-resolver';

// 菜单 <Ctrl + ,>
// import 'ace-builds/src-noconflict/ext-settings_menu';


import 'ace-builds/src-noconflict/theme-solarized_light';
// import 'ace-builds/src-noconflict/theme-tomorrow';
// import 'ace-builds/src-noconflict/theme-textmate';


class BaseEditor extends Component {
    state = {  } 
    refAceEditor = React.createRef();
    componentDidMount() {
        $('.article-editor-body-textEditor').on('keydown', (e) => {
            if(e.ctrlKey && e.key === 's') {
                // e.preventDefault();
                return false;
            }

            if(e.ctrlKey && e.key === 'k') {
                // e.preventDefault();
                return false;
            }
        });
    }

    render() { 
        return (
            <React.Fragment>
                <AceEditor
                    ref={this.props.newref}
                    commands={this.props.shortcutKey}
                    placeholder={this.props.placeholder}
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
                    //  隐藏编辑框灰色竖线
                    showPrintMargin={false}
                    // 是否自动补全
                    wrapEnabled={this.props.wrapEnabled || true}

                    value={this.props.value}
                    editorProps={{$blockScrolling: true}}

                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                    }}
                />
            </React.Fragment>
        );
    }
}
 
export default BaseEditor;
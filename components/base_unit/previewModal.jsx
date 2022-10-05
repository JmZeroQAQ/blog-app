import React, { Component } from 'react';
import DisplayMarkDown from './../articles/displayMarkdown';
import { PREVIEW_MODAL} from '../base_unit/Modal/previewModal';

class PreviewModal extends Component {
    state = {  
        articleContent: "",
    } 

    componentDidMount() {
        this.setState({articleContent: this.props.content.length < 90000 ? this.props.content : "# 文章内容过长"});
    }

    render() { 
        return (
            <React.Fragment>
                <div onKeyDown={(e) => this.handleKeyDownPreview(e)} tabIndex='-1' className="modal fade" id="previewModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl" style={{marginTop: "10px"}}>
                        <div className="modal-content" style={{width: "95%", margin: "0 auto", minHeight: "100%"}}>
                            <div className="modal-header">
                                <h3 className="modal-title" style={{fontSize: "18px", fontWeight: "bold"}}>预览</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body modal-editor-preview markdown-body" tabIndex={0} style={{outline: "none"}}>
                                <DisplayMarkDown 
                                    article = {this.state.articleContent}
                                />
                            </div>
                            <div className="modal-footer">
                                <button onClick={this.props.handleClickStorage} className='article-editor-btn-storage' style={{width: "12%"}}>保存</button>
                                <button onClick={this.props.handleClickSubmit} className='article-editor-btn-submit' style={{width: "12%"}}>{this.props.mode !== 'modify' ? "保存" : "修改"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    handleKeyDownPreview = (e) => {
        if(e.ctrlKey && e.key === 'q') {
            PREVIEW_MODAL.hideModal();
            // 移除鱼篮框
            setTimeout(() => this.props.offPreview(), 0.2 * 1000);
        }
    }
}
 
export default PreviewModal;
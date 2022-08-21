import React, { Component } from 'react';
import DisplayMarkDown from './../articles/displayMarkdown';

class PreviewModal extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#previewModal">
                Launch
            </button>

                <div className="modal fade" id="previewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable modal-xl" style={{marginTop: "10px"}}>
                        <div className="modal-content" style={{width: "95%", margin: "0 auto", minHeight: "100%"}}>
                            <div className="modal-header">
                                <h3 className="modal-title" style={{fontSize: "18px", fontWeight: "bold"}}>预览</h3>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body modal-editor-preview" tabIndex={0} style={{outline: "none"}}>
                                <DisplayMarkDown 
                                    article = {this.props.content}
                                />
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">提交</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default PreviewModal;
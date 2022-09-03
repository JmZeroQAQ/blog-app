import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../base_unit/card';

class ArticleBackend extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <Card style={this.getCardStyle()}>
                    <ArticleBackendStyle>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </th>
                                    <th >标题</th>
                                    <th >作者</th>
                                    <th >时间</th>
                                    <th >操作</th>
                                </tr>
                            </thead>
                        
                            <tbody>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                                    <td>文章1</td>
                                    <td>Mogu</td>
                                    <td>2022年</td>
                                    <td className='article-backend-table-action'>
                                        <i title='删除' className="bi bi-x" style={{color: "red", fontSize: "32px"}}></i>
                                        <i title='修改' className="bi bi-pencil-fill" style={{display: "inline-block", position: "relative", bottom: "6px", color: "blue", width: "32px", height: "32px", fontSize: "16px"}}></i>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                        
                        <div>
                            <nav aria-label="Page navigation">
                                <ul className="pagination" style={{justifyContent: "flex-end"}}>
                                    <li className="page-item">
                                        <a className="page-link" href="/" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                        </a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="/">1</a></li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="/" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </ArticleBackendStyle>
                </Card>
            </React.Fragment>
        );
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
}

const ArticleBackendStyle = styled.div`
    & th {
        border-bottom: 2px solid black;
    }

    & td {
        height: 2rem;
        line-height: 2rem;
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

export default ArticleBackend;
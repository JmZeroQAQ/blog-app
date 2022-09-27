import React, { Component } from 'react';
import NavBar from './navBar';
import BackGround from './background';
import { Route, Routes, Navigate} from 'react-router-dom'; 
import Login from './login';
import Article from './article';
import Home from './Home';
import NotFound from './notFound';
import ArticleContent from './articles/articleContent';
import TextEditor from './articles/articleEditor';
import { GetLocalStorage } from '../getLocalStorage/getLocalStorage';
import ArticleIndex from './articles/articleIndex';
import ArticleModify from './articles/articleModify';
import PictureBed from './pictureBed';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
        GetLocalStorage();
    }

    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <Login />
                <BackGround />
                <div className="container" style={this.get_container_style()}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/article' element={<Article />} />
                        <Route path='/picturebed' element={<PictureBed />} />
                        <Route path= '/article/index' element={ <ArticleIndex />} />
                        <Route path='/textEditor' element={<TextEditor />} />
                        <Route path='/modify/:article_id' element={<ArticleModify mode='modify' />} />
                        <Route path='/article/:user/:article_id' element={<ArticleContent />} />
                        <Route path='/404' element={<NotFound />} />
                        <Route path='*' element={<Navigate replace to='/404' />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }

    get_container_style = () => {
        const style = {
            marginTop: "calc(3.8rem + 15px)",
            minHeight: "42rem",
        }

        return style;
    }
}
 
export default App;
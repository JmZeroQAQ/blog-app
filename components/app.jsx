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
                        <Route path='/textEditor' element={<TextEditor />} />
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
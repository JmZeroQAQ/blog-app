import React, { Component } from 'react';
import NavBar from './navBar';
import BackGround from './background';
import { Route, Routes, Navigate} from 'react-router-dom'; 
import Article from './article';
import Home from './Home';
import Login from './login';
import NotFound from './notFound';

class App extends Component {
    state = {  } 
    render() { 
        return (
            <React.Fragment>
                <NavBar />
                <BackGround />
                <div className="container" style={this.get_container_style()}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/article' element={<Article />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/404' element={<NotFound />} />
                        <Route path='*' element={<Navigate replace to='/404' />} />
                    </Routes>
                </div>
            </React.Fragment>
        );
    }

    get_container_style = () => {
        const style = {
            marginTop: "15px",
            minHeight: "42rem",
        }

        return style;
    }
}
 
export default App;
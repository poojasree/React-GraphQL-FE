import React from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import AddBook from './AddBook.jsx';

class Mutation extends React.Component{

    render(){
        return(
            <HashRouter>
            <div>
                <h1>Mutation operations</h1>        
                <div>
                    <ul class="header">
                        <li><NavLink to="/AddBook">Add Book</NavLink></li>
                    </ul>
                </div>
                <div class="content">
                    <Route path="/AddBook" component={AddBook}/>
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Mutation;
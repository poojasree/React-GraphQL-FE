import React from 'react';
import {Route, NavLink, BrowserRouter} from 'react-router-dom';
import Query from './Query.jsx';
import Mutation from './Mutation.jsx';

class GraphQL extends React.Component{

    render(){
        return(
            <BrowserRouter>
            <div>  
                <div>
                    <ul class="headermain">
                        <li><NavLink to="/Query">Query the existing User/Book/Address info</NavLink></li>
                        <li><NavLink to="/Mutation">Add new Book info</NavLink></li>
                    </ul>
                </div>
                <div class="contentmain">
                    <Route path="/Query" component={Query}/>
                    <Route path="/Mutation" component={Mutation}/>
                </div>
            </div>
            </BrowserRouter>
        );
    }
}

export default GraphQL;
import React from 'react';
import {Route, NavLink, HashRouter, Link} from 'react-router-dom';
import BookQuery from './BookQuery.jsx';
import AddressQuery from './AddressQuery.jsx';
import UserQuery from './UserQuery.jsx';

class Query extends React.Component{

    render(){
        return(
            <HashRouter>
            <div>
                <h1>Query operations</h1>        
                <div>
                    <ul class="header">
                        <li><NavLink to="/BookQuery">GetBookInfo</NavLink></li>
                        <li><NavLink to="/Address">GetAddressInfo</NavLink></li>
                        <li><NavLink to="/User">GetUserInfo</NavLink></li>
                    </ul>
                </div>
                <div class="content">
                    <Route path="/BookQuery" component={BookQuery}/>
                    <Route path="/Address" component={AddressQuery}/>
                    <Route path="/User" component={UserQuery}/>
                </div>
            </div>
            </HashRouter>
        );
    }
}

export default Query;
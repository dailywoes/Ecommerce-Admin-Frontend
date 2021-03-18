/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the App.js file where the application starts after index.js.
 */

//libraries
import {useDispatch, useSelector} from "react-redux";
import {Route, Switch} from 'react-router-dom';
import React, {useEffect} from 'react';

//class objects
import PrivateRoute from './components/HOC/privateroute';
import Products from './containers/Products';
import Category from './containers/Category';
import {getInitialData, isUserLoggedIn} from "./actions";
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Orders from './containers/Orders';
import Home from './containers/Home';
import './App.css';

function App() {
    //gets authentication parameters from the state
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //checks if the user is currently logged in
    useEffect(() => {
        if (!auth.authenticate) {
                dispatch(isUserLoggedIn());
        }
        dispatch(getInitialData());
    }, []);

    return (
        <div className="App">
            <Switch>
                {/*Private routes require an admin to be logged in to access*/}
                <PrivateRoute path='/admin' exact component={Home}/>
                <PrivateRoute path='/admin/products' component={Products}/>
                <PrivateRoute path='/admin/category' component={Category}/>
                <PrivateRoute path='/admin/orders' component={Orders}/>
                {/*These routes are public access*/}
                <Route path='/admin/signin' component={Signin}/>
                <Route path='/admin/signup' component={Signup}/>
            </Switch>
        </div>
    );
}

export default App;

import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Orders from './containers/Orders';
import Products from './containers/Products';
import Category from './containers/Category';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/privateroute';
import {useDispatch, useSelector} from "react-redux";
import {isUserLoggedIn} from "./actions";

function App() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        if (!auth.authenticate) {
                dispatch(isUserLoggedIn());
        }
    }, []);

    return (
        <div className="App">
            <Switch>
                <PrivateRoute path='/admin' exact component={Home}/>
                <PrivateRoute path='/admin/products' component={Products}/>
                <PrivateRoute path='/admin/orders' component={Orders}/>
                <PrivateRoute path='/admin/category' component={Category}/>
                <Route path='/admin/signin' component={Signin}/>
                <Route path='/admin/signup' component={Signup}/>
            </Switch>
        </div>
    );
}

export default App;

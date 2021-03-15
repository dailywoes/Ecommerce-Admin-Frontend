
import React from "react";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest}) => {
    // eslint-disable-next-line react/jsx-no-undef
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        if(token){
            return <Component {...props} />
        }else{
            return <Redirect to={'/admin/signin'} />
        }

    }} />
}

export default PrivateRoute;
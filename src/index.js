/*
Author: John Tex
Email: johnrteixeira@gmail.com
Description: This is the index of the react project.
 */

//libraries
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

//class objects
import store from './store';
import App from './App';
import './index.css';

window.store = store;

//This is required for all React.js projects
ReactDOM.render(
    //Application store is for attaching the reducers and redux middleware
    <Provider store={store}>
        {/*Application is contained within the routing object */}
        <Router>
            <React.StrictMode>
                {/*This is where the application begins */}
                <App />
            </React.StrictMode>
        </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

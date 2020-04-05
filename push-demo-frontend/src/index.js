import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WS from "./components/WS";
import SSE from "./components/SSE";
const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path='/' component={WS}/>
            <Route path='/sse' component={SSE}/>

        </Switch>
    </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

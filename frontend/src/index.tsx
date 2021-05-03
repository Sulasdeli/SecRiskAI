import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "rsuite/dist/styles/rsuite-default.min.css";

import "./assets/scss/light-bootstrap-dashboard-react.scss";

import {User} from "./layouts/User";
import {Provider} from "react-redux";
import {store} from "./reducers/store";


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/user" render={(props: any) => <User {...props} />}/>
                <Redirect from="/" to="/user/dashboard"/>
            </Switch>
        </BrowserRouter>
    </Provider>
    ,
    document.getElementById('root')
);

import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,Redirect } from "react-router-dom";

import indexRoutes from "routes/index.jsx";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./rootReducer";
import thunk from "redux-thunk";

import "assets/scss/material-dashboard-pro-react.css?v=1.4.0";

const hist = createBrowserHistory();
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Router history={hist}>
        <Provider store={store}>
            <Switch>
                <Redirect exact from="/"  to="/pages/login-page"/>
                {indexRoutes.map((prop, key) => {
                    return <Route path={prop.path} component={prop.component} key={key} />;
                })}

            </Switch>

        </Provider>
    </Router>,
    document.getElementById("root")
);


import React from 'react';
import { Route } from 'react-router';

import BaseContainer from "./containers/BaseContainer.js";
import LoginContainer from "./containers/LoginContainer.js";
import RegisterContainer from "./containers/RegisterContainer.js";
import HomeContainer from "./containers/HomeContainer.js";
import EntryContainer from "./containers/EntryContainer.js";
import IndexPageContainer from "./containers/IndexPageContainer/IndexPageContainer.js";

export const routes = [

    {
        component: BaseContainer,
        routes: [
            {
                path: '/login',
                component: LoginContainer
            },
            {
                path: '/register',
                component: RegisterContainer
            },
            {
                path: '/home',
                component: HomeContainer
            },
            {
                path: "/journal/:id",
                component: EntryContainer,
            },
            {
                exact: true, strict: true,
                path: '/',
                component: IndexPageContainer,
            },
        ]
    },

]

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
    )} />
)
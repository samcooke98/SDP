
import React from 'react';
import { Route } from 'react-router';

import BaseContainer from "./containers/BaseContainer.js";
import LoginContainer from "./containers/LoginContainer.js";
import RegisterContainer from "./containers/RegisterContainer.js";
import HomeContainer from "./containers/HomeContainer.js";
import EntryContainer from "./containers/EntryContainer.js";
import IndexPageContainer from "./containers/IndexPageContainer/IndexPageContainer.js";
import EntryViewContainer from "./containers/EntryViewContainer.js";
import NewEntryContainer from "./containers/NewEntryContainer.js"
import Redirector from "./containers/Redirector.js";

export const routes = [
    {
        path: "/",
        component: BaseContainer,
        routes: [
            {
                exact: true,
                path: '/home',
                component: HomeContainer
            },
            {
                path: "/journal/:id",
                exact: true,
                component: Redirector,
            },
            {
                path: "/journal/:id/:entry",
                component: EntryContainer,
                routes: [
                    {
                        path: "/journal/:id/new",
                        exact: true,
                        component: NewEntryContainer
                    },
                    {
                        path: "/journal/:id/:entry",
                        exact: true,
                        component: EntryViewContainer,
                    },
                    {
                        path: "/journal/:id/:entry/:revision",
                        exact: true,
                        component: EntryViewContainer,
                    },
                ]
            },
            {
                path: "/",
                // exact: true,
                component: IndexPageContainer,
                routes: [
                    {
                        path: "/login",
                        exact: true,
                        component: LoginContainer
                    },
                    {
                        path: "/register",
                        exact: true,
                        component: RegisterContainer
                    },
                    {
                        path: "/",
                        exact: true,
                        component: () => null
                    }
                ]
            },

            // {
            //     exact: true, strict: true,
            //     path: '/',
            //     component: IndexPageContainer,
            // },
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
const map = (routes) => routes.map((route, i) => (<RouteWithSubRoutes key={i} {...route} />))

{/* {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))} */}
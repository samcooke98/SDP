
import React from 'react';
import { Route } from 'react-router';

import BaseContainer from "./containers/BaseContainer.js";
import LoginContainer from "./containers/LoginContainer.js";
import RegisterContainer from "./containers/RegisterContainer.js";
import HomeContainer from "./containers/HomeContainer.js";
import EntryContainer from "./containers/EntryContainer.js";
import IndexPageContainer from "./containers/IndexPageContainer/IndexPageContainer.js";
import EditorContainer from "./containers/EditorContainer.js";
import NewEntryContainer from "./containers/NewEntryContainer.js"
export const routes = [


    {
        component: BaseContainer,
        routes: [
            {
                exact: true,
                path: '/home',
                component: HomeContainer
            },
            {
                path: "/journal/:id",
                component: EntryContainer,
                routes: [
                    {
                        path: "/journal/:id",
                        exact: true, strict: true,
                        component: () => <div> Pick an entry to the left </div>,
                    },
                    {
                        path: "/journal/:id/new",
                        exact: true,
                        component: NewEntryContainer
                    },
                    {
                        path: "/journal/:id/:entry",
                        exact: true,
                        component: EditorContainer,
                    }
                ]
            },
            {
                path: "/",
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
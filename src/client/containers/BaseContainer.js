/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter,Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

import { Layout } from "react-toolbox/lib/layout";

import { RouteWithSubRoutes } from "../Routes.js";

import Titlebar from "../components/Titlebar"

class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column' }} >
                <Titlebar />
                <Switch>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedIn: state.misc.loggedIn
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseContainer));

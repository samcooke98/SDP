/*
* Base Container - This renders the titlebar, and whatever route should be active. 
*/
import React from "react";
import { withRouter, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";

import { RouteWithSubRoutes } from "../Routes.js";

import Titlebar from "../components/Titlebar/Titlebar.js"

class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let username;
        if (this.props.loggedIn) {
            username = this.props.user.name;
        }
        else {
            username = null;
        }

        return (
            <div style={{ minHeight: '100vh', maxHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column' }} >
                    <Titlebar username={username} loggedIn={this.props.loggedIn} />
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
        loggedIn: state.misc.loggedIn,
        user: state.data.users[state.misc.userID]
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

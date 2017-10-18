/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../components/Button/Button.js"

import styles from "./web.css";
import { RouteWithSubRoutes } from "../../Routes.js"

class BaseContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{
                flex: 1,
                backgroundImage: 'url(' + require('./kelly-jean-200248.jpg') + ')',
                backgroundSize: 'cover',
                paddingLeft: "96px",
                display: 'flex',
                flexDirection: "column"
            }} >
                <div className={styles.content}>
                    <h1> The Best Online Journal </h1>
                    <hr />
                    <p className={styles.home}>Take your journal to the cloud</p>
                    <div style={{ height: '109px' }} />
                    <Button 
                        style={{ marginLeft: "auto", marginRight: "auto", marginBottom: "36" }} 
                        height={80} width={282} 
                        variant='primary' 
                        label="Join Now" size='large'c fontSize="36px" 
                        onClick={() => this.props.history.push('/register')} />
                    <hr style={{ width: "200px" }} />
                    <Button style={{ marginLeft: "auto", marginRight: "auto", marginTop: "36", fontSize: "36px" }} height={55} width={263} variant='secondary' label="Login" size='medium' onClick={() => this.props.history.push('/login')} />
                </div>
                {this.props.routes.map(((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                )))}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
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

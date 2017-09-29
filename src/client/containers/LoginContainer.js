/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import TextInput from "../components/TextInput/TextInput.js";
import Button from "../components/Button/Button.js";
import Modal from "../components/Modal/Modal.js";

import { login } from "../redux/actions.js";


//TODO: Handle redirecting to original location! 

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            //TODO: Handle redirecting to original location! 
            this.props.history.push("/home");
        }
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({ [name]: value })
    }

    submitForm = (evt) => {
        evt.preventDefault();
        this.props.login(this.state.email, this.state.password)
    }

    //Handle Errors and Success
    componentWillReceiveProps(nextProps) {
        console.log("Received Props");
        if (nextProps.loggedIn)
            this.props.history.push(this.props.location.state.referrer);
    }

    render() {
        console.log(this.props.location);
        return (
            <Modal label="LOGIN" onClose={() => this.props.history.push("/")} >
                <form onSubmit={this.submitForm}>
                    <TextInput label="Email:" name="email" value={this.state.email} onChange={this.handleChange} />
                    <TextInput label="Password: " name="password" type='password' value={this.state.password} onChange={this.handleChange} />
                    <Button label='login' width="256px" height="48px" />
                </form>
                {this.props.loggedIn && <Link to="/home">Go to home </Link>}
            </Modal>
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
        login: (user, pass) => { dispatch(login(user, pass)) }
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));

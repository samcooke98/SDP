/*
* Container for /register
*/
import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import TextInput from "../components/TextInput/TextInput.js";
import Button from "../components/Button/Button.js";
import Modal from "../components/Modal/Modal.js";

import { createUser } from "../redux/actions.js"
import isEmail from 'validator/lib/isEmail';


class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: { value: "", error: "" },
            password: { value: "", error: "" },
            passwordConfirm: { value: "", error: "" },
            email: { value: "", error: "" },
            success: '',
        }
    }

    genErrors = () => {

        let isErrors = false;
        //Passwords must match
        if (this.state.password.value !== this.state.passwordConfirm.value) {
            this.setState({
                password: { value: this.state.password.value, error: "Oops! Your passwords don't seem to match. " },
                passwordConfirm: { value: this.state.passwordConfirm.value, error: "Oops! Your passwords don't seem to match." }
            })
            isErrors = true;
        } else {
            this.setState({
                password: { value: this.state.password.value, error: "" },
                passwordConfirm: { value: this.state.passwordConfirm.value, error: "" },
            })
        }
        //Email must be valid
        if (!isEmail(this.state.email.value)) {
            isErrors = true;
            console.log("Setting State");
            this.setState({ email: { value: this.state.email.value, error: "This doesn't look like an email" } });
        } else {
            this.setState({ email: { value: this.state.email.value, error: "" } });
        }
        //Name Can't be null
        if (this.state.name.value == "") {
            isErrors = true;
            this.setState({ name: { value: this.state.name.value, error: "This can't be nothing!" } })
        } else {
            this.setState({ name: { value: this.state.name.value, error: "" } })
        }

        return isErrors;
    }

    submit = (evt) => {
        evt.preventDefault();

        if (this.genErrors() == false) {

            this.props.register(
                this.state.name.value,
                this.state.email.value,
                this.state.password.value
            )
        } else {
            console.log("errors can't submit")
        }
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({ [name]: { value, error: this.state[name].error } })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ msg: nextProps.message.message, success: nextProps.success })

    }

    render() {

        return (
            <Modal label='REGISTRATION' onClose={() => this.props.history.push('/')}>
                {this.props.loggedIn && <Redirect to="/home" />}
                <form onSubmit={this.submit}>
                    {this.state.msg && <h3 style={{textAlign: 'center', color: '#ff0033'}}>{this.state.msg}</h3 >}
                    <TextInput type='text' label="Name" name='name' value={this.state.name.value} onChange={this.handleChange} error={this.state.name.error} />

                    <TextInput type='text' label="Email" name='email' value={this.state.email.value} onChange={this.handleChange} error={this.state.email.error} />

                    <TextInput type='password' label="Password" name='password' value={this.state.password.value} onChange={this.handleChange} error={this.state.password.error} />
                    <TextInput type='password' label="Confirm Password" name='passwordConfirm' value={this.state.passwordConfirm.value} onChange={this.handleChange} error={this.state.passwordConfirm.error} />

                    <Button label="Submit" width="260px" height="54px" variant='primary' />
                </form>
            </Modal>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        success: state.ui.registrationSuccess,
        message: state.ui.registrationFail,
        loggedIn: state.misc.loggedIn,
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        register: (name, email, password) => dispatch(createUser(name, email, password))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));

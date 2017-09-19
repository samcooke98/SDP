/*
* Container for /register
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextInput from "../components/TextInput/TextInput.js";
import Button from "../components/Button/Button.js";
import Modal from "../components/Modal/Modal.js";

import { createUser } from "../redux/actions.js"

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: "",
            passwordConfirm: "",
            email: "",
            success: '',
        }
    }

    submit = (evt) => {
        evt.preventDefault();
        this.props.register(this.state.name, this.state.email, this.state.password)
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({ [name]: value })
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.success != undefined && this.state.success == '') {
            this.setState({ success: nextProps.success })
        }
    }

    render() {
        return (
            <Modal label='REGISTRATION' onClick={() => this.props.history.push('/')}>

                <form onSubmit={this.submit}>
                    {this.state.success && <p>Success</p>}
                    <TextInput type='text' label="Name" name='name' value={this.state.name} onChange={this.handleChange} />

                    <TextInput type='text' label="Email" name='email' value={this.state.email} onChange={this.handleChange} />

                    <TextInput type='text' label="Password" name='password' value={this.state.password} onChange={this.handleChange} />
                    <TextInput type='text' label="Confirm Password" name='passwordConfirm' value={this.state.passwordConfirm} onChange={this.handleChange} />

                    <Button label="Submit" width="260px" height="54px" variant='primary' />
                </form>
            </Modal>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        success: state.ui.registrationSuccess,
        message: state.ui.registrationFail
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

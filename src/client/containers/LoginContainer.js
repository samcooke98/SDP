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

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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

    render() {
        //Ideally, these would be all componenets, and this would have no control on the visuals
        return (
            <div style={{
                flex: 1,
                backgroundImage: 'url(' + require('./IndexPageContainer/kelly-jean-200248.jpg') + ')',
                backgroundSize: 'cover',
                paddingLeft: "96px",
                paddingRight: "96px",
                display: 'flex',
                flexDirection: "column",
                justifyContent: 'center',
            }} >
                <Modal label="LOGIN">
                    <form onSubmit={this.submitForm}>
                        <TextInput label="Email:" name="email" value={this.state.email} onChange={this.handleChange} />
                        <TextInput label="Password: " name="password" type='password' value={this.state.password} onChange={this.handleChange} />
                        <Button label='login' />
                    </form>
                    {this.props.loggedIn && <Link to="/home">Go to home </Link>}
                </Modal>
            </div >
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

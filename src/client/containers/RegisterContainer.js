/*
* Container for /register
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import TextInput from "../components/TextInput/TextInput.js";
import Button from "../components/Button/Button.js";
import Modal from "../components/Modal/Modal.js";

class RegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            password: "",
            passwordConfirm: "",
            email: ""
        }
    }

    submit = (evt) => {
        evt.preventDefault();
        this.props.register()
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({ [name]: value })
    }

    render() {
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
                <Modal label='REGISTRATION' onClick={() => this.props.history.push('/')}>
                    
                <form onSubmit={this.submit}>
                        <TextInput type='text' label="Name" name='name' value={this.state.name} onChange={this.handleChange} />

                        <TextInput type='text' label="Email" name='email' value={this.state.email} onChange={this.handleChange} />

                        <TextInput type='text' label="Password" name='password' value={this.state.password} onChange={this.handleChange} />
                        <TextInput type='text' label="Confirm Password" name='passwordConfirm' value={this.state.passwordConfirm} onChange={this.handleChange} />

                        <Button label="Submit" width="260px" height="54px" variant='primary' />
                    </form>
                </Modal>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));

import React from "react";
import styles from "./web.css";

export default class Text extends React.Component {
    render() {
        return (
            <p> {this.props.text} </p>
        )

    }

    someFunc = () => {
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}

TextInput.defaultProps = { 
    type: "text" 
}


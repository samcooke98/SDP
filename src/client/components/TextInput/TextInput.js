import React from "react";
import styles from "./web.css";

export default class TextInput extends React.Component {
    render() {
        return (
            <div className={styles.inputContainer} style={this.props.style}>
                <p> {this.props.label} </p>
                <input type={this.props.type} onChange={this.props.onChange} name={this.props.name} value={this.props.value} />
                {this.props.right}
            </div>
        )

    }

    onChange(evt) {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({ [name]: value })
    }
}

TextInput.onChange = function(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({ [name]: value })
}

TextInput.defaultProps = { type: "text" }


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
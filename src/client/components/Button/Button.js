import React from "react";
import styles from "./web.css";

export default class Button extends React.Component {
    render() {
        var styleClass = styles.baseBtn
        styleClass += " " + styles[this.props.variant]

        return (
            <button 
                onClick={this.props.onClick} 
                style={ Object.assign(
                    {
                        display: 'block', marginLeft: "auto", marginRight: 'auto', 
                        width: this.props.width, 
                        height: this.props.height, 
                        backgroundColor: this.props.colour || ''
                    }, this.props.style) }
                className={ styleClass }
            >
                <p> {this.props.label}</p>
            </button>
        )

    }

    someFunc = () => {
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}

Button.defaultProps  = { 
    variant: "primary"
}

//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
//You could call this file {ComponentName}.js as well, but you would have to ensure your imports are correct

import React from "react";
import style from "./web.css"

export default class FloatingButton extends React.Component {
    render() {
        return (
            <div 
                className={ style[this.props.shape] + " " + style.floatBtn}
                style= {
                    {
                        cursor: "pointer",
                        backgroundColor: this.props.colour,
                        color: this.props.color,
                        bottom: this.props.bottom,
                        right: this.props.right,
                        width: this.props.width,
                        height: this.props.height
                    }
                }
                onClick={this.props.onClick}
            >
            <span style={{textAlign: "center", verticalAlign: "middle", lineHeight: "55px",fontSize: "40px"}}>
                {this.props.children}
            </span>
            </div>
        )

    }

    someFunc = () => {
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}

FloatingButton.defaultProps = { 
    colour: "#2F80ED",
    shape: 'round'
}

//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
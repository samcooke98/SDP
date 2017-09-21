import React from "react";
import styles from "./web.css";

export default class Text extends React.Component {
    render() {
        console.log(this.props)
        return (
            <this.props.tag style={{fontFamily: "Raleway, sans-serif"}}> {this.props.text || this.props.children} </this.props.tag>
        )

    }
}

Text.defaultProps = { 
    type: "text",
    tag: 'p'
}


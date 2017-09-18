import React from "react";
import styles from "./web.css";

export default class ControlButton extends React.Component {
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={styles.controlBtn}
            >
                <p> {this.props.label}</p>
            </div>
        )

    }

}

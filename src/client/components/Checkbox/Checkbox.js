import React from "react";
import styles from "./web.css";

export default class Checkbox extends React.Component {
    render() {
        return (
            <label
                htmlFor={this.id}
                className={styles.label}
            >
                <input
                    id={this.id}
                    type="checkbox"
                    className={styles.checkbox}
                />
                {this.props.title}
            </label>
        )

    }
}
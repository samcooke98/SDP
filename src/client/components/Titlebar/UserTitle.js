import React from "react";

import styles from "./web.css";
import User from "react-icons/lib/fa/User";

export default class UserTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.user}>
                <span>
                    <User className={styles.usericon} />
                    <span>{this.props.username}</span>
                </span>
            </div>
        )
    }
}
import React from "react";
import styles from "./web.css";

import Close from "react-icons/lib/md/close"

export default class Modal extends React.Component {
    render() {
        return (
            <div className={styles.modal}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        <h2>{this.props.label}</h2>
                        <Close height={32} width={32} onClick={this.props.onClose} />
                    </div><div className={styles.content}>
                        {this.props.children}
                    </div>
                </div>
            </div>

        )

    }

    someFunc = () => {
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
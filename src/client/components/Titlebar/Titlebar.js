//You could call this file {ComponentName}.js as well, but you would have to ensure your imports are correct

import React from "react";
import styles from "./web.css";

import User from "react-icons/lib/fa/User";

export default class Titlebar extends React.Component{ 
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div className={styles.titlebar}> 
                <h1>Scriptum</h1>
                <div className={styles.user}>
                    <span>
                        <User className={styles.usericon} />
                        <span>{this.props.username}</span>
                    </span>
                </div>
            </div> 
        )

    }

    someFunc = () => { 
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}

const UserTitle = (props) => {
    return (
        <span>{this.props.username}</span>
    )
}


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
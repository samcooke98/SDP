//You could call this file {ComponentName}.js as well, but you would have to ensure your imports are correct

import React from "react";
import styles from "./web.css";

import UserTitle from "./UserTitle.js";

export default class Titlebar extends React.Component{ 
    constructor(props) {
        super(props);
    }

    render() { 
        return (
            <div className={styles.titlebar}> 
                <h1>Scriptum</h1>
                {this.props.loggedIn && <UserTitle username={this.props.username} />}
            </div> 
        )

    }
}

// const UserTitle = (props) => {
//     return (
//         <span>{this.props.username}</span>
//     )
// }


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
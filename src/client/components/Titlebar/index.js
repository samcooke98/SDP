//You could call this file {ComponentName}.js as well, but you would have to ensure your imports are correct

import React from "react";
import styles from "./web.css";

export default class HelloWorld extends React.Component{ 
    render() { 
        return (
            <div className={styles.titlebar}> 
                <h1>Scriptum</h1> 
            </div> 
        )

    }

    someFunc = () => { 
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
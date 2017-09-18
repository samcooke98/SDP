import React from "react";
import styles from "./web.css";


import Menu from "react-icons/lib/fa/ellipsis-v";

import SVG from "./MyComponent.js";

export default class JournalButton extends React.Component {


    render() {
        return (
            <div onClick={this.props.onPress} className={styles.journalbtn}>
                {/* <object data={require("./book.svg")} style={{fill: 'red'}}/>  */}
                <SVG height="140" width="100" colour="Red" />
                <div style={{ display: 'flex' }}>
                    <span>
                        <h3 className={styles.journalTitle}> {this.props.title} </h3>
                        <p className={styles.caption}>Last Edited: {this.props.date}</p>
                    </span>
                    <Menu />

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


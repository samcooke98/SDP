//You could call this file {ComponentName}.js as well, but you would have to ensure your imports are correct

import React from "react";
import style from "./web.css"

import Arrow from "react-icons/lib/md/keyboard-arrow-right.js"

export default class JournalBar extends React.Component {
    render() {
        return (
            <div style={{
                display: "flex",
                height: "60px",
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: "8px",
                cursor: "pointer",
                backgroundColor: this.props.active ? "#f1f1f1" : ""
            }}
                onClick={this.props.onClick}
            >
                <div style={{ width: "240px", height: "60px" }}>
                    <p className={style.title}> {this.props.title} </p>
                    <p className={style.caption}> {this.props.caption} </p>
                </div>
                <span style={{ width: "48px" }}>
                    <Arrow height={48} width={48} />
                </span>
            </div>
        )

    }
}


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
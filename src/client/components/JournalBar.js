//You could call this file {ComponentName}.js as well, but you would have to ensure your imports are correct

import React from "react";

import BackArrow from "react-icons/lib/md/arrow-back.js"

export default class JournalBar extends React.Component {
    render() {
        return (
            <div style={{
                backgroundColor: this.props.colour,
                paddingLeft: "12px",
                paddingRight: "12px",
                alignItems: 'center',
                display: 'flex'
            }}>
                <span style={{ display: "flex", alignItems: "center", width: "300px" }} onClick={this.props.arrowClick}>
                    <BackArrow height={39} width={39} />
                    <p style={{ marginLeft: "6px", fontSize: "20px", fontFamily: "Raleway", textTransform: "uppercase", margin: 0 }}>
                        Back to Journals
                    </p>
                </span>
                <span style={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
                    <h1 style={{color: "#F8F8F8", textTransform: "uppercase", fontFamily: "Raleway"}}>
                        {this.props.title || ''}
                    </h1>
                </span>
            </div>
        )

    }

    someFunc = () => {
        //'This' is automatically bound when writing functions like this
        return JSON.stringify(this.props);
    }
}


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
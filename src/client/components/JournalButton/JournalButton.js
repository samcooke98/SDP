import React from "react";
import styles from "./web.css";
import moment from 'moment';

import Menu from "react-icons/lib/fa/ellipsis-v";

import Text from "../Text/Text.js";
import SVG from "./MyComponent.js";

export default class JournalButton extends React.Component {


    render() {
        console.log(this.props);
        return (
            <div className={styles.journalWrap}>
                <div style={{cursor: "pointer"}} onClick={this.props.onPress} className={styles.journalbtn}>
                    {/* <object data={require("./book.svg")} style={{fill: 'red'}}/>  */}
                    <SVG height="140" width="100" colour={this.props.colour} />
                    <div style={{ display: 'flex', width: '100%', justifyContent: "center", alignItems: "center"}}>
                        <span style={{ textAlign: 'center', flexGrow: 1 }}>
                            <Text tag='h3'> {this.props.title} </Text>
                            <Text>Created: {moment(this.props.date).format("DD/MM/YYYY")} </Text>
                        </span>
                        <span style={{ width: 0, overflow: 'visible' }}>
                            <Menu height={32} width={32} onClick={(evt) => { console.log("OPEN MENU TODO"); evt.stopPropagation() }}
                                style={{ position: 'relative', right: "32px" }}
                            />
                        </span>
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


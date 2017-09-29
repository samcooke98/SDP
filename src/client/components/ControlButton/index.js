import React from "react";
import styles from "./web.css";

export default class ControlButton extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div
                onMouseDown={(evt) => {
                    evt.preventDefault();
                    this.props.onClick(evt); 
                }
                }
                className={styles.controlBtn + " " + ( this.props.active ? styles.active : "")}
            >
                {this.props.children}
            </div>
        )

    }

}

import React from "react";
import styles from "./web.css";

export default class ControlButton extends React.Component {
    render() {
        return (
            <div
                onMouseDown={(evt) => {
                    evt.preventDefault();
                    this.props.onClick(evt); 

                }
                }
                className={styles.controlBtn}
            >
                {this.props.children}
            </div>
        )

    }

}

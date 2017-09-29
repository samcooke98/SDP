import React from "react";
import styles from "./web.css";

import Close from "react-icons/lib/md/close"

export default class Modal extends React.Component {
    componentWillMount() { 
        console.log("add event listener");
        try { 
            document.addEventListener("keydown", this.handleEscape);
        } catch(err) { 
            //Do nothing - It errors on the Server, as document isn't defined
        }
    }

    componentWillUnmount() { 
        document && document.removeEventListener("keydown", this.handleEscape);
    }

    render() {
        return (
            <div className={styles.modal} onKeyPress={this.handleEscape}>
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

    handleEscape = (evt) => { 
        if(evt.keyCode === 27) { 
            this.props.onClose();
        }
    }


}


//In addition to CSS modules, you may wish to use: https://github.com/gajus/react-css-modules
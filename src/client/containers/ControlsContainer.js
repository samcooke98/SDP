//Container of all the buttons to toggle controls for Text-Editing

import React from "react";


import ControlButton from "../components/ControlButton";

import Bold from "react-icons/lib/fa/bold";
import Italic from "react-icons/lib/fa/italic";
import Underline from "react-icons/lib/fa/underline";
import History from "react-icons/lib/fa/history"

const elementMap = [
    {
        action: "bold",
        component: <Bold />
    },
    {
        action: "italic",
        component: <Italic />
    },
    {
        action: "underline",
        component: <Underline />
    }
]

export default class ControlsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bold: false,

        }
    }
    render() {
        console.log(this.props);
        return (
            <div style={{
                flexGrow: 0, height: "100%", width: "100px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 4px 2px", zIndex: 1,
                display: 'flex', flexDirection: "column", cursor: "pointer"
            }}>
                {elementMap.map((value) => makeElement(this, value.component, value.action), this)}
                {
                    this.props.showHistory &&

                    <ControlButton
                        onClick={this.props.onHistory}
                        active={false}
                        style={{ marginTop: 'auto' }}
                    >
                        <History />
                    </ControlButton>
                }
            </div >
        )
    }
}

const onClick = (action) => (function () {
    this.props.toggleControl(action.toUpperCase());
    this.setState({ [action]: !this.state.action })
})

const makeElement = (that, icon, action) => (
    <ControlButton
        onClick={onClick(action).bind(that)}
        active={(that.props.inlineStyles || []).includes(action.toUpperCase())}
    >
        {icon}
    </ControlButton>
)
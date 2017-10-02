//Container of all the buttons to toggle controls for Text-Editing

import React from "react";


import ControlButton from "../components/ControlButton";

import Bold from "react-icons/lib/fa/Bold";
import Italic from "react-icons/lib/fa/Italic";
import Underline from "react-icons/lib/fa/Underline";

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
                flexGrow: 0,height:"100%", width: "100px", boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 4px 2px", zIndex: 1, cursor: "pointer"
            }}>
                {elementMap.map((value) => makeElement(this, value.component, value.action), this)}
            </div>
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
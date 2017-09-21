//Container of all the buttons to toggle controls for Text-Editing

import React from "react";


import ControlButton from "../components/ControlButton";

import Bold from "react-icons/lib/fa/Bold";
import Italic from "react-icons/lib/fa/Italic";
import Underline from "react-icons/lib/fa/Underline";

const elementMap = [
    {
        action: "bold",
        component: <Bold/>
    },
    {
        action: "italic",
        component: <Italic/>
    }, 
    {
        action: "underline",
        component: <Underline/>
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
        return (
            <div style={{ flexGrow: 0, width: "100px", boxShadow: "0px -4px 4px 2px rgba(0, 0, 0, .25)", zIndex:1   }}>
                {elementMap.map( (value) => makeElement(this, value.component, value.action), this )}
            </div>
        )
    }
}

const onClick = (action) => (function () {
    console.log('click')
    this.props.toggleControl(action.toUpperCase());
    this.setState({ [action]: !this.state.action })
})

const makeElement = (that, icon, action) => (<ControlButton onClick={onClick(action).bind(that) }>{icon}</ControlButton>)
import React from "react";
import {
    Editor as DraftEditor,
    EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw
} from 'draft-js';
import { is } from "immutable";
import TextInput from "./TextInput/TextInput.js";
import moment from "moment";
import FloatingButton from "../components/FloatingButton/FloatingButton.js";
import ControlsContainer from "../containers/ControlsContainer.js";

import Save from "react-icons/lib/fa/floppy-o.js";
import Delete from "react-icons/lib/fa/trash-o.js";
import Hide from "react-icons/lib/fa/eye-slash.js";
import Show from "react-icons/lib/fa/eye";

import { Prompt } from "react-router-dom"
import equal from "deep-equal"

/**
 * Component for the DraftJS Editor
 */

export default class Editor extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let date = moment.utc(this.props.date).format("DD/MM/YYYY");
        return (
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, height: "100%" }}>
                    <div style={{ overflow: 'auto', flexGrow: 1 }}>
                        <div style={{
                            width: "600px", marginLeft: "auto", marginRight: "auto", paddingTop: '24px',
                            fontFamily: "Raleway",
                        }}>
                            <Prompt when={this.props.contentChanged} message={location => (
                                `You have unsaved changes! Pressing OK will discard your changes!`)}
                            />
                            <TextInput
                                placeholder="Entry title"
                                type='text'
                                name='title'
                                onChange={this.props.titleChange}
                                value={this.props.title}
                                variant='journal'
                                autocomplete='false'

                            />
                            <p> {date} </p>
                            <DraftEditor
                                editorState={this.props.editorState}
                                onChange={this.props.onChange}
                                handleKeyCommand={this.props.handleKeyCommand}
                            />
                            <div style={{
                                position: 'fixed', bottom: "42px", right: "138px",
                                width: "216px",
                                display: 'flex', justifyContent: 'right'
                            }}>
                                {this.props.contentChanged &&
                                    <FloatingButton contain shape='square' right="124px" height="60px" width="60px" onClick={this.props.save}>
                                        <Save />
                                    </FloatingButton>
                                }

                                <FloatingButton contain shape='square' right="196px" height="60px" width="60px" onClick={this.props.delete}>
                                    <Delete />
                                </FloatingButton>
                                <FloatingButton contain shape='square' right="268px" height="60px" width="60px" onClick={this.props.hide}>
                                    {this.props.isHidden ? <Show /> : <Hide />}
                                </FloatingButton>
                            </div>
                        </div>
                    </div>

                    <ControlsContainer
                        inlineStyles={this.props.editorState.getCurrentInlineStyle().toJS()}
                        toggleControl={(str) => { this.toggleCommand(str) }}
                        showHistory={this.props.showHistory} //TODO
                        onHistory={this.props.openHistory}
                    />
                </div>

            </div>
        )
    }
}



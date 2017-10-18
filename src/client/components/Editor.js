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
import styles from './Editor.css'
/**
 * Component for the DraftJS Editor
 */

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorFocus: false
        }
    }

    handleGeneralClick = (evt) => {
        console.log(evt.target);
        this.editor.focus();
    }

    isPlaceHolder = () => {
        var contentState = this.props.editorState.getCurrentContent();
        console.log(contentState.hasText())
        if (!contentState.hasText()) {
            return true
        }
        return false;
    }

    render() {
        //UTC time 
        let date = moment(this.props.date).local().format("DD/MM/YYYY");
        return (
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, height: "100%" }}>
                    <div style={{ overflow: 'auto', flexGrow: 1, flexGrow: 1, display: 'flex', flexDirection:'column' }} >
                        <div style={{
                            width: "600px", marginLeft: "auto", marginRight: "auto", paddingTop: '24px',
                            fontFamily: "Raleway",display: 'flex', flexDirection:'column', flexGrow: 1
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
                            <div
                                className={
                                    `${(this.state.editorFocus ? styles["active"] : "")} ${styles.container} ${this.isPlaceHolder() ? styles['placeholder'] : ""}
                                `}
                                style={{flexGrow:1}}
                                onClick={this.handleGeneralClick}
                            >
                                <DraftEditor
                                    ref={(editor) => this.editor = editor}
                                    onClick={(evt) => console.log(evt)}
                                    editorState={this.props.editorState}
                                    onChange={this.props.onChange}
                                    handleKeyCommand={this.props.handleKeyCommand}
                                    placeholder="Click here to start typing"
                                    onFocus={(val) => this.setState({ editorFocus: true })}
                                    onBlur={(val) => this.setState({ editorFocus: false })}
                                //className={styles['active']}//this.state.editorFocus ? styles["active"] : ""}
                                />
                            </div>
                            <div style={{
                                position: 'fixed', bottom: "42px", right: "138px",
                                width: "216px",
                                display: 'flex', justifyContent: 'right'
                            }}>
                                {this.props.showDelete &&
                                    <FloatingButton contain shape='square' right="196px" height="60px" width="60px" onClick={this.props.delete}>
                                        <Delete />
                                    </FloatingButton>
                                }
                                {this.props.showHide &&
                                    <FloatingButton contain shape='square' right="268px" height="60px" width="60px" onClick={this.props.hide}>
                                        {this.props.isHidden ? <Show /> : <Hide />}
                                    </FloatingButton>
                                }
                                {this.props.contentChanged &&
                                    <FloatingButton contain shape='square' right="124px" height="60px" width="60px" onClick={this.props.save}>
                                        <Save />
                                    </FloatingButton>
                                }
                            </div>
                        </div>
                    </div>

                    <ControlsContainer
                        inlineStyles={this.props.editorState.getCurrentInlineStyle().toJS()}
                        toggleControl={(str) => this.toggleControl(str)}
                        showHistory={this.props.showHistory} //TODO
                        onHistory={this.props.openHistory}
                    />
                </div>

            </div>
        )
    }

    toggleControl = (str) => {
        this.props.toggleControl(str)
    }
}

Editor.defaultProps = {
    showHide: true,
    showDelete: true,
}

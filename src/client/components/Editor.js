import React from "react";
import {
    Editor as OGDraftEditor,
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

import DraftEditor from 'draft-js-plugins-editor';

import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import dragNDropPlugin from 'draft-js-drag-n-drop-plugin'

const plugins = [
    createLinkifyPlugin(),    
    createMarkdownShortcutsPlugin(),
    createImagePlugin(),
    dragNDropPlugin(),
]
export default class Editor extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        //UTC time 
        let date = moment(this.props.date).local().format("DD/MM/YYYY");
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
                                plugins={plugins}

                            />
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

    toggleControl = ( str ) => { 
        this.props.toggleControl(str)
    }
}

Editor.defaultProps = { 
    showHide: true,
    showDelete: true,
}

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

/**
 * Component for the DraftJS Editor
 */

export default class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editor: EditorState.createEmpty(),
            contentChanged: false
        }
    }

    toggleCommand = (commandStr) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editor, commandStr));
    };

    onChange = (editorState) => {
        console.log("Changed");
        const hasChangedContent = editorState.getCurrentContent() != this.state.editor.getCurrentContent()
        if (hasChangedContent) {
            this.props.onContentChange && this.props.onContentChange(); //Notify the Parent that the content has been changed        
        }
        //TODO: Compare current content to initial Content. If the two are the same, re-hide the save button and stop blocking
        // console.log(is(editorState.getCurrentContent(), ))
        // const currentContent = editorState.getCurrentContent()
        // console.log(currentContent.equals( this.state.initialText))         
        // console.log(this.state.initialText);
        // if(this.state.hasChangedContent && is( editorState.getCurrentContent(), this.state.initialText) )
        //     console.log("Back to original");

        this.setState({
            editor: editorState,
            contentChanged: this.state.contentChanged || hasChangedContent
        });


    };

    handleKeyCommand = (command, editorState) => {
        // this.props.notify(command.toUpperCase()/);
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled'
        } else {
            return 'not-handled'
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("PROPS");

        if (this.props != nextProps) {
            if (nextProps.initialText) {
                console.log("HERE!");
                console.log(nextProps.initialText);
                this.loadEditor(nextProps.initialText)
                this.setState({ initialText: (nextProps.initialText) })
            }
            if (nextProps.initialTitle)
                this.setState({ title: this.props.initialTitle })
        }
    }

    //We may receive an object of formatted text, or plain text
    loadEditor = (param) => {
        if (typeof (param) === "string")
            this.setState({ editor: EditorState.createWithContent(ContentState.createFromText(param)) })
        else if (typeof (param) === "object")
            this.setState({ editor: EditorState.createWithContent(convertFromRaw(param)) })
        else
            console.warn("Unsure about type given to an Editor Component");

    }



    getData = () => {
        return {
            title: this.state.title,
            content: convertToRaw(this.state.editor.getCurrentContent())
        }
    }

    render() {
        let date = moment().format("DD/MM/YYYY");
        console.log(this.state.editor.getCurrentInlineStyle().toJS())
        return (
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, height: "100%" }}>
                    <div style={{ overflow: 'auto', flexGrow: 1 }}>
                        <div style={{
                            width: "600px", marginLeft: "auto", marginRight: "auto", paddingTop: '24px',
                            fontFamily: "Raleway",
                        }}>
                            <Prompt when={this.state.contentChanged} message={location => (
                                `You have unsaved changes! Pressing OK will discard your changes!`)}
                            />
                            <TextInput
                                placeholder="Entry title"
                                type='text'
                                name='title'
                                onChange={TextInput.onChange.bind(this)}
                                value={this.state.title}
                                variant='journal'
                                autocomplete='false'

                            />
                            <p> {date} </p>
                            <DraftEditor
                                editorState={this.state.editor}
                                onChange={this.onChange}
                                handleKeyCommand={this.handleKeyCommand}
                            />
                            <div style={{
                                position: 'fixed', bottom: "42px", right: "138px",
                                width: "216px",
                                display: 'flex', justifyContent: 'right'
                            }}>
                                {this.state.contentChanged &&
                                    <FloatingButton contain shape='square' right="124px" height="60px" width="60px" onClick={this.props.save}>
                                        <Save />
                                    </FloatingButton>
                                }

                                <FloatingButton contain shape='square' right="196px" height="60px" width="60px" onClick={this.props.delete}>
                                    <Delete />
                                </FloatingButton>
                                <FloatingButton contain shape='square' right="268px" height="60px" width="60px" onClick={this.props.hide}>
                                    {this.props.isHidden ? <Show/> : <Hide/>}
                                </FloatingButton>
                            </div>
                        </div>
                    </div>

                    <ControlsContainer
                        inlineStyles={this.state.editor.getCurrentInlineStyle().toJS()}
                        toggleControl={(str) => { this.toggleCommand(str) }}
                        showHistory={this.props.showHistory} //TODO
                        onHistory={this.props.openHistory}
                    />
                </div>

            </div>
        )
    }
}



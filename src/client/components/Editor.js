import React from "react";
import {
    Editor as DraftEditor,
    EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw
} from 'draft-js';

import TextInput from "./TextInput/TextInput.js";
import moment from "moment";
import FloatingButton from "../components/FloatingButton/FloatingButton.js";


/**
 * Component for the DraftJS Editor
 */

export default class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editor: EditorState.createEmpty()

        }
    }

    toggleCommand = (commandStr) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editor, commandStr));
    };

    onChange = (editorState) => {
        this.setState({ editor: editorState });
    };

    handleKeyCommand = (command, editorState) => {
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
            if (nextProps.initialText)
                this.loadEditor(nextProps.initialText)
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
        return (
            <div style={{ overflow: 'auto',  flexGrow: 1, }}>
                <div style={{
                    maxWidth: "600px", marginLeft: "auto", marginRight: "auto", paddingTop: '60px',
                    fontFamily: "Raleway",
                }}>
                    <TextInput type='text' name='title' onChange={TextInput.onChange.bind(this)} />
                    <p> {date} </p>
                    <DraftEditor
                        editorState={this.state.editor}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                    />
                    <FloatingButton shape='square' right="124px" height="60px" width="60px" onClick={this.props.save}> Save </FloatingButton>
                    <FloatingButton shape='square' right="196px" height="60px" width="60px" onClick={this.props.delete}> 'Delete' </FloatingButton>
                    <FloatingButton shape='square' right="268px" height="60px" width="60px" onClick={this.props.hide}> Hide </FloatingButton>

                </div>
            </div>
        )
    }
}

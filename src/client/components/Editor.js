import React from "react";
import {
    Editor as DraftEditor,
    EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw
} from 'draft-js';

import TextInput from "./TextInput/TextInput.js";
import moment from "moment";
import FloatingButton from "../components/FloatingButton/FloatingButton.js";
import ControlsContainer from "../containers/ControlsContainer.js";

import Save from "react-icons/lib/fa/floppy-o.js";
import Delete from "react-icons/lib/fa/trash-o.js";
import Hide from "react-icons/lib/fa/eye-slash.js";

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
        console.log(this.state.editor.getCurrentInlineStyle().toJS())
        return (
            <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'row', flexGrow: 1, height: "100%" }}>
                    <div style={{ overflow: 'auto', flexGrow: 1 }}>
                        <div style={{
                            width: "600px", marginLeft: "auto", marginRight: "auto", paddingTop: '24px',
                            fontFamily: "Raleway",
                        }}>
                            <TextInput placeholder="Entry title" type='text' name='title' onChange={TextInput.onChange.bind(this)} />
                            <p> {date} </p>
                            <DraftEditor
                                editorState={this.state.editor}
                                onChange={this.onChange}
                                handleKeyCommand={this.handleKeyCommand}
                            />

                            <FloatingButton shape='square' right="124px" height="60px" width="60px" onClick={this.props.save}>
                                <Save />
                            </FloatingButton>

                            <FloatingButton shape='square' right="196px" height="60px" width="60px" onClick={this.props.delete}>
                                <Delete />
                            </FloatingButton>
                            <FloatingButton shape='square' right="268px" height="60px" width="60px" onClick={this.props.hide}>
                                <Hide />
                            </FloatingButton>
                        </div>
                    </div>

                    <ControlsContainer
                        inlineStyles={this.state.editor.getCurrentInlineStyle().toJS()}
                        toggleControl={(str) => { this.toggleCommand(str) }}
                    />
                </div>

            </div>
        )
    }
}



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

        this.state = {
            editor: EditorState.createEmpty(),
            contentChanged: false
        }
    }

    toggleCommand = (commandStr) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editor, commandStr));
    };


    isSameAsInitial = (editorState) => {
        const currentContent = convertToRaw(editorState.getCurrentContent())
        const initialContent = convertToRaw(this.state.initialEditor.getCurrentContent())
        console.log("COMPARE CONTENTS");
        console.log(currentContent);
        console.log(initialContent);
        // console.log(    JSON.stringify(currentContent) == JSON.stringify(initialContent) )
        return (equal(currentContent, initialContent));
        // console.log("---");
        for(const blockID in currentContent.blockMap) {
            // console.log(currentContent.blockMap[blockID]);
            // if(initialContent.key = )

            

        }



    }

    onChange = (editorState) => {
        console.log("Changed");
        const hasChangedContent = editorState.getCurrentContent() != this.state.editor.getCurrentContent()
        if (hasChangedContent) {
            this.props.onContentChange && this.props.onContentChange(); //Notify the Parent that the content has been changed        
        }
        //if it's back to the original, we reset back to false; 
        const isSame = this.isSameAsInitial(editorState);

        this.setState({
            editor: editorState,
            contentChanged: isSame ? false : this.state.contentChanged || hasChangedContent
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
            console.log("here");
            if (nextProps.initialText) {
                console.log("HERE!");
                console.log(nextProps.initialText);
                this.loadEditor(nextProps.initialText)
            }
            if (nextProps.initialTitle)
                this.setState({ title: this.props.initialTitle })
        }
    }

    //We may receive an object of formatted text, or plain text
    loadEditor = (param) => {
        if (typeof (param) === "string")
            this.setState({ editor: EditorState.createWithContent(ContentState.createFromText(param)), initialEditor:EditorState.createWithContent(ContentState.createFromText(param)) })
        else if (typeof (param) === "object")
            this.setState({ editor: EditorState.createWithContent(convertFromRaw(param)), initialEditor: EditorState.createWithContent(convertFromRaw(param))  })
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
                                    {this.props.isHidden ? <Show /> : <Hide />}
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



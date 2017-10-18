/*
* This renders the Editor and controls, when an entry has been selected in the journal view.
TODO: Investigate Plugins 
TODO: Error Handling (What happens if the id is invalid?)
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, createEntry } from "../redux/actions.js";
import moment from 'moment';
import ControlsContainer from "./ControlsContainer.js";

import Editor from "../components/Editor.js";
import TextInput from "../components/TextInput/TextInput.js";
import FloatingButton from "../components/FloatingButton/FloatingButton.js";

import {
    Editor as DraftEditor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw
} from 'draft-js';
import { initEditor, changeEditor, changeTitle } from '../redux/actions.js';
import equal from "deep-equal"

//TODO: Block Navigation
//TODO: Save state into localstorage, in case  (?) 
//TODO: Save Button 
class NewEntryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeControls: {},
        }
    }

    componentWillMount() {
        // console.log(this.props);
        //Get data if it isn't already there! (ie: User Refreshed)
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
        this.props.initEditor('', EditorState.createWithContent(ContentState.createFromText(
            "Click here to start typing!")));
    }

    componentWillReceiveProps(nextProps) {
        const journalID = this.props.match.params.id;
        if (this.state.submitted) {
            console.log(nextProps.entries)
            if (nextProps.journal.entries != this.props.journal.entries) {
                //We can navigate
                console.log("here")
                this.props.history.push(`/journal/${journalID}`)
            }
        }
    }


    handleTitleChange = (evt) => {
        const value = evt.target.value;
        this.props.changeTitle(value)
    }

    hasChanged = () => {
        if (!this.props.editorState) return false;
        if (this.state.submitted) return false; //If we have submitted, we haven't changed.        
        const hasTitleChanged = (this.props.editorTitle != '')
        const currentContent = (convertToRaw(this.props.editorState.getCurrentContent()))
        const hasContentChanged = (currentContent.blocks[0].text != "Click here to start typing!") 


        return (hasTitleChanged && hasContentChanged)
    }

    handleEditorChange = (newEditorState) => {
        this.props.changeEditor(newEditorState)
    }

    save = () => {
        // console.log("Creating a new entry"/);
        const journalID = this.props.match.params.id;

        this.props.createEntry(this.props.editorTitle,
            JSON.stringify(convertToRaw(this.props.editorState.getCurrentContent())),
            journalID);

        this.setState({ submitted: true });

    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.props.changeEditor(newState);
            return 'handled';
        } else {
            return 'not-handled';
        }
    }

    render() {
        let date = moment().format("DD/MM/YYYY")
        console.log("NEW ENTRY");
        return (
            <Editor
                title={this.props.editorTitle}
                titleChange={this.handleTitleChange}
                date={moment.utc()}

                editorState={this.props.editorState || EditorState.createEmpty()}
                onChange={this.handleEditorChange}
                handleKeyCommand={this.handleKeyCommand}
                contentChanged={this.hasChanged()}

                save={this.save}
                //delete={this.openDeleteDialog}
                //hide={this.openHideDialog}
                showDelete={false}
                showHide={false}

                toggleControl={(str) => {this.handleEditorChange( RichUtils.toggleInlineStyle(this.props.editorState, str))}}


                isHidden={false}
                isDeleted={false}
                showHistory={false}
                openHistory={() => { }}
            />
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        journal: state.data.journals[ownProps.match.params.id],

        editorState: state.data.editor.content,
        editorTitle: state.data.editor.title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id)),
        createEntry: (title, content, journalID) => dispatch(createEntry(title, content, journalID)),

        initEditor: (title, content) => dispatch(initEditor(title, content)),
        changeEditor: (newState) => dispatch(changeEditor(newState)),
        changeTitle: (newTitle) => dispatch(changeTitle(newTitle))

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewEntryContainer));

/*
* This renders the Editor and controls, when an entry has been selected in the journal view.
TODO: Investigate Plugins 
TODO: Error Handling (What happens if the id is invalid?)
*/
import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, createRevision, getEntry, getRevision, modifyEntry } from "../redux/actions.js";
import EntryList from "./EntryList.js";

import Editor from "../components/Editor.js";
import ControlsContainer from "./ControlsContainer.js";
import Modal from "../components/Modal/Modal.js";
import moment from "moment";

import RevisionsMenu from "./EntryViewContainer/RevisionsMenu.js";
import Dialog from "../components/Dialog.js";

import {
    Editor as DraftEditor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw
} from 'draft-js';
import { initEditor, changeEditor, changeTitle } from '../redux/actions.js';
import equal from "deep-equal"


class EntryViewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            historyModal: false,

            dialog: false,
            dialogTitle: "",
            dialogActions: [],
            dialogMessage: '',

            edited: false,
            curRevisions: 0,

            currentRevisionID: 0,

        }
    }

    componentWillMount() {
        //Get data if it isn't already there! (ie: User Refreshed)
        const journalID = this.props.match.params.id;
        if (this.props.journal && !this.props.journal[journalID])
            this.props.getJournal(journalID);

        const entryID = this.props.match.params.entry;
        if (this.props.entries && !this.props.entries[entryID])
            this.props.getEntry(entryID);

        const revisionID = this.props.match.params.revision;
        if (revisionID && !this.props.revisions[revisionID]) {
            console.log("Getting revision ID");
            this.props.getRevision(revisionID);
        }

        if (revisionID != null)
            this.setState({ currentRevisionID: revisionID })


    }



    componentWillReceiveProps(nextProps) {
        let revisionID = nextProps.match.params.revisions;
        //Do we have a defined revision? If not, set revisionID to the latest
        if (!nextProps.match.params.revisions && nextProps.entry)
            revisionID = nextProps.entry.revisions.slice(-1)[0];

        //Has the Revision Changed? 
        if (this.props.revisions[this.state.currentRevisionID] != nextProps.revisions[revisionID]
            && nextProps.revisions[revisionID] != undefined
        ) {
            console.log("Revision has changed!");
            console.log("Reinitialising Editor");
            console.log(nextProps.revisions[revisionID]);
            this.props.initEditor(
                nextProps.revisions[revisionID].title,
                EditorState.createWithContent(convertFromRaw(JSON.parse(nextProps.revisions[revisionID].content)))
            )
            this.setState({ currentRevisionID: revisionID })
        }
        // console.log("Set editor");
        // if (!this.props.editorState) {

        // }
    }

    hasChanged = () => {
        console.log('has Changed!');
        const revisionObj = (this.props.revisions[this.state.currentRevisionID]);
        if (revisionObj == undefined) return false;

        if (revisionObj.title != this.props.editorTitle) {
            return true;
        }

        const initialContent = JSON.parse(revisionObj.content);
        const currentContent = convertToRaw(this.props.editorState.getCurrentContent())
        if (!equal(currentContent, initialContent))
            return true;

        return false;
    }

    handleEditorChange = (newEditorState) => {
        this.props.changeEditor(newEditorState)
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

    handleTitleChange = (evt) => {
        console.log("here");
        console.log(evt.target.value);
        const value = evt.target.value;
        this.props.changeTitle(value)
    }

    saveRevision = () => {
        console.log("Saving");
        const title = this.props.editorTitle;
        const content = convertToRaw(this.props.editorState.getCurrentContent())
        this.props.saveRevision(this.props.match.params.entry, title, JSON.stringify(content))
    }



    render() {
        console.log(this.props);

        return (<div style={{ flexGrow: 1, display: 'flex' }}>
            <Editor
                title={this.props.editorTitle}
                titleChange={this.handleTitleChange}
                date={(this.props.revisions[this.state.currentRevisionID] || {}).createdAt || ""}

                editorState={this.props.editorState || EditorState.createEmpty()}
                onChange={this.handleEditorChange}
                handleKeyCommand={this.handleKeyCommand}
                contentChanged={this.hasChanged()}

                save={this.saveRevision}
                delete={this.openDeleteDialog}
                hide={this.openHideDialog}

                isHidden={(this.props.entry || {}).isHidden}
                isDeleted={(this.props.entry || {}).isDeleted}
                showHistory={this.props.entry && (this.props.entry || {}).revisions > 1}  
                openHistory={() => this.setState({ historyModal: !this.state.historyModal })}



            //TODO: History Button
            //Toggle Rich Utils 
            //New Entry Page 

            />
            {
                this.state.historyModal &&
                <RevisionsMenu
                    onClose={() => this.setState({ historyModal: false })}
                    revisions={this.props.revisions}
                    entry={this.props.entry}
                    journalID={this.props.match.params.id}
                    entryID={this.props.match.params.entry}

                />
            }
            {
                this.state.dialog &&
                <Dialog
                    onClose={() => this.setState({ dialog: false })}
                    text={this.state.dialogMessage}
                    label={this.state.dialogTitle}
                    actions={this.state.dialogActions}
                />
            }

        </div>)
    }
    // return (
    //     <div style={{ flexGrow: 1, display: 'flex' }}>
    //         <Editor
    //             ref={(editor) => { this.editor = editor }}
    //             initialTitle={revision.title}
    //             initialText={revisionText}
    //             save={() => {
    //                 const { title, content } = this.editor.getData();
    //                 this.goToLatest()
    //                 this.props.saveRevision(this.props.match.params.entry, title, JSON.stringify(content))
    //             }}
    //             delete={this.openDeleteDialog}
    //             hide={this.openHideDialog}
    //             isHidden={entry.isHidden}

    //             showHistory={true} //TODO:  
    //             openHistory={() => this.setState({ historyModal: !this.state.historyModal })}
    //         />

    //     </div >
    // )
    // }
    // return <div> Loading ... </div>


    openDeleteDialog = () => {
        const entry = this.props.entry;
        const deleted = this.props.entry.isDeleted;
        //open dialog 
        this.setState({
            dialog: true,
            dialogTitle: deleted ? "Restore" : "Delete",
            dialogMessage: deleted ? "Do you want to restore this entry?" : "Are you sure you wish to delete this entry?",
            dialogActions: [
                {
                    label: "Cancel",
                    onClick: (evt) => this.setState({ dialog: false })
                },
                {
                    label: deleted ? "Restore" : "Delete", onClick: (evt) => {
                        this.props.modifyEntry(entry._id, !entry.isDeleted, entry.isHidden);
                        this.setState({ dialog: false });
                    }
                },

            ]
        });
    }

    openHideDialog = () => {
        const entry = this.props.entry;
        const hidden = this.props.entry.isHidden;
        //open dialog 
        this.setState({
            dialog: true,
            dialogTitle: hidden ? "Unhide" : "Hide",
            dialogMessage: hidden ? "Do you want to unhide this entry?" : "Are you sure you wish to hide this entry?",
            dialogActions: [
                {
                    label: "Cancel",
                    onClick: (evt) => this.setState({ dialog: false })
                },
                {
                    label: hidden ? "Unhide" : "Hide", onClick: (evt) => {
                        this.props.modifyEntry(entry._id, entry.isDeleted, !entry.isHidden);
                        this.setState({ dialog: false });
                    }
                },

            ]
        });
    }

}


const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        journal: state.data.journals[ownProps.match.params.id],
        //If the ID is defined, return the appropriate entry. Else return an empty object
        entry: state.data.entries[ownProps.match.params.entry],
        // entry: state.ui.journalEntry[ownProps.match.params.id] ? state.data.entries[state.ui.journalEntry[ownProps.match.params.id]] : null,
        revisions: state.data.entryRevisions,


        editorState: state.data.editor.content,
        editorTitle: state.data.editor.title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id)),
        getEntry: (id) => dispatch(getEntry(id)),
        getRevision: (id) => dispatch(getRevision(id)),
        saveRevision: (entryID, title, string) => dispatch(createRevision(entryID, title, string)),
        modifyEntry: (entryID, isDeleted, isHidden) => dispatch(modifyEntry(entryID, isDeleted, isHidden)),

        initEditor: (title, content) => dispatch(initEditor(title, content)),
        changeEditor: (newState) => dispatch(changeEditor(newState)),
        changeTitle: (newTitle) => dispatch(changeTitle(newTitle))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryViewContainer));

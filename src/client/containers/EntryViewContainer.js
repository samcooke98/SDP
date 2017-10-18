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
import equal from "deep-equal";

import Spinner from "../components/Spinner";

// import Loading from '../components/L';


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

            editorState: EditorState.createEmpty(),
            title: ''

        }
    }

    componentDidMount() {
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

    hasChanged = () => {
        console.log('has Changed!');
        //Check with the props to see if it matches

        const initialContent = JSON.parse(this.props.content);
        const currentContent = convertToRaw(this.state.editorState.getCurrentContent())
        if (!equal(currentContent, initialContent)
            || this.props.title !== this.state.title
        ) {
            console.log(' The State has changed ');
            return true;
        }
        return false;
    }

    handleEditorChange = (newEditorState) => {
        this.setState({ editorState: newEditorState })
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.handleEditorChange(newState);
            return 'handled';
        } else {
            return 'not-handled';
        }
    }

    handleTitleChange = (evt) => {
        console.log("here");
        console.log(evt.target.value);
        const value = evt.target.value;
        this.setState({ title: value })
    }

    saveRevision = () => {
        console.log("Saving");
        const title = this.state.title;
        const content = convertToRaw(this.state.editorState.getCurrentContent())
        this.props.saveRevision(this.props.match.params.entry, title, JSON.stringify(content)).then( 
            (val) => { 
                console.log("Handling Errors");
                console.log(val);
                if(val.payload.success) { 
                    // this.props.history.push(`${this.props.match.params.entry}/`)
                } else { 

                }
            }
        )
    }

    componentDidUpdate(nextProps, nextState) {
        if (nextProps != this.props && this.props.isLoaded) {
            //State only update
            console.log("Props have changed - Updating State");
            this.setState({
                title: this.props.title,
                editorState: EditorState.createWithContent(
                    convertFromRaw(JSON.parse(this.props.content))
                )
            })
        }
    }

    render() { //Dialog for Revision history + loader when submitting 
        if (!this.props.isLoaded) {
            return <Spinner/>
        }
        console.log("---- Rendering Entry View  ----");

        return (<div style={{ flexGrow: 1, display: 'flex' }}>

            <Editor
                title={this.state.title}
                titleChange={this.handleTitleChange}
                date={this.props.date}

                editorState={this.state.editorState}

                onChange={this.handleEditorChange}
                handleKeyCommand={this.handleKeyCommand}
                contentChanged={this.hasChanged()}

                save={this.saveRevision}
                delete={this.openDeleteDialog}
                hide={this.openHideDialog}

                isHidden={this.props.isHidden}
                isDeleted={this.props.isDeleted}
                showHistory={this.props.hasRevisions}
                openHistory={() => this.setState({ historyModal: !this.state.historyModal })}

                toggleControl={(str) => { this.handleEditorChange(RichUtils.toggleInlineStyle(this.props.editorState, str)) }}

            //New Entry Page 

            />
            {
                this.state.historyModal &&
                <RevisionsMenu
                    onClose={() => this.setState({ historyModal: false })}
                    revisions={this.props.revisions}
                    entry={this.props.entry}
                    journalID={this.props.journalID}
                    colour={this.props.colour}
                    entryID={this.props.entryID}

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

    openDeleteDialog = () => {
        const deleted = this.props.isDeleted;
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
                        this.props.modifyEntry(
                            this.props.entryID, !this.props.isDeleted, this.props.isHidden
                        );
                        this.setState({ dialog: false });
                    }
                },

            ]
        });
    }

    openHideDialog = () => {
        const hidden = this.props.isHidden;
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
                        this.props.modifyEntry(this.props.entryID, this.props.isDeleted, !this.props.isHidden);
                        this.setState({ dialog: false });
                    }
                },

            ]
        });
    }

}


const mapStateToProps = (state, ownProps) => {
    const journalID = ownProps.match.params.id;
    const entryID = ownProps.match.params.entry;

    const journal = state.data.journals[journalID] || {};
    const entry = state.data.entries[entryID] || {};

    const revisionID = ownProps.match.params.revision 
        || (entry.revisions && entry.revisions[entry.revisions.length - 1]) 
        || null;

    const revision = state.data.entryRevisions[revisionID];

    console.log(revision);
    if (!journal || !entry || !revision) {
        return {
            isLoaded: false,
            entryID,
            journalID,
            revisionID
        }
    } else {
        return {
            isLoaded: true,
            title: revision.title,
            date: revision.createdAt,
            content: revision.content,

            hasRevisions: (entry.revisions.length > 1),
            isHidden: entry.isHidden,
            isDeleted: entry.isDeleted,
            colour: journal.colour,
            revisions: entry.revisions.map( id => state.data.entryRevisions[id]),

            isDeleted: entry.isDeleted,
            isHidden: entry.isHidden,

            journalID,
            entryID,
            revisionID

        }
    }
    // console.log(ownProps);
    // return {
    //     journal: state.data.journals[ownProps.match.params.id],
    //     //If the ID is defined, return the appropriate entry. Else return an empty object
    //     entry: state.data.entries[ownProps.match.params.entry],
    //     // entry: state.ui.journalEntry[ownProps.match.params.id] ? state.data.entries[state.ui.journalEntry[ownProps.match.params.id]] : null,
    //     revisions: state.data.entryRevisions,


    //     editorState: state.data.editor.content,
    //     editorTitle: state.data.editor.title
    // }
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

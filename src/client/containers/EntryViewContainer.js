/*
* This renders the Editor and controls, when an entry has been selected in the journal view.
TODO: Investigate Plugins 
TODO: Error Handling (What happens if the id is invalid?)
*/
import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, createRevision, getEntry, getRevision, modifyEntry } from "../redux/actions.js";

import EntryList from "./EntryList.js";

import Editor from "../components/Editor.js";
import ControlsContainer from "./ControlsContainer.js";
import Modal from "../components/Modal/Modal.js";
import moment from "moment";

import RevisionsMenu from "./EntryViewContainer/RevisionsMenu.js";
import Dialog from "../components/Dialog.js";

class EntryViewContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            historyModal: false,
            dialog: false,
            dialogTitle: "",
            dialogActions: [],
            dialogMessage: '',
        }
    }

    componentWillMount() {
        //Get data if it isn't already there! (ie: User Refreshed)
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
        let entryID = this.props.match.params.entry;
        this.props.getEntry(entryID);

        const revisionID = this.props.match.params.revision
        if (revisionID && !this.props.revisions[revisionID])
            this.props.getRevision(revisionID);


    }

    goToLatest = () => {
        //Navigates to the latest revision
        // this.props.history.go(`/journal/${id}/${entry}/${val}`)
    }

    //Still not happy with this function. 
    render() {
        if (this.props.entry) {
            //Get last revision
            const entry = this.props.entry; 
            let revisionID = this.props.match.params.revision || this.props.entry.revisions.slice(-1)[0];
            let revision = this.props.revisions[revisionID] || {};
            let revisionText = JSON.parse(revision.content);
            console.log(this.props.entry.revisions)
            if (revision)
                return (
                    <div style={{ flexGrow: 1, display: 'flex' }}>
                        <Editor
                            ref={(editor) => { this.editor = editor }}
                            initialTitle={revision.title}
                            initialText={revisionText}
                            save={() => {
                                const { title, content } = this.editor.getData();
                                this.props.saveRevision(this.props.match.params.entry, title, JSON.stringify(content))
                                this.goToLatest()
                            }}
                            delete={this.openDeleteDialog}
                            hide={this.openHideDialog}
                            isHidden={entry.isHidden}

                            showHistory={true} //TODO:  
                            openHistory={() => this.setState({ historyModal: !this.state.historyModal })}
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
                    </div >
                )
        }
        return <div> Loading ... </div>
    }

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
                        this.setState({dialog: false});
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
                        this.setState({dialog: false});
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
        revisions: state.data.entryRevisions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id)),
        getEntry: (id) => dispatch(getEntry(id)),
        getRevision: (id) => dispatch(getRevision(id)),
        saveRevision: (entryID, title, string) => dispatch(createRevision(entryID, title, string)),
        modifyEntry: (entryID, isDeleted, isHidden) => dispatch(modifyEntry(entryID, isDeleted, isHidden))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryViewContainer));

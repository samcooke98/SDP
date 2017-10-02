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

            waiting: false
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
    }

    isPopulated = (props = this.props) => {
        const journalID = props.match.params.id;
        const entryID = props.match.params.entry;
        const revisionID = props.match.params.revision;
        console.log(props.journal);
        console.log(props.entry);
        console.log(props.revisions[revisionID])
        if (props.journal && props.entry && props.revisions[revisionID])
            return true;
        else
            return false;
    }


    componentWillReceiveProps(nextProps) {
        const curJournalID = this.props.match.params.id;
        const curEntryID = this.props.match.params.entry;
        const curRevisionID = this.props.match.params.revision;

        const nextJournalID = nextProps.match.params.id;
        const nextEntryID = nextProps.match.params.entry;
        const nextRevisionID = nextProps.match.params.revision;

        if (curJournalID != nextJournalID
            || curEntryID != nextEntryID
            || curRevisionID != nextRevisionID
            || this.props.revisions != nextProps.revisions
        ) {
            //We have changed pages! OR we have updated our entities
            const isPopulated = this.isPopulated(nextProps);
            console.log("Populated:");
            console.log(isPopulated);
            console.log(nextProps)
            this.setState({
                ready: this.isPopulated(nextProps),
                initialTitle: isPopulated ? nextProps.revisions[nextRevisionID].title : null,
                initialContent: isPopulated ? nextProps.revisions[nextRevisionID].content : null
            })
        }

        if (this.state.waiting) {
            if (this.props.entry.revisions.length < nextProps.entry.revisions.length) {
                console.log("Ready to navigate");
                this.setState({waiting:false})
                this.props.history.push( 
                    `/journal/${nextJournalID}/${nextEntryID}/${nextProps.entry.revisions.slice(-1)[0]}`
                )
            }
        }
    }

    goToLatest = () => {
        this.setState({ waiting: true })
    }



    //Still not happy with this function. 
    render() {
        const journalID = this.props.match.params.id;
        const entryID = this.props.match.params.entry;
        const revisionID = this.props.match.params.revision;

        if (revisionID == null) {
            if (this.props.entry) {
                return <Redirect to={`/journal/${journalID}/${entryID}/${this.props.entry.revisions.slice(-1)[0]}`} />
            }
            return <div> Loading ... </div>
        }

        if (this.state.changeToLatest) {
            if (this.props.entry) {
                this.setState({changeToLatest: false}) //anti-pattern really 
                return <Redirect to={`/journal/${journalID}/${entryID}/${this.props.entry.revisions.slice(-1)[0]}`} />
            }
        }

        return (<div style={{ flexGrow: 1, display: 'flex' }}>
            <Editor
                ref={(editor) => { this.editor = editor }}
                initialTitle={this.state.initialTitle || null}
                initialText={this.state.initialContent ? JSON.parse(this.state.initialContent) : null}
                save={() => {
                    const { title, content } = this.editor.getData();
                    this.goToLatest()
                    this.props.saveRevision(this.props.match.params.entry, title, JSON.stringify(content))
                }}
                delete={this.openDeleteDialog}
                hide={this.openHideDialog}
                isHidden={false}

                showHistory={true} //TODO:  
                openHistory={() => this.setState({ historyModal: !this.state.historyModal })}
            />

        </div>)

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
        //         {
        //             this.state.historyModal &&
        //             <RevisionsMenu
        //                 onClose={() => this.setState({ historyModal: false })}
        //                 revisions={this.props.revisions}
        //                 entry={this.props.entry}
        //                 journalID={this.props.match.params.id}
        //                 entryID={this.props.match.params.entry}

        //             />
        //         }
        //         {
        //             this.state.dialog &&
        //             <Dialog
        //                 onClose={() => this.setState({ dialog: false })}
        //                 text={this.state.dialogMessage}
        //                 label={this.state.dialogTitle}
        //                 actions={this.state.dialogActions}
        //             />
        //         }
        //     </div >
        // )
        // }
        // return <div> Loading ... </div>
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

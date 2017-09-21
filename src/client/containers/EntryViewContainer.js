/*
* This renders the Editor and controls, when an entry has been selected in the journal view.
TODO: Investigate Plugins 
TODO: Error Handling (What happens if the id is invalid?)
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, createRevision, getEntry, getRevision } from "../redux/actions.js";

import EntryList from "./EntryList.js";

import Editor from "../components/Editor.js";
import ControlsContainer from "./ControlsContainer.js";


class EntryViewContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        // console.log(this.props);
        //Get data if it isn't already there! (ie: User Refreshed)
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
        let entryID = this.props.match.params.entry;
        this.props.getEntry(entryID);

        // if (this.props.entry)
        //     this.loadEntry();
    }

    componentWillReceiveProps(nextProps) {
        console.log("Received Props");
        //TODO: This needs clean-up. In-fact, this entire file needs refactoring
        // First part: Inital Load
        // Second Part: If the next Props id does not match the current, reset the editor
        // Third Part: If the next revisions array does not match the current one, 
        if (nextProps.entry) console.log(nextProps.entry.revisions)
        if (this.props.entry) console.log(this.props.entry.revisions);

        if (nextProps.entry) {
            console.log("Initial Load with Data")
            let revisionID = nextProps.entry.revisions.slice(-1)[0];
            let revision = nextProps.revisions[revisionID];
            if (revision == undefined) {
                this.props.getRevision(revisionID)
            } else {
                console.log(`Loading revision ID: ${revisionID}`)
                // let contentState = convertFromRaw(JSON.parse(revision.content))
                // this.setState({ editor: EditorState.createWithContent(contentState) })
            }
        }
    }

    //Still not happy with this function. 
    render() {
        if (this.props.entry) {
            //Get last revision
            let revisionID = this.props.entry.revisions.slice(-1)[0];
            let revision = this.props.revisions[revisionID] || {};
            let test = JSON.parse(revision.content);
            console.log(typeof test)
            if (revision)
                return (
                    <div style={{ flexGrow: 1, display: 'flex' }}>
                        <Editor
                            ref={(editor) => { this.editor = editor }}
                            initialText={test}
                        />
                        <ControlsContainer/>
                    </div >
                )
            else {
                return <div> Loading ... </div>
            }
        } else {
            return <div> Loading ... </div>
        }

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
        saveRevision: (entryID, title, string) => dispatch(createRevision(entryID, title, string))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryViewContainer));

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
import JournalBar from "../components/JournalBar";

import RichTextEditor from 'react-rte';
//Maybe look @ using Draft.js ?
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js';


class EditorContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // editor: EditorState.createEmpty()
        }
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

    loadEntry = () => {
        // let revisionID = this.props.entry.revisions.slice(-1)[0];
        // let revision = this.props.revisions[revisionID];
        // let contentState = convertFromRaw(JSON.parse(revision.content))
        // this.setState({ editor: EditorState.createWithContent(contentState) })
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
                let contentState = convertFromRaw(JSON.parse(revision.content))
                this.setState({ editor: EditorState.createWithContent(contentState) })
            }
        }
    }



    onChange = (editorState) => {
        this.setState({ editor: editorState });
    };

    toggleCommand = (commandStr) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, commandStr));
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


    render() {
        if (this.props.entry) {
            console.log(this.state.editor);
            // //Get last revision
            let revisionID = this.props.entry.revisions.slice(-1)[0];
            let revision = this.props.revisions[revisionID] || {};
            return (
                <div style={{ flexGrow: 1, display: 'flex' }}>
                    <div style={{ flexGrow: 1, maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
                        <h1> {revision.title || ''} </h1>
                        Entry Date <br />
                        <Editor
                            editorState={this.state.editor}
                            onChange={this.onChange}
                            handleKeyCommand={this.handleKeyCommand}
                        />
                        <button onClick={() => {
                            this.props.saveRevision(this.props.match.params.entry,
                                revision.title,
                                JSON.stringify(convertToRaw(this.state.editor.getCurrentContent())) //Get the content, convert it to a raw format
                            )
                        }}>
                            Save (TEMP)
                        </button>
                    </div>
                    <div style={{ flexGrow: 0, width: "100px" }}>
                        <p> Controls go here </p>
                    </div>
                </div >
            )
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorContainer));

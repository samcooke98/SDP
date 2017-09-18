/*
* This renders the Editor and controls, when an entry has been selected in the journal view.
TODO: Investigate Plugins 
TODO: Error Handling (What happens if the id is invalid?)
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, createRevision, getEntry, createEntry } from "../redux/actions.js";

import EntryList from "./EntryList.js";
import JournalBar from "../components/JournalBar";

import RichTextEditor from 'react-rte';
//Maybe look @ using Draft.js ?
import { Editor, EditorState, RichUtils, ContentState, convertToRaw, convertFromRaw } from 'draft-js';


class EditorContainer extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            editor: EditorState.createEmpty()
        }
    }

    componentWillMount() {
        // console.log(this.props);
        //Get data if it isn't already there! (ie: User Refreshed)
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
        // let entryID = this.props.match.params.entry;
        // this.props.getEntry(entryID)
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
        return (
            <div style={{ flexGrow: 1, display: 'flex' }}>
                <div style={{ flexGrow: 1, maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
                    <h1> {''} </h1>
                    Entry Date <br />
                    <Editor
                        editorState={this.state.editor}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                    />
                    <button onClick={() => {
                        this.props.createEntry("TODO",
                            JSON.stringify(convertToRaw(this.state.editor.getCurrentContent())), //Get the content, convert it to a raw format
                            this.props.match.params.id
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
    }
}


const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        journal: state.data.journals[ownProps.match.params.id],
        //If the ID is defined, return the appropriate entry. Else return an empty object
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id)),
        getEntry: (id) => dispatch(getEntry(id)),
        saveRevision: (entryID, title, string) => dispatch(createRevision(entryID, title, string)),
        createEntry: (title, content, journalID) => dispatch(createEntry(title, content, journalID ))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditorContainer));

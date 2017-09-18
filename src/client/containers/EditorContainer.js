/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal } from "../redux/actions.js";

import EntryList from "./EntryList.js";
import JournalBar from "../components/JournalBar";

import RichTextEditor from 'react-rte';
//Maybe look @ using Draft.js ?
import { Editor, EditorState, RichUtils } from 'draft-js';


class FooterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentWillMount() {
        // console.log(this.props);
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
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
            console.log(this.props.entry);
            //Get last revision
            let revisionID = this.props.entry.revisions.slice(-1)[0];
            let revision = this.props.revisions[revisionID];
            return (
                <div style={{ flexGrow: 1, backgroundColor: "rgb(248,248,248)", padding: "8px" }}>
                    <div style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
                        <h1> {revision.title} </h1>
                        Entry Date <br />
                        {this.state.editor && <Editor
                            editorState={this.state.editor}
                            onChange={this.onChange}
                            handleKeyCommand={this.handleKeyCommand}
                        />
                        }
                    </div>
                </div>
            )
        } else {
            return <div style={{ flexGrow: 1, backgroundColor: "rgb(248,248,248)", padding: "8px" }}>
                Select an entry from the list to get started!
            </div>
        }
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        journal: state.data.journals[ownProps.match.params.id],
        //If the ID is defined, return the appropriate entry. Else return an empty object
        entry: state.ui.journalEntry[ownProps.match.params.id] ? state.data.entries[state.ui.journalEntry[ownProps.match.params.id]] : null,
        revisions: state.data.entryRevisions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id))

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FooterContainer));

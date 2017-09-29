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

import { EditorState } from "draft-js"

//TODO: Block Navigation
//TODO: Save state into localstorage, in case  (?) 
//TODO: Save Button 
class NewEntryContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeControls: {},
            editor: EditorState.createEmpty()
        }
    }

    componentWillMount() {
        // console.log(this.props);
        //Get data if it isn't already there! (ie: User Refreshed)
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
    }

    createEntry = () => {
        let { title, content } = this.editor.getData();
        this.props.createEntry(title, JSON.stringify(content), this.props.match.params.id)
    }

    toggleCmd = (command) => {
        //Change it in State

        let newActive = Object.assign({}, this.state.activeControls)
        newActive[command] = !newActive[command];
        this.setState({ activeControls: newActive })

    }

    render() {
        let date = moment().format("DD/MM/YYYY")

        console.log(this.editor && this.editor.getCurrentInlineStyle && this.editor.getCurrentInlineStyle())
        return (
            <Editor
                ref={(editor) => { this.editor = editor }}
                save={this.createEntry}
                delete={() => console.log('delete')}
                hide={() => console.log("hide")}
                initialText="Click here to start writing your entry"
                notify={this.toggleCmd}
            />
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        journal: state.data.journals[ownProps.match.params.id],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id)),
        createEntry: (title, content, journalID) => dispatch(createEntry(title, content, journalID))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewEntryContainer));

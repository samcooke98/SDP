/*
* Container that renders the List of Entries
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, getEntry, selectEntry } from "../redux/actions.js";
import TextInput from "../components/TextInput/TextInput.js";
import Button from "../components/Button/Button.js"
import ListItem from "../components/ListItem/ListItem.js";

import Search from "react-icons/lib/md/search.js"

//TODO: Change to use Link Components
class EntryList extends React.Component {
    constructor(props) {
        super(props);

        this.dispatched = []
    }

    componentWillMount() {
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
    }

    generateList = () => {
        console.log(this.props)
        if (!this.journal.entries) {
            return <div> LOADING  </div>
        } else {
            //Load entries (If we haven't already)
            for (var entryID of this.journal.entries) {
                if (!this.props.entries[entryID] && this.dispatched.indexOf(entryID) == -1) {
                    this.props.getEntry(entryID)
                    //Store it in the dispatched index so that we don't flood requests
                    this.dispatched.push(entryID);
                }
            }

            let result = (this.journal.entries || []).map((id) => {
                var entry = this.props.entries[id]; if(!entry) return null;
                var revisionID = entry.revisions[entry.revisions.length - 1];
                let revision = this.props.revisions[revisionID] || {}
                return <ListItem 
                    key={id} 
                    title={revision.title || ''} 
                    caption={revision.createdAt || ''} 
                    onClick={() => this.props.history.push(`${this.props.match.url}/${id}`)} />
            })
            return result;
        }

    }

    render() {
        this.journal = this.props.journal;
        // this.entries = this.journal.entries;

        console.log(this.journal);

        return (
            <div style={{ width: "300px", display: "flex", flexDirection: "column", padding: "12px", boxShadow: "blur", boxShadow: "4px 0px 4px -2px rgba(0,0,0,.25)", zIndex: 1 }}>
                <TextInput right={<Search />} style={{ marginTop: "19px", marginBottom: "12px" }} />
                <Button label="Filter Options" variant="clear" width="100%" height="48px" />
                <div style={{ flexGrow: 1, marginTop: "12px" }}>
                    {this.generateList()}
                </div>
                <Button label="New Entry" colour={this.journal.colour} width="100%" onClick={() => this.props.history.push(`${this.props.match.url}/new`)} />
            </div>
        )
    }
}

EntryList.defaultProps = {
    onClick: () => { }
}


const mapStateToProps = (state, ownProps) => {
    // let entries = state.data.journals[ownProps.match.params.id].
    return {
        journalID: ownProps.match.params.id,
        journal: state.data.journals[ownProps.match.params.id] || {},
        entries: state.data.entries,
        revisions: state.data.entryRevisions
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id)),
        getEntry: (id) => dispatch(getEntry(id)),
        selectEntry: (entryID, journalID) => {console.log("here"); dispatch(selectEntry(entryID, journalID))}

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryList));

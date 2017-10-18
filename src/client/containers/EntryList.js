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
import FilterOptions from "../components/FilterOptions.js";
import { withProtection } from "./Protector.js"

import Colour from "color";
import moment from "moment";

//TODO: Add active state
//TODO: Add Filter 
class EntryList extends React.Component {
    constructor(props) {
        super(props);

        this.dispatched = []
        this.state = {
            isFilterOpen: false,
            searchTerm: "",
            showHidden: false,
            showDeleted: false,
            showModified: false,
            entryList: []
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        let journalID = this.props.match.params.id;
        this.setState({ entryList: [<p key={0}> Loading </p>] })
        //Get the Journal and it's entries
        this.props.getJournal(journalID).then(
            (val) => {
                const journal = val.payload.payload.entities.journals[val.payload.payload.result];
                //Load entries (If we haven't already)
                const promises = [];
                for (var entryID of journal.entries) {
                    if (!this.props.entries[entryID] && this.dispatched.indexOf(entryID) == -1) {
                        promises.push(this.props.getEntry(entryID))
                        //Store it in the dispatched index so that we don't flood requests
                        this.dispatched.push(entryID);
                    }
                }
                Promise.all(promises).then(this.updateList)
            })
    }

    updateList = () => {
        // this.setState({ entryList: this.generateList() })
    }

    updateCheckbox = (name, elem) => {
        this.setState({ [name]: elem.target.checked },
            // () => {this.setState({entryList: this.generateList() }) )
            () => {
                const list = this.generateList();
                console.log(list);
                return this.setState({ entryList: list })
            })
    }

    onSearchChange(elem) {
        this.setState({ searchTerm: elem.target.value });
    }


    searchString = (entryTitle, searchTerm) => {
        return entryTitle.toLowerCase().includes(searchTerm.toLowerCase());
    }

    generateList = () => {
        console.log(this.props)
        if (!this.journal || !this.journal.entries) return (<p> Loading </p>);
        let filteredEntries = this.journal.entries;

        if (filteredEntries.length == 0) {
            return (
                <p style={{ textAlign: 'center', flexGrow: 1 }}>
                    You don't have any entries yet!
                    </p>
            )
        }

        let result = (filteredEntries || []).map((id) => {
            var entry = this.props.entries[id];


            if (!entry) return null;
            var revisionID = entry.revisions[entry.revisions.length - 1];
            let revision = this.props.revisions[revisionID] || {};

            if ((this.state.searchTerm == "") || this.searchString(revision.title, this.state.searchTerm)) {
                if ((entry.revisions.length == 1) || (this.state.showModified)) {
                    if ((!entry.isHidden) || (this.state.showHidden)) {
                        if ((!entry.isDeleted) || (this.state.showDeleted)) {
                            return <ListItem
                                key={id}
                                title={revision.title || ''}
                                caption={moment(revision.createdAt).local().format("DD/MM/YYYY - hh:mm a") || ''}
                                onClick={() => this.props.history.push(`${this.props.match.url}/${id}`)} />
                        }
                    }
                }
            } else {
                return null;
            }
        })
        // debugger;
        console.log("here");
        const hasValues = result.filter((val) => val != null)
        console.log(result);
        console.log(hasValues)
        if (hasValues.length == 0 && this.state.searchTerm != "") {
            return (
                <p style={{ textAlign: 'center', flexGrow: 1 }}>
                    No search results!
                </p>
            )
        } else if (hasValues.length == 0) {
            console.log('115')
            return (
                <p style={{ textAlign: 'center' }}>
                    No results found with your current filter settings!
                    </p>
            )
        }

        return result.reverse();


    }

    calcColour = (_bgColor) => Colour(_bgColor).light() ? "#333333" : "#F8F8F8";

    componentDidUpdate(prevProps, prevState) {
        console.log(" ---- CDU -----")
        console.log(prevProps.journal);
        console.log(prevProps.journal.entries);

        console.log(this.props.journal);
        console.log(this.props.journal.entries);

    }

    render() {
        this.journal = this.props.journal;
        // this.entries = this.journal.entries;

        console.log(this.journal);

        return (
            <div style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                padding: "12px", boxShadow: "blur", boxShadow: "4px 0px 4px -2px rgba(0,0,0,.25)", zIndex: 1,
            }}>
                <TextInput name="searchTerm" placeholder="Search..." style={{ marginTop: "00px", marginBottom: "12px" }} onChange={this.onSearchChange.bind(this)} />

                {this.state.isFilterOpen &&
                    <FilterOptions
                        onDeletedChange={(elem) => this.updateCheckbox("showDeleted", elem)}
                        onHiddenChange={(elem) => this.updateCheckbox("showHidden", elem)}
                        onModifiedChange={(elem) => this.updateCheckbox("showModified", elem)}
                        showModified={this.state.showModified}
                        showHidden={this.state.showHidden}
                        showDeleted={this.state.showDeleted}
                    />
                }

                <Button label="Filter Options" variant="clear" width="100%" height="48px" onClick={() => this.setState({ isFilterOpen: !this.state.isFilterOpen })} />

                <div style={{ flexGrow: 1, marginTop: "12px", overflow: 'auto' }}>
                    {
                        // this.state.entryList
                        this.generateList()
                    }
                </div>

                <Button
                    label="New Entry" style={{ color: this.calcColour(this.journal.colour) }} colour={this.journal.colour}
                    width="100%" height="70px"
                    onClick={() => this.props.history.push(`${this.props.match.url}/new`)}
                />
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
        selectEntry: (entryID, journalID) => { console.log("here"); dispatch(selectEntry(entryID, journalID)) }

    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withProtection(withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryList)))

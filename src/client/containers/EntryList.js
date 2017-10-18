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
import Spinner from "../components/Spinner/index.js";


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
            entryList: [],
            fromValue: '',
            toValue: '',
        }
    }


    componentDidMount() {
        let journalID = this.props.match.params.id;
        this.setState({ entryList: [<Spinner />] })
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

    searchBody = (entryBody, searchTerm) => { 
        console.log(entryBody);
        console.log(typeof entryBody);
        console.log('---');
        console.log(searchTerm);

        for( let block of JSON.parse(entryBody).blocks) { 
            if(block.text) {
                if(block.text.toLowerCase().includes(searchTerm.toLowerCase())){
                    return true;
                }
            }
        }
        return false;
    }

    generateList = () => {
        console.log(this.props)
        if (!this.journal || !this.journal.entries) return (<Spinner />);
        let filteredEntries = this.journal.entries.map((id) => this.props.entries[id] || null);
        filteredEntries = filteredEntries.filter((entry) => entry !== null)

        if (filteredEntries.length == 0) {
            return (
                <p style={{ textAlign: 'center', flexGrow: 1 }}>
                    You don't have any entries yet!
                </p>
            )
        }

        //Filter for Modified
        filteredEntries = filteredEntries.filter(
            (entry) => (entry.revisions.length == 1) || (this.state.showModified));

        //Filter for Hidden
        filteredEntries = filteredEntries.filter(
            (entry) => (!entry.isHidden) || (this.state.showHidden));

        //Filter for Deleted
        filteredEntries = filteredEntries.filter(
            (entry) => (!entry.isDeleted) || (this.state.showDeleted));

        //Filtered for Search (title) 
        filteredEntries = filteredEntries.filter(
            (entry) => {
                const revisionID = entry.revisions[entry.revisions.length - 1];
                const revision = this.props.revisions[revisionID] || {};
                return (this.state.searchTerm == "")
                    || this.searchString(revision.title, this.state.searchTerm)
                    || this.searchBody(revision.content, this.state.searchTerm)
            }
        )

        //Filter date (from)
        filteredEntries = filteredEntries.filter(
            (entry) => moment(entry.createdAt).isSameOrAfter(moment(this.state.fromValue), 'day')
                || this.state.fromValue == ''
        )

        //Filter date (to) 
        filteredEntries = filteredEntries.filter(
            (entry) => moment(entry.createdAt).isSameOrBefore(moment(this.state.toValue), 'day')
                || this.state.toValue == ''
        )

        let result = filteredEntries.map(
            (entry) => {
                const revisionID = entry.revisions[entry.revisions.length - 1];
                const revision = this.props.revisions[revisionID] || {};
                return (<ListItem
                    key={entry._id}
                    active={this.props.activeEntryID == entry._id}
                    title={revision.title || ''}
                    caption={moment(revision.createdAt).local().format("DD/MM/YYYY - hh:mm a") || ''}
                    onClick={() => this.props.history.push(`/journal/${this.props.match.params.id}/${entry._id}`)}
                />)
            }
        )

        const hasValues = result.filter((val) => val != null)
        if (hasValues.length == 0 && this.state.searchTerm != "") {
            return (
                <p style={{ textAlign: 'center', flexGrow: 1 }}>
                    No search results!
                </p>
            )
        } else if (hasValues.length == 0) {
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

    handleDateChange = (evt, name) => {
        const value = evt.target.value;
        console.log(value, name);
        console.log(value);
        if (name == "fromValue" && this.state.fromValue == '') {
            console.log("setting both");
            this.setState({ fromValue: value, toValue: value })
        } else if (name == "fromValue" && value == "") {
            this.setState({ fromValue: value, toValue: value })
        } else {
            this.setState({ [name]: value })
        }
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
                <div style={{flexShrink: '0'}}>
                    <TextInput name="searchTerm" placeholder="Search..." style={{ marginTop: "00px", marginBottom: "12px" }} onChange={this.onSearchChange.bind(this)} />

                    {this.state.isFilterOpen
                        // || true //remove before commiting
                        &&
                        <FilterOptions
                            onDeletedChange={(elem) => this.updateCheckbox("showDeleted", elem)}
                            onHiddenChange={(elem) => this.updateCheckbox("showHidden", elem)}
                            onModifiedChange={(elem) => this.updateCheckbox("showModified", elem)}

                            showModified={this.state.showModified}
                            showHidden={this.state.showHidden}
                            showDeleted={this.state.showDeleted}

                            handleUpdate={this.handleDateChange}
                            fromValue={this.state.fromValue}
                            toValue={this.state.toValue}

                        />
                    }

                    <Button label={this.state.isFilterOpen ? "CLOSE" : "Filter Options"} variant="clear" width="100%" height="48px" onClick={() => this.setState({ isFilterOpen: !this.state.isFilterOpen })} />
                </div>
                <div style={{ flexGrow: 1, marginTop: "12px", overflow: 'auto' }}>
                    {
                        // this.state.entryList
                        this.generateList()
                    }
                </div>

                <Button
                    label="New Entry" colour={this.journal.colour}
                    width="100%" height="70px"
                    onClick={() => this.props.history.push(`/journal/${this.props.match.params.id}/new`)}
                    style={{ flexShrink: '0', color: this.calcColour(this.journal.colour) }}
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
    // console.log(ownProps.match.params);
    return {
        journalID: ownProps.match.params.id,
        journal: state.data.journals[ownProps.match.params.id] || {},
        entries: state.data.entries,
        revisions: state.data.entryRevisions,
        activeEntryID: ownProps.match.params.entry,
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

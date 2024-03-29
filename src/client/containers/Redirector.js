import React from 'react';
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
import {  getEntry, getJournal } from "../redux/actions.js";
import {withProtection} from "./Protector.js"
import Spinner from "../components/Spinner/"
/**
 * This handles redirecting on the route journal view
 * If the Journal has entries, it will load the latest entry 
 * If the journal doesn't have an entry, it will load the new entry Container
 */
class Redirector extends React.Component {

    constructor(props) { 
        super(props)
        this.state = {
            loaded: false
        }
    }

    componentDidMount() { 
        console.log("update");
        if(this.props.needsLoading)
            this.props.getJournal().then( (response) => {
                // if(response.success) {
                    console.log(response);
                    const journal = response.payload.payload.entities.journals[response.payload.payload.result]
                    const promises = journal.entries.map( (id) => this.props.getEntry(id));
                    console.log(promises);
                    Promise.all(promises).then( 
                        // () => this.setState({loaded: true})   
                    )
                // }
            })
        else { 
            this.setState({loaded: true})
        }
        // this.props.getEntry()
    }


    render() {
        console.log(this.props);
        if(this.props.needsLoading) { 
            return <Spinner />
        }
        const {journal} = this.props 
         if (journal.entries.length == 0 ) { 
            return <Redirect to={`${this.props.location.pathname}/new`} />
        } else if (journal.entries.length != 0 ) { 
            // console.log(this.props.journals[id]);
            // console.log(this.props.journals[id].map)
            let journalEntry = this.props.entries;
            journalEntry = journalEntry.filter( 
                (entry) => {
                    console.log(entry)
                    // console.log(!entry.isHidden, !entry.isDeleted, entry.length == 1)
                    return !entry.isHidden && !entry.isDeleted && entry.revisions.length == 1; 
                }
            )
            console.log('---- journal entry----')
            console.log(journalEntry);
            console.log(journalEntry[0]._id)
            console.log(this.props.entries);
            return <Redirect to={`${this.props.location.pathname}/${journalEntry[journalEntry.length - 1]._id}`} />
        } else { 
            return <Redirect to={`${this.props.location.pathname}/new`} />
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    const journalID = ownProps.match.params.id;
    const journal = state.data.journals[journalID];
   
    const entries = journal && journal.entries.map( (id) => state.data.entries[id] || null ) || []
    console.log(entries)
    if(!journal || entries.includes(null)) return {
        needsLoading: true,
    }

    return {
        needsLoading: false, 
        journal: journal,
        entryIDs: journal.entries || [],
        entries: entries
    }
}

const mapDispatchToProps = (dispatch, ownProps ) => {
    const journalID = ownProps.match.params.id;

    return {
        getEntry: (id) => dispatch(getEntry(id)),
        getJournal: () => dispatch(getJournal(journalID))
    }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Redirector));


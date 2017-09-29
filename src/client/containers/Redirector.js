import React from 'react';
import { connect } from "react-redux";
import {Redirect} from "react-router-dom";
/**
 * This handles redirecting on the route journal view
 * If the Journal has entries, it will load the latest entry 
 * If the journal doesn't have an entry, it will load the new entry Container
 */
class Redirector extends React.Component {
    render() {
        const id = this.props.match.params.id;
        const journal = this.props.journals[id]
        console.log(this.props);
        console.log(`${id} - ID\n${this.props.journals[id]} - Journal`)
        if(!this.props.journals[id]) {
            console.log("case 1");
            return <Redirect to="/home" />
        } else if (journal.entries.length == 0 ) { 
            return <Redirect to={`${this.props.location.pathname}/new`} />
        } else if (journal.entries.length != 0 ) { 
            return <Redirect to={`${this.props.location.pathname}/${journal.entries.slice(-1)[0]}`} />
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        journals: state.data.journals,
        entries: state.data.entries
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Redirector);


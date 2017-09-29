/*
*   This renders the Entry List, and then whatever route is required (/, /new, /:id) 
    TODO: Should '/' just redirect to the latest entry? 
*/
import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, getEntry, selectControl } from "../redux/actions.js";

import EntryList from "./EntryList.js";
import JournalBar from "../components/JournalBar";
import ControlButton from "../components/ControlButton";
import { RouteWithSubRoutes } from "../Routes.js";
import Colour from "color";


class EntryContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // console.log(this.props);
        let journalID = this.props.match.params.id;
        this.props.getJournal(journalID);
    }

    getEntries = () => {
        let journalID = this.props.match.params.id;
        let journal = this.props.journalObjs[journalID];
        for (var entry of journal.entries)
            if (!this.props.entries[entry])
                this.props.getEntry(entry);
    }

    calcColour = ( _bgColor ) =>  Colour(_bgColor).light() ? "#333333" : "#F8F8F8";        

    render() {
        let journalID = this.props.match.params.id;
        let journal = this.props.journalObjs[journalID] || {};
        console.log(this.props.routes);
        console.log(this.props.match);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <JournalBar textColor={this.calcColour(journal.colour)} colour={journal.colour} title={journal.title} arrowClick={() => this.props.history.push("/home")} />
                <div style={{ display: 'flex', flexGrow: 1 }}>
                    <EntryList />
                    <Switch>
                        {this.props.routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))}
                    </Switch>
                   
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        journalObjs: state.data.journals,
        entries: state.data.entries,
        entry: state.ui.journalEntry[ownProps.match.params.id] ? state.data.entries[state.ui.journalEntry[ownProps.match.params.id]] : null,

        selectedEntries: state.ui.journalEntry

    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id)),
        getEntry: (id) => dispatch(getEntry(id)),
        selectControl: (type) => dispatch(selectControl(type))


    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EntryContainer));


const NoMatch = ({ location }) => (
    <div>
        <h3>No match for <code>{location.pathname}</code></h3>
    </div>
)


const ID = ({ location }) => (
    <div>
        <h3>Page ID: <code>{location.pathname}</code></h3>
    </div>
)

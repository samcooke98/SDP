/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal } from "../redux/actions.js";

import JournalButton from "../components/JournalButton/JournalButton.js"
import FloatingButton from "../components/FloatingButton/FloatingButton.js"

import Add from "react-icons/lib/md/add.js"

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        //Do we need to get the journals? 
        console.log(this.props);
        for (var id of this.props.user.journals) {
            if (!this.props.journalsObjs[id])
                this.props.getJournal(id);
        }
    }

    openJournal = (id) => {
        console.log("here");
        this.props.history.push(`/journal/${id}`)
    }

    render() {
        return (
            <div>
                <h1> Welcome back, {this.props.user.name} </h1>
                <div style={
                    {
                        display: 'flex',
                        flexWrap: "row",
                        maxWidth: '1200px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        justifyContent: 'space-evenly'
                    }}>
                    {this.props.user.journals.map((journalID) => {
                        if (this.props.journalsObjs[journalID]) {
                            return (
                                <JournalButton
                                    key={journalID}
                                    onPress={this.openJournal.bind(this, journalID)}
                                    title={this.props.journalsObjs[journalID].title}
                                />)
                        }
                    })}
                    <FloatingButton>
                        <Add/>
                    </FloatingButton>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        journalsObjs: state.data.journals,
        user: state.data.users[state.misc.userID]
    }
}
//Typically would implement actions
const mapDispatchToProps = (dispatch) => {
    return {
        getJournal: (id) => dispatch(getJournal(id))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));

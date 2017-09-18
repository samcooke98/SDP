/*
* Basic Container Component Template
*/
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getJournal, createJournal } from "../redux/actions.js";

import JournalButton from "../components/JournalButton/JournalButton.js"
import FloatingButton from "../components/FloatingButton/FloatingButton.js"
import Button from "../components/Button/Button.js";
import TextInput from "../components/TextInput/TextInput.js"

import Add from "react-icons/lib/md/add.js"

//TODO: Change Button to be a link 
//TODO: Make Colour Work
class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newJournal: ''
        }

    }

    componentWillMount() {
        //Load the Journals if they don't already exist
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

    createJournal = (evt) => {
        //Reset State
        this.props.createJournal(this.state.newJournal);
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
                        justifyContent: 'space-evenly',
                        alignItems: 'space-evenly',
                        flexWrap: 'wrap'
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
                </div>
                <TextInput name='newJournal' onChange={TextInput.onChange.bind(this)} type='text' />
                <Button onClick={this.createJournal} label="Create Journal (TEMP)" width={100} />
                <FloatingButton>
                    <Add />
                </FloatingButton>
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
        getJournal: (id) => dispatch(getJournal(id)),
        createJournal: (journalName) => dispatch(createJournal(journalName))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));

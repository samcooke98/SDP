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

import Modal from "../components/Modal/Modal.js";

import Add from "react-icons/lib/md/add.js"

//TODO: Change Button to be a link 
//TODO: Make Colour Work
class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            colour: "",
            dialog: false
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
        this.setState({ dialog: false });
        this.props.createJournal(this.state.name, this.state.colour);
    }
    //TODO: This doesn't render as per design, because it is flex - Should be grid or table 
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
                        justifyContent: 'left',
                        alignItems: 'space-evenly',
                        flexWrap: 'wrap'
                    }}>
                    {this.props.user.journals.map((journalID) => {
                        if (this.props.journalsObjs[journalID]) {
                            console.log(this.props.journalsObjs[journalID])
                            return (
                                <JournalButton
                                    colour={this.props.journalsObjs[journalID].colour}
                                    key={journalID}
                                    onPress={this.openJournal.bind(this, journalID)}
                                    title={this.props.journalsObjs[journalID].title}
                                    date={this.props.journalsObjs[journalID].createdAt}
                                />)
                        }
                    })}
                </div>
                <FloatingButton onClick={() => this.setState({ dialog: !this.state.dialog })}>
                    <Add />
                </FloatingButton>
                {this.state.dialog &&
                    <Modal label="Create Journal" onClose={() => this.setState({ dialog: false })}>
                        <form onSubmit={this.createJournal}> 
                        <TextInput label="Name:" name="name" onChange={TextInput.onChange.bind(this)} />
                        <TextInput label="Colour:" name="colour" onChange={TextInput.onChange.bind(this)} />
                        <Button onClick={this.createJournal}
                            label="Create"
                        />
                        </form>
                    </Modal>
                }
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
        createJournal: (journalName, colour) => dispatch(createJournal(journalName, colour))
    }
}

//withRouter connects to react-router: (https://reacttraining.com/react-router/web/guides/redux-integration) 
//Connect connects to the redux store: (redux.js.org/docs/basics/UsageWithReact.html) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));

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

//Want more colours? add them here
const colours = [
    "#333333",
    "#4F4F4F",
    "#EB5757",
    "#2F80ED",
    "#F2994A",
    "#219653",
    "#9B51E0",
    "#E0E0E0",
    "#F2F2F2"
]


class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            colour: "",
            dialog: false,
        }
        colours.map((color) => this.state[color] = true)

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
                            {/* <TextInput label="Colour:" name="colour" onChange={TextInput.onChange.bind(this)} /> */}
                            <p style={{ margin: '0', color: "#333333", fontFamily: "Raleway", fontWeight: 'bold', fontSize: "28px", marginBottom: "5px" }}> 
                                Colour: 
                            </p>
                            <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'left' }}>
                                {colours.map((colour) => {
                                    return <ColorInput key={colour} color={colour} selected={this.state.colour == colour} onClick={
                                        (evt) => {
                                            this.setState({ colour: colour })
                                        }
                                    } />
                                })}
                            </div>
                            <div style={{height: "32px"}}/>
                            <Button onClick={this.createJournal}
                                label="Create"
                                width="100%"
                                height="32px"
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


const ColorInput = ({ color, selected, onClick }) => {
    return (
        <div style={{
            margin: "3px",
            width: "48px",
            height: "48px",
            backgroundColor: color,
            borderRadius: "10px",
            cursor: "hand",
            boxSizing: 'border-box',
            border: selected ? "3px solid aliceblue" : ""
        }}
            onClick={onClick}
        />
    )
}

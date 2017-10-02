import React, { Component } from 'react';
import Button from "./Button/Button.js";
import Modal from "./Modal/Modal.js";


export default class Dialog extends Component {
    render() {
        return (
            <Modal
                onClose={this.props.onClose}
                label={this.props.label}
                contain

            >
                <p> {this.props.text} </p>
                <div style={{
                    display: 'flex', flexDirection: "row", justifyContent: "space-around"
                }}>
                    {
                        this.props.actions.map((actionDescription, count) => (
                            <Button
                                //width={"/48px"}
                                height={"32px"}

                                onClick={actionDescription.onClick}
                                label={actionDescription.label}
                            />
                        ))
                    }

                </div>

            </Modal>
        );
    }
}
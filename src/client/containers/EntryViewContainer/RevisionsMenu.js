
import React, { Component } from 'react';
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js"
import moment from "moment";

import Modal from "../../components/Modal/Modal.js";
import EntryPreview from "../../components/EntryPreview";

/**
 * 
 */
export default class RevisionsMenu extends Component {
    render() {
        return (
            <Modal
                label="Revision History"
                onClose={this.props.onClose}
                wider
            >
                {this.props.revisions.map((revision) => {
                    const journalID = this.props.journalID;
                    const entryID = this.props.entryID;
                    return (
                        <EntryPreview
                            key={revision._id}
                            date={moment(revision.createdAt).local().format("DD/MM/YYYY - hh:mm")}
                            title={revision.title}
                            preview={
                                stateToHTML(convertFromRaw(JSON.parse(revision.content)))}
                            to={`/journal/${journalID}/${entryID}/${revision._id}`}
                            colour={this.props.colour}
                            onClick={this.props.onClose}
                        />
                    )
                }).reverse() //We reverse because we push new entries into the array. Thus this is reversed, so we reverse it back
                }
            </Modal>
        );
    }
}
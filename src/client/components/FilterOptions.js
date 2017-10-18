import React from "react";
import Checkbox from "./Checkbox/Checkbox.js";
import DateSelector from "./DateSelector/DateSelector.js";

export default class FilterOptions extends React.Component {
    render() {
        return (
            <div style={{
                marginBottom: "20px"
            }}>
                <Checkbox title="SHOW HIDDEN" checked={this.props.showHidden} onChange={this.props.onHiddenChange}/>
                <Checkbox title="SHOW DELETED" checked={this.props.showDeleted} onChange={this.props.onDeletedChange}/>
                <br />
                <DateSelector />
            </div>
        )
    }
}
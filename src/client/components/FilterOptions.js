import React from "react";


export default class FilterOptions extends React.Component {
    render() {
        return (
            <div style={{
                border: '1px solid black'
            }}>
                SHOW HIDDEN
                SHOW DELETED
                FROM DATE
                TO DATE
            </div>
        )
    }
}
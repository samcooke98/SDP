import React from "react";


export default class FilterOptions extends React.Component {
    render() {
        return (
            <div style={{
                border: '1px solid black',
                marginBottom: "10px"
            }}>
                SHOW HIDDEN
                <br />
                SHOW DELETED
                <br />
                FROM DATE
                <br />
                TO DATE
            </div>
        )
    }
}
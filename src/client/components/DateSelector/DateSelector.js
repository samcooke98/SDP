import React from "react";
import styles from "./web.css";

export default class DateSelector extends React.Component {
    render() {
        return (
            <table className={styles.dateSelectorTable}>
                <tr>
                    <td>
                        FROM
                    </td>
                    <td>
                        <div className={styles.picker}>28/08/17</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        TO
                    </td>
                    <td>
                        <div className={styles.picker}>28/08/17</div>
                    </td>
                </tr>
            </table>
        )

    }
}
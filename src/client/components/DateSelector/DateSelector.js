import React from "react";
import styles from "./web.css";

export default (props) => {
    console.log(props);
        return (
            <div>
                <span className={styles.container}>
                    <label> FROM </label>
                    <input className={styles.date} type="date" name='fromValue' value={props.fromValue} onChange={
                        (evt) => props.onChange(evt, evt.target.name) 
                    } min={"18-10-2017"}/>
                </span>
                <span className={styles.container}>
                    <label> TO </label>
                    <input 
                        className={styles.date} type="date" name='toValue' value={props.toValue} onChange={
                        (evt) => props.onChange(evt, evt.target.name) 
                    }
                        min={props.fromValue}
                    />
                </span>
            </div>
        )
    }

import React, { Component } from 'react';
import style from "./web.css"

import { Link } from "react-router-dom"


export default class EntryPreview extends Component {
    render() {
        return (
            <div className={style.card}>
                <h3> {this.props.title} - {this.props.date} </h3>
                <span className={style.content} dangerouslySetInnerHTML={({ __html: this.props.preview.replace("<p>&nbsp;</p>", '') })} />

                <Link to={this.props.to} onClick={this.props.onClick}> Open Entry </Link>
            </div>
        );
    }
}

function createMarkup() {
    return { __html: 'First &middot; Second' };
}
//TODO: Prevent XSS 

/*
<Link to={`/journal/${id}/${entry}/${val}`}>
                                            {val} <br />
                                        </Link>*/

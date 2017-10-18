import React, { Component } from 'react';
import style from "./web.css"

import { Link } from "react-router-dom"
import moment from 'moment'
import Colour from "color";

export default class EntryPreview extends Component {

    calcColour = ( _bgColor ) =>  Colour(_bgColor).light() ? "#333333" : "#F8F8F8";

    render() {
        return (
            <div className={style.card}>
                <h3 className={style.title}> {this.props.title}</h3>
                <div className={style.hr} />
                <p className={style.date}>{this.props.date}</p>
                <span className={style.content} dangerouslySetInnerHTML={({ __html: this.props.preview.replace("<p>&nbsp;</p>", '') })} />
                <br />
                <Link to={this.props.to} onClick={this.props.onClick} className={style.viewButton} style={Object.assign({backgroundColor: this.props.colour || '', color: this.calcColour(this.props.colour)})}> View 

                </Link>
            </div>
        );
    }
}

EntryPreview.defaultProps = { 
    preview: "Hello World!",
    to: "/",
    onClick: () => {},
}

function createMarkup() {
    return { __html: 'First &middot; Second' };
}
//TODO: Prevent XSS 

/*
<Link to={`/journal/${id}/${entry}/${val}`}>
                                            {val} <br />
                                        </Link>


<Link to={this.props.to} onClick={this.props.onClick}> Open Entry </Link>*/

import React from 'react'
import './Card.css'
export default function(props){
    return(
        <div className="box b3" style={props.style}>
            <h1>{props.heading}</h1>
            {props.content}
        </div>
    )
}
import React from "react";
import './Footer.css'
export default function(){
    let style={"display":"flex","flexDirection":"column",}
    return(
        <footer style={style}>
            <div>
                <h2>Contact Us</h2>
                <ul>
                    <li><p>12 Km Stone, Amritsar Jalandhar,<br/>G.T Road, Amritsar-143001(PB),India</p></li>
                </ul>
                
                
            </div>
            <div>
                <h2>Quick Links</h2>
                <ul>
                    <li><a>College Website</a></li>
                    <li><a>Scholarship</a></li>
                    <li><a>Blog</a></li>
                    <li><a>Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    )
}
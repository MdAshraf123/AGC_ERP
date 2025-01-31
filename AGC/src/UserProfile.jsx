import React from 'react';
import './userProfile.css';
const UserProfile=()=>{
    return(
        <>
            <div className="profile-can">
                <h1>Profile</h1>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Name</li>
                    <li class="list-group-item">Class</li>
                    <li class="list-group-item">A third item</li>
                    <li class="list-group-item">A fourth item</li>
                    <li class="list-group-item">And a fifth one</li>
                </ul>
            </div>
        </>
    )
}
export default UserProfile;
import React, { useState } from "react";

function User(props) {
    const [user, setUser] = useState(props.user);

    return (
        <div className="user">
            <div className="user-info">
                <div className="user-email">{user.email}</div>
                <div className="user-name">{user.user_metadata.display_name} {user.user_metadata.name}</div>
            </div>
            <div className="user-actions">
                <button className="deleteUserBtn" onClick={() => props.deleteUser(user.id, user.email)}>Benutzer löschen</button>
            </div>
        </div>
    );
}

export default User;
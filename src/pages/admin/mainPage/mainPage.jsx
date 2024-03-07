import React, { useEffect, useState } from 'react';

function Main(props) {
const [user, setUser] = useState(props.user);

console.log(user);


    return (
        <>
            <h1>ADMIN-POWER!!!</h1>
            <p>Hallo {user.user_metadata.display_name}!</p>
            <button className="signOutBtn" onClick={props.signOut}>Abmelden</button>
        </>
    );
}

export default Main;




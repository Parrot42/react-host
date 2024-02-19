import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    'https://kzhiwdgwtormdlysnkja.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGl3ZGd3dG9ybWRseXNua2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxNDQsImV4cCI6MjAyMzU4MjE0NH0.cZcJoq_06f7ynmyTqsFC8dA9judjjQonQyieLxfVvnY'
)


function Success() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
            async function getUserData() {
                await supabase.auth.getUser().then((value) => {
                    if(value.data?.user) {
                        setUser(value.data.user);
                        console.log(value.data.user);
                    }
                });
            }
            getUserData();
            console.log("test")
        }
    , []);

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log('Error logging out:', error.message);
        } else {
            navigate('/');
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                {Object.keys(user).length !== 0 ?
                <>
                    <h1>Success!</h1>
                    <p>Welcome {user.user_metadata.display_name}!</p>
                    <button className="signOutBtn" onClick={signOut}>Sign Out</button>
                </>
                :
                <>
                    <h1>Anmelden...</h1>
                    <button onClick={signOut}>Abbrechen</button>
                </>
                }
            </header>
        </div>
    );
}

export default Success;

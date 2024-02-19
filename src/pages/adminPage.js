import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';


let supabase = createClient(
    'https://kzhiwdgwtormdlysnkja.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGl3ZGd3dG9ybWRseXNua2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxNDQsImV4cCI6MjAyMzU4MjE0NH0.cZcJoq_06f7ynmyTqsFC8dA9judjjQonQyieLxfVvnY'
)


function Admin() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
            async function getUserData() {
                await supabase.auth.getUser().then((value) => {
                    if(value.data?.user) {
                        setUser(value.data.user);
                        console.log(value.data.user);
                        if (value.data.user.user_metadata.admin_key !== false) {
                            console.log('admin');
                            window.isAdmin = true;
                            supabase = createClient('https://kzhiwdgwtormdlysnkja.supabase.co', value.data.user.user_metadata.admin_key, {
                            auth: {
                                autoRefreshToken: false,
                                persistSession: false
                            } 
                            })
                        } else {
                            console.log('not admin');
                            window.isAdmin = false;
                        }
                    }
                });
            }
            getUserData();
            console.log("admintest")
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
   
    async function newUser() {
        const { data, error } = await supabase.auth.admin.createUser({
            email: 'BALDUIN6000@gmail.com',
            password: 'Til1man2',
            email_confirm: true,
            user_metadata: { display_name: 'Yoda' }
        })
    }


    return (
        <div className="App">
            <header className="App-header">
                {window.isAdmin === true ?
                <>
                    <h1>ADMIN-POWER!!!</h1>
                    <p>Welcome!</p>
                    <button className="signOutBtn" onClick={signOut}>Sign Out</button>
                    <button onClick={newUser}>Create User</button>
                </>
                :
                <>
                    <h1>Es ist kein Benutzer mit Adminrechten angemeldet</h1>
                    <button onClick={signOut}>Zurück zum Login</button>
                </>
                }
            </header>
        </div>
    );
}

export default Admin;

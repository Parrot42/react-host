import { Routes, Route } from 'react-router-dom';
import Main from './mainPage/mainPage';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/nav/navbar';
import New from './newUser/new';
import UserList from './userList/user';


let supabase = createClient(
    'https://kzhiwdgwtormdlysnkja.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGl3ZGd3dG9ybWRseXNua2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxNDQsImV4cCI6MjAyMzU4MjE0NH0.cZcJoq_06f7ynmyTqsFC8dA9judjjQonQyieLxfVvnY'
)

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState({});
    const [supabaseAdmin, setSupabaseAdmin] = useState({});


    useEffect(() => {
            async function getUserData() {
                await supabase.auth.getUser().then((value) => {
                    if(value.data?.user) {
                        console.log(value.data.user);
                        setUser(value.data.user);
                        if (value.data.user.user_metadata.admin_key !== false) {
                            console.log('admin');
                            setIsAdmin(true);
                            setSupabaseAdmin(
                                createClient(
                                    'https://kzhiwdgwtormdlysnkja.supabase.co',
                                    value.data.user.user_metadata.admin_key
                                )
                            );
                        } else {
                            console.log('not admin');
                        }
                    }
                });
            }
            getUserData();
            console.log("admintest")
        }
    , []);

    async function signOut() {
        const { error } = await createClient(
            'https://kzhiwdgwtormdlysnkja.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGl3ZGd3dG9ybWRseXNua2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxNDQsImV4cCI6MjAyMzU4MjE0NH0.cZcJoq_06f7ynmyTqsFC8dA9judjjQonQyieLxfVvnY'
        ).auth.signOut();
        if (error) {
            console.log('Error logging out:', error.message);
        } else {
            window.location.href = '/react-host/';
        }
    }



    return (
        <>          
            {isAdmin ?
                <> 
                    <Navbar home={['Home', '/admin']} links={[['Neuer Benutzer', '/admin/new'], ['Benutzerliste', '/admin/user'], ['Gürkchen', '/admin/gurke']]}/>
                    <div className='bigContainer'>
                        <Routes>
                            <Route path="/" element={<Main user={user} signOut={signOut}/>} />
                            <Route path="/new" element={<New supabase={supabaseAdmin}/>} />
                            <Route path='/user' element={<UserList supabase={supabaseAdmin}/>} />
                            <Route path='/gurke' element={<h1>Gurke</h1>} />
                        </Routes>
                    </div>
                </>
                :
                <>
                    
                </>
            }
</>

    );

}

export default Admin;

import { Routes, Route } from 'react-router-dom';
import Main from '../singedIn/mainPage';
import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import Navbar from './components/nav/navbar';
import NewQuiz from './newQuiz';
import { useNavigate } from 'react-router-dom';
import './app.css';
import Login from './components/loginPage';

const supabase = createClient(
    'https://vhzvxyrhlteqlktklgan.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoenZ4eXJobHRlcWxrdGtsZ2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMDEwMjIsImV4cCI6MjA1ODY3NzAyMn0.I0CtuRDg644nO6reKi9ys02obAaSELfURSw_9lgO2AY'
)

function App() {
    const [user, setUser] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const navigate = useNavigate();

    async function getUserData() {
        await supabase.auth.getUser().then((value) => {
            if(value.data?.user) {
                console.log(value.data.user);
                setSignedIn(true);
                if(value.data.user.user_metadata.admin_key === undefined) {
                    setUser(value.data.user);
                } else {
                    navigate('/admin');
                }
            }
        });
    }


    supabase.auth.onAuthStateChange(async (event) => {
        console.log('Auth event');
        if (event === 'SIGNED_IN') {
            getUserData();
        } else if (event === 'SIGNED_OUT') {
            setSignedIn(false);
        }
    }
    );

    async function signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.log('Error logging out:', error.message);
        }
    }


    return (
        <>
            {signedIn ?
                <>
                    <Navbar home={['Home', '/']} links={[['Salzig', '/sulz'], ['Neues Quiz', '/new']]} />
                    <div className='bigContainer'>
                        <Routes>
                            <Route path="/" element={<Main signOut={signOut} user={user}/>} />
                            <Route path="/sulz" element={<h1>Sulz</h1>} />
                            <Route path="/new" element={<NewQuiz supabase={supabase} user={user} />} />
                        </Routes>
                    </div>
                </>
                :
                <>
                    <Login />
                </>
            }
        </>
    );
}

export default App;
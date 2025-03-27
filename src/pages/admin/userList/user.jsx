import './user.css';
import React, { useEffect, useState } from 'react';
import User from './components.jsx'

function UserList(props) {
    const [users, setUsers] = useState([]);
    const supabase = props.supabase;

    async function deleteUser(id, email) {
        if(window.confirm('Soll der Benutzer ' + email + ' wirklich gelöscht werden?')) {
            const { error } = await supabase.auth.admin.deleteUser(id);
            if (error) {
                console.log('Error deleting user:', error.message);
            } else {
                console.log('User deleted');
                getUsers();
            }
        }
    }

    async function getUsers() {
           
        await supabase.auth.admin.listUsers().then((value) => {
            console.log(value.data.users);
            setUsers(value.data.users);
        });
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div className="userList">
                {users.map((user) => {
                    return <User key={user.id} user={user} deleteUser={deleteUser}/>
                })}
            </div>
        </>
    );
}

export default UserList;
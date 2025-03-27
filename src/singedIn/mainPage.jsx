import { createClient } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
    'https://kzhiwdgwtormdlysnkja.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aGl3ZGd3dG9ybWRseXNua2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgwMDYxNDQsImV4cCI6MjAyMzU4MjE0NH0.cZcJoq_06f7ynmyTqsFC8dA9judjjQonQyieLxfVvnY'
)


function Main(props) {
    
    async function createTable() {

        let { data, error } = await supabase
        .rpc('add_table', {
            name: 'til' 
        })
      if (error) console.error(error)
      else console.log(data)
      
      }
    
      async function delTable() {
    
        let { data, error } = await supabase
        .rpc('del_table', {
            name: 'testtil'
        })
      if (error) console.error(error)
      else console.log(data)
      }

    return (
        
        <>
            <h1>Success!</h1>
            <p>Welcome {props.user.user_metadata.display_name}!</p>
            <button className="signOutBtn" onClick={props.signOut}>Sign Out</button>
            <button onClick={createTable}>Create Test Table</button>
            <button onClick={delTable}>Delete Test Table</button>
        </>
    );
}

export default Main;

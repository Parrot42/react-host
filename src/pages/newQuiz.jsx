import React, { useEffect, useState } from 'react';
impo
function NewQuiz(props) {
    const [user, setUser] = useState({});
    const supabase = props.supabase;


    return (
        <div>
            <h1>Neues Quiz</h1>
            <button onClick={createTable}>Create Test Table</button>
        </div>
    )

}

export default NewQuiz;
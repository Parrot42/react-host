import React, { useEffect, useState } from 'react';

function NewQuiz(props) {
    const [user, setUser] = useState({});
    const supabase = props.supabase;


    return (
        <div>
            <h1>Neues Quiz</h1>
            </div>
    )

}

export default NewQuiz;
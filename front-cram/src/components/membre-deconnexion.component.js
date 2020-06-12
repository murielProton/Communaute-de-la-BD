import React from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';


const Deconnection = () => {

    const cookies = new Cookies()

    cookies.remove('Session');

    return(
        <div>
            <Redirect to="/connexion"/>;
        </div>
    )
}

export default Deconnection;
import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';



export default class DeconnectionMembre extends Component {

    constructor(props) {
        super(props);
        const cookies = new Cookies()

        cookies.remove('Session');
        this.props.setPseudo(null);
    }
    render() {
    return(
        <div>
            <Redirect to="/connexion"/>;
        </div>
    );
    }
}
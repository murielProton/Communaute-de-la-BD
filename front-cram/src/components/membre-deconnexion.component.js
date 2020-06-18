import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';



export default class Deconnection extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();

        cookies.remove('Session');
        console.log("deconnection");
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
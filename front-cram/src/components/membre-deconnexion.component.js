import React, {Component} from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';



export default class Deconnection extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();

        cookies.remove('Session');
        cookies.remove('Session_id');
        cookies.remove('Session_admin');
        console.log("deconnection");
        this.props.setPseudo(null);
    }
    render() {
    return(
        <div>
            <Redirect to="/"/>;
        </div>
    );
    }
}


import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Redirect } from 'react-router';

export default class AdminDebannirMembre extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirection: false,
        }
    }

    componentDidMount() {
        api.get('admin/membre/debannir/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200 && response !== null) {
                    // console.log(response.data);
                    this.setState({
                        redirection: true
                    });
                } else {
                    console.log('Echec du débanissement');
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    render(){
        if (this.state.redirection) {
            //Redirect to the page
            return <Redirect to={`/admin/membres/liste`}/>;
           }

        // if (!this.state.cookies.get('Session')) { //Empêche d'acceder à la pages aux personnes non connectées
        // return(
        //     <div>
        //         <h5>Bonjour, </h5>
        //         <h5>Cette page est reservée aux membres, pour y accéder vous devez soit vous 
        //             <Link to={"/connexion"}> connecter</Link> soit vous 
        //             <Link to={"/inscription"}> inscrire</Link>.</h5>

        //     </div>
        // )}
        
        return(
        <div style={{marginTop: 60}}><h2>Sur la page débannir un membre !!</h2></div>
        )
    }
}
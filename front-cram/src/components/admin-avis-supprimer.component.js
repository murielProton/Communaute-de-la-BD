import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class AdminSupprimerAvis extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirection: false,
            cookies: new Cookies(),
        }
    }

    componentDidMount() {
        api.get('avis/supprimer/' + this.props.match.params.id)
            .then(response => {
                if (response.status === 200 && response !== null) {
                    // console.log(response.data);
                    this.setState({
                        redirection: true
                    });
                } else {
                    console.log('Echec de la suppression');
                }
            })
            .catch(err => {
                console.log(err)
            });
    }

    render(){
        if (this.state.redirection) {
            //Redirect to the page
            return <Redirect to={`/admin/avis/liste`}/>;
           }

        if (!this.state.cookies.get('Session')) { //Empêche d'acceder à la pages aux personnes non connectées
        return(
            <div>
                <h5>Bonjour, </h5>
                <h5>Cette page est reservée aux membres, pour y accéder vous devez soit vous 
                    <Link to={"/connexion"}> connecter</Link> soit vous 
                    <Link to={"/inscription"}> inscrire</Link>.</h5>

            </div>
        )}
        
        return(
        <div style={{marginTop: 60}}><h2>Sur la page supprimer un avis !!</h2></div>
        )
    }
}
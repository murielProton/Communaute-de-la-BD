import React, {Component} from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../api';

export default class RetirerBedeCollection extends Component {
    constructor(props){
        super(props);

        this.state = {
            redirection: false,
            cookies: new Cookies(),
        }
    }

    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        
        
        api.get('collection/retirer/bd/'+ this.props.match.params.id + "/" + this.state.cookies.get('Session'))
            .then(response => {
                console.log(response.data);
                this.setState({ 
                    bedes: response.data,
                    redirection: true,
                });
             
            })
            .catch(function (err) {
                console.log(err);
            });
    
    }

    render(){
        if (!this.state.cookies.get('Session')) { //Empêche d'acceder à la pages aux personnes non connectées
        return(
            <div>
                <h5>Bonjour, </h5>
                <h5>Cette page est reservée aux membres, pour y accéder vous devez soit vous 
                    <Link to={"/connexion"}> connecter</Link> soit vous 
                    <Link to={"/inscription"}> inscrire</Link>.</h5>

            </div>
        )}

        if (this.state.redirection) { // Redirige vers la page du détail de la bede pour laquelle un avis a été déposé
            return <Redirect to={`/collection/afficher/${this.state.cookies.get('Session')}`}/>;
           }

        return(
            <div style={{marginTop: 20}}>

            <h3>Si tu vois cette page, c'est qu'il y a un problème</h3>
            </div>
        )
    }
}
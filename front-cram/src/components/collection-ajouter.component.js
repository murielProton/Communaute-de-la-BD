import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';

export default class AjouterCollection extends Component {
    constructor(props) {
        super(props);

        this.state ={
            redirection: false,
            cookies: new Cookies(),
        }
    }

    componentDidMount() {

        api.get('collection/ajouter/' + this.props.match.params.id + '/' + this.state.cookies.get('Session'))
            .then(res => {
                console.log('Réponse: ', res);
                this.setState({redirection: true});
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    render(){
        if (this.state.redirection) { // Redirige vers la collection de l'utilisateur
        return <Redirect to={`/collection/rechercher/ajouter`}/>;
           }
        return(
            <div>
                Si tu vois cet écran, c'est que ça fonctionne peut-être ;)
            </div>
        )
    }
}
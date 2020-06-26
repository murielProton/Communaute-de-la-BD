import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class AdminMajAvis extends Component {

    constructor(props){
        super(props);

        this.onChangeContenu = this.onChangeContenu.bind(this); // Pour être sûr que la connexion se fasse avec setState
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {

            contenu: "",
            redirection: false,
            cookies: new Cookies(),
        }
    }

    componentDidMount() { // Permet de récupérer les données de l'avis à modifier afin de les avoir dans le formulaire en valeurs par défaut
        api.get('avis/prendrecontenu/' + this.props.match.params.id) // Dans la route avis du back. Autant réutiliser une route fonctionnelle plus que de faire un copié/collé
            .then(res => {
                console.log("id pour avoir le contenu de l'avis: ", this.props.match.params.id);
                this.setState({
                    contenu: res.data.contenu,
                })
                console.log("Contenu: ", this.state.contenu);
            })
            .catch(function(err) {
                console.log(err);
            })
    }

    onChangeContenu(e) {
        this.setState({
            contenu: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault(); // Permet d'éviter l'envoi de champs vides

        console.log('Formulaire envoyé');
        console.log('Contenu: ', this.state.contenu);

        const majAvis = {
            contenu: this.state.contenu,
        }

        api.post('avis/maj/' + this.props.match.params.id, majAvis)
            .then(response => {
                console.log("retour de l'api.post: ", response.data);
                this.setState({
                    redirection: true,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        if (!this.state.cookies.get('Session')) { //Empêche d'acceder à la pages aux personnes non connectées
        return(
            <div>
                <h5>Bonjour, </h5>
                <h5>Cette page est reservée aux membres, pour y accéder vous devez soit vous 
                    <Link to={"/connexion"}> connecter</Link> soit vous 
                    <Link to={"/inscription"}> inscrire</Link>.</h5>

            </div>
        )}

        if (this.state.redirection) {
            // Redirige vers la page
               return <Redirect to={`/admin/avis/liste`}/>;
           }

        return(
            <div style={{marginTop: 20}}>
                        <h3>Modifier un avis</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <textarea  type="text"
                                className="form-control"
                                rows={5}
                                placeholder="Votre avis"
                                value={this.state.contenu}
                                onChange={this.onChangeContenu}
                                />
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" value="Modifier" className="btn btn-primary" />
                    </div>
                </form> 
            </div>
        )
    }
}
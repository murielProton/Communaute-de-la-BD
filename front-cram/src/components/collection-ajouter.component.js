import React, {Component} from 'react';
import api from '../api'; // Permet de simplifier la requête axios et surtout de modifier plus facilement l'adresse du back lors du déploiement
import { Redirect } from 'react-router';

export default class AjouterCollection extends Component {

    constructor(props){
        super(props);

        this.onChangeSerie = this.onChangeSerie.bind(this); // Pour être sûr que la connexion se fasse avec with setState
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            serie: "",
            redirection: false,
            erreur: false,
        }
    }

    onChangeSerie(e) {
        this.setState({
            serie: e.target.value
        });
    }

    onSubmit(e) {
        console.log("Demande envoyée");
        console.log("Recherche: ", this.state.serie);

        const Recherche = {
            serie: this.state.serie,
        }

        if (this.state.serie.length > 0) {
            console.log("dans le if de la recherche de bd avant ajout à la collection");
            api.post("bede/recherche", Recherche) // Permet de rechercher une bédé pour voir si elle est dans la base de donne et ainsi eviter que l'utilisateur rentre à chaque fois une nouvelle bédé et qu'il puisse compléter les informations si besoin
                .then(res => console.log(res.data));
                console.log('après la requête dans le back');

                this.setstate({
                    redirection: true,
                })
        } else if (this.state.serie.length === 0) {
            this.setState({
                erreur: true,
            })
        }

    }

    render(){
        return(
            <div style={{marginTop: 20}}>
                
            </div>
        )
    }
}
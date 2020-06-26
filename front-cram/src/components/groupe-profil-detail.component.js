import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import RechercheNom from './membre-nom-par-id.component';


export default class GroupeProfilDetail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            membres: [],
            composition_groupe: []
        };
    }
    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        // let id = this.props.match.params.id;
        // let url = 'http://localhost:4242/membre/profil/'+this.props.match.params.id;
        console.log('http://localhost:4242/membre/profil/'+this.props.match.params.id);
        // axios.get('http://localhost:4242/membre/profil/'+this.props.match.params.id)
        api.get('membre/profil/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({ membres: response.data});
                console.log("membres du groupe: ", this.state.composition_groupe);
            })
            .catch(function (err) {
                console.log(err);
            });
        }

    //}
    render() {
        const { membres } = this.state; 
        //formatage de la date entree dans mongodb avec new Intl
        return (
            <div class="container">
            {membres.map(membre =>( 
            <div class="card-container">  
                        <p key={membre.uid}>Membre du groupe : {membre.pseudo}</p>
                        <p key={membre.uid}>Date de Naissance : {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(membre.date_de_naissance))}</p>
                        <p key={membre.uid}>Ville: {membre.ville}</p>
                        <p key={membre.uid}>Membre depuis le: {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(membre.date_inscription))}</p>
                <div className="form-group">
                <Link to={"/collection/groupe/afficher/"+ membre.pseudo} className="btn btn-primary" >Voir sa collection</Link>

                 </div>
            </div>
             ) )}   
            </div>
        )
    }
}

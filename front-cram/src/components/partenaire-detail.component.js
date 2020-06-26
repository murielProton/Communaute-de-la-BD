import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class DetailPartenaire extends Component {
    constructor(props) {
        super(props);
        this.state = { partenaires: []};
    }
    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        // let id = this.props.match.params.id;
        // let url = 'http://localhost:4242/membre/profil/'+this.props.match.params.id;
       // console.log('http://localhost:4242/membre/profil/'+this.props.match.params.id);
        // axios.get('http://localhost:4242/membre/profil/'+this.props.match.params.id)
        api.get('partenaire/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({ partenaires: response.data });
             
            })
            .catch(function (err) {
                console.log(err);
            });
    
        }
    //}
    render() {
        const { partenaires } = this.state; 
        //formatage de la date entree dans mongodb avec new Intl
        return (
            <div class="container">
             
            {partenaires.map(partenaire =>( 
            <div class="card-container">
                <h2 key={partenaire.uid}>Partenaire: {partenaire.nom}</h2>  
                        <p key={partenaire.uid}>Secteur : {partenaire.secteur}</p>
                        <p key={partenaire.uid}>Adresse :{partenaire.adresse} </p>
                        <p key={partenaire.uid}>Ville: {partenaire.ville}</p>
                        <br></br>
                        <p key={partenaire.uid}>Partenaire depuis le : {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(partenaire.date_inscription))}</p>
                        <br></br>
                <h2>Notre contact</h2>        
                        <p key={partenaire.uid}>Nom: {partenaire.contact} </p>
                        <p key={partenaire.uid}>Tel: {partenaire.tel_contact} </p>
                        <p key={partenaire.uid}>Email: {partenaire.email_contact}</p>
                        <br></br>
                <h2>Date de Campagne</h2> 
                        <p key={partenaire.uid}>Debut de pub : {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(partenaire.debut_pub))}</p>
                        <p key={partenaire.uid}>Fin de pub : {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(partenaire.fin_pub))}</p>
                       
            </div>
             ) )}   
                <div className="form-group">
                <Link to={"/partenaire/maj/"+ this.state.id} className="btn btn-info">Modifier le partenaire</Link>
                <Link to={"/partenaire/supprimer/"+ this.state.id} className="btn btn-danger">Supprimer le partenaire</Link>
                 </div>
            </div>
        )
    }
}

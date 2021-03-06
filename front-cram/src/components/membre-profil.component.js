import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class ProfilMembre extends Component {
    constructor(props) {
        super(props);
        this.state = { membres: []};
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
                this.setState({ membres: response.data });
             
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
                <h3>Mon profil </h3>
            {membres.map(membre =>( 
            <div class="card-container">  
                        <p key={membre.uid}>Pseudo : {membre.pseudo}</p>
                        <p key={membre.uid}>Email : {membre.email}</p>
                        <p key={membre.uid}>Date de Naissance : {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(membre.date_de_naissance))}</p>
                        <p key={membre.uid}>Ville: {membre.ville}</p>
                        <p key={membre.uid}>Membre depuis le: {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(membre.date_inscription))}</p>
                <div className="form-group">
                <Link to={"/validmaj/"+this.state.id} className="btn btn-primary" >Modifier mon profil</Link>
                <Link to={"/supprimer/"+ this.state.id + "/" + membre.pseudo} className="btn btn-danger">Supprimer mon compte</Link>
                 </div>
            </div>
             ) )}   
            </div>
        )
    }
}

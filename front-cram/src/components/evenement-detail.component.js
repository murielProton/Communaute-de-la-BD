import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Cookies from 'universal-cookie';


export default class DetailEvenement extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            evenements: [],
            cookies: new Cookies(),
        };
    }
    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        // let id = this.props.match.params.id;
        // let url = 'http://localhost:4242/membre/profil/'+this.props.match.params.id;
       // console.log('http://localhost:4242/membre/profil/'+this.props.match.params.id);
        // axios.get('http://localhost:4242/membre/profil/'+this.props.match.params.id)
        api.get('evenement/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({ evenements: response.data });
             
            })
            .catch(function (err) {
                console.log(err);
            });
    
        }
    //}
    render() {
        const { evenements } = this.state; 
        //formatage de la date entree dans mongodb avec new Intl
        return (
            <div class="container">
                <h3>L'Evenement </h3>
            {evenements.map(evenement =>( 
            <div class="card-container">  
                        <p key={evenement.uid}>Nom : {evenement.nom}</p>
                        <p key={evenement.uid}>Description : {evenement.description}</p>
                        <p key={evenement.uid}>Date de l'évenement : {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(evenement.date))}</p>
                        <p key={evenement.uid}>Ville: {evenement.ville}</p>
                        <p key={evenement.uid}>Créé par: {evenement.cree_par}</p>
                     
                <div className="form-group">
                {evenement.cree_par === this.state.cookies.get('Session') &&
                <div>
                    <Link to={"/evenement/maj/"+ this.state.id} className="btn btn-info">Modifier l'evenement</Link>
                    <Link to={"/evenement/supprimer/"+ this.state.id + "/" + evenement.nom} className="btn btn-danger">Supprimer l'évenement</Link>
                </div>
                }
                 </div>
            </div>
             ) )}   
            </div>
        )
    }
}

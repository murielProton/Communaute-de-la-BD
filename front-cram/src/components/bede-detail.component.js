import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Cookies from 'universal-cookie';


export default class DetailBede extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bedes: [],
            cookies: new Cookies(),
        };
    }

    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        
        
        api.get('bede/detail/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({ bedes: response.data });
             
            })
            .catch(function (err) {
                console.log(err);
            });
    
    }

    render() {
        const { bedes } = this.state; 
        
        return (
            <div class="container">
                <h3>Détail bande-dessinée </h3>
            {bedes.map(bede =>( 
            <div class="card-container">  
                        <p key={bede.uid}>Serie: {bede.serie}</p>
                        <p key={bede.uid}>Tome: {bede.tome}</p>
                        <p key={bede.uid}>Titre: {bede.titre}</p>
                        <p key={bede.uid}>Scénario: {bede.scenariste}</p>
                        <p key={bede.uid}>Dessins: {bede.dessinateur}</p>
                        <p key={bede.uid}>Editeur: {bede.editeur}</p>
                        <p key={bede.uid}>Année de parution: {bede.annee_parution}</p>
                        <p key={bede.uid}>Résumé: {bede.resume}</p>
                <div className="form-group">
                    {this.state.cookies.get('Session') &&
                        <Link to={"/collection/ajouter/" + bede._id} className="btn btn-primary" >Ajouter à ma collection</Link>
                    }
                </div>
                <h3>Avis des utilisateurs:</h3>
                {bede.avis.map(chaque_avis => (
                    <div className="card bg-light">
                        {/* <p className='date timeago' key={chaque_avis.uid} title={chaque_avis.date}></p> */}
                         <p style={{textDecorationLine: 'underline'}} key={chaque_avis.uid}>{chaque_avis.auteur} le {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(chaque_avis.date))}</p>
                         <p key={chaque_avis.uid}> {chaque_avis.contenu}</p>
                         {this.state.cookies.get('Session') === chaque_avis.auteur &&
                         <p><Link to={"/avis/maj/" + chaque_avis._id + "/" + bede._id}>Modifier</Link> ou 
                            <Link to={"/avis/supprimer/" + chaque_avis._id + "/" + bede._id}> Supprimer</Link></p>
                         }
                    </div>
                ))}
            </div>
             ) )}   
            </div>
        )
    }
}

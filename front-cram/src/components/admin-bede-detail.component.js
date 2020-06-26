import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class AdminDetailBede extends Component {
    constructor(props) {
        super(props);
        this.state = { bedes: []};
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
    //}
    render() {
        const { bedes } = this.state; 
        
        return (
            <div class="container">
                <h3>Détail bande-dessinée </h3>
            {bedes.map(bede =>( 
            <div class="card-container">  
                        <p key={bede.uid}>Serie : {bede.serie}</p>
                        <p key={bede.uid}>Tome : {bede.tome}</p>
                        <p key={bede.uid}>Titre : {bede.titre}</p>
                        <p key={bede.uid}>Scénario: {bede.scenariste}</p>
                        <p key={bede.uid}>Dessins: {bede.dessinateur}</p>
                        <p key={bede.uid}>Editeur : {bede.editeur}</p>
                        <p key={bede.uid}>Année de parution : {bede.annee_parution}</p>
                        <p key={bede.uid}>Résumé : {bede.resume}</p>
                        <p key={bede.uid}>Champs complets : {bede.complet}</p>
                        <p key={bede.uid}>Modifiable : {bede.modifiable}</p>
                        <p key={bede.uid}>Dernière modification par: {bede.derniere_modification}</p>
                <div className="form-group">
                    <Link to={"/admin/bd/maj//"+this.state.id} className="btn btn-success" >Modifier</Link>
                    <Link to={"/admin/bd/supprimer/"+ this.state.id} className="btn btn-danger">Supprimer</Link>
                </div>
            </div>
             ) )}   
            </div>
        )
    }
}

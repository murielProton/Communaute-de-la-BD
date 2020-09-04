import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class DetailBede extends Component {
    constructor(props) {
        super(props);
        this.state = { bedes: []};
    }
    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        
        
        api.get('/bede/detail/bede/'+this.props.match.params.id)
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
            <div className="container">
                <h3>Détail bande-dessinée </h3>
            {bedes.map(bede =>( 
            <div class="card-container">  
                        <p key={bede.uid}>Serie : {bede.serie}</p>
                        <p key={bede.uid}>Tome : {bede.tome}</p>
                        <p key={bede.uid}>Titre : {bede.titre}</p>
                        {/* <p key={bede.uid}>Scénario: {bede.scenariste}</p>
                        <p key={bede.uid}>Dessins: {bede.dessinateur}</p> */}
                        <p key={bede.uid}>Editeur : {bede.editeur}</p>
                        <p key={bede.uid}>Année de parution : {bede.annee_parution}</p>
                <div className="form-group">
                    <Link to={"/ajour/"+this.state.id} className="btn btn-primary" >Ajouter à ma collection</Link>
                    <Link to={"/supprimer/"+ this.state.id} className="btn btn-danger">Supprimer de ma collection</Link>
                </div>
            </div>
             ) )}   
            </div>
        )
    }
}

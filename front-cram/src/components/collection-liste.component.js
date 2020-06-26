import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Cookies from 'universal-cookie';


export default class ListeDeMaCollection extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { 
            bedes: [],
            cookies: new Cookies()
        };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:

        api.get('collection/liste/' + this.state.cookies.get('Session'))
            .then(response => {
                this.setState({ bedes: response.data });
                console.log("Retour de la requête: ", response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        return (
            <div>
                <h3>Ma collection de bande-dessinées</h3>
                {this.state.bedes.map(bede => (
                        <div>
                            {bede.bedes.map(detail_bede => (
                            <div className="card">
                                <h3 className="card-header" key={detail_bede.uid}>{detail_bede.serie}</h3>
                                <h5 className="card-title" key={detail_bede.uid}>Tome {detail_bede.tome}: {detail_bede.titre}</h5>
                                <h5 className="card-title" key={detail_bede.uid}>Scénariste: {detail_bede.scenariste}</h5>
                                <h5 className="card-title" key={detail_bede.uid}>Dessinateur: {detail_bede.dessinateur}</h5>
                                <h5 className="card-title" key={detail_bede.uid}>Editeur: {detail_bede.editeur}</h5>
                                <h5 className="card-title" key={detail_bede.uid}>Année de sortie: {detail_bede.annee_parution}</h5>
                                <p><Link to={"/collection/bd/detail/" + detail_bede._id}> Voir plus</Link> ou 
                                <Link to={"/collection/retirer/" + detail_bede._id}> Retirer de ma collection</Link></p>
                                <p></p>
                            </div>
                             ))}
                        </div>
                    ))}
            </div>
        )
    }
}
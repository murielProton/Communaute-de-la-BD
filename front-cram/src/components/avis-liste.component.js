import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class ListeAvis extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { avis: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/bede/liste')
        api.get('avis/liste')
            .then(response => {
                this.setState({ avis: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        return (
            <div>
                <h3>Liste des avis</h3>
                {this.state.avis.map(chaque_avis => (
                    <div className="card">
                        <h5 className='card-header' key={ chaque_avis.uid }>{chaque_avis.serie_bede} tome: {chaque_avis.tome_bede}</h5>
                        <p className="card bg-light">
                            <p style={{textDecorationLine: 'underline'}} key={chaque_avis.uid}>{chaque_avis.auteur} le {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(chaque_avis.date))}</p>
                            <p key={chaque_avis.uid}> {chaque_avis.contenu}</p>
                            {/* {this.state.cookies.get('Session') === chaque_avis.auteur &&
                            <p><Link to={"/avis/maj/" + chaque_avis._id + "/" + bede._id}>Modifier</Link> ou 
                                <Link to={"/avis/supprimer/" + chaque_avis._id + "/" + bede._id}> Supprimer</Link></p>
                            } */}
                        </p>
                    </div>
                ))}
            </div>
        )
    }
}
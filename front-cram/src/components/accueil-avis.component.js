import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class AvisAccueil extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { avis: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/membre/liste')
        api.get('accueil/avis')
            .then(response => {
                this.setState({ avis: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        const { avis } = this.state;
        return (
            <div className="container">
                <h3>Derniers avis déposés </h3>


                {avis.map(avi => (
                    <div className="card">
                        <h5 className='card-header' key={ avi.uid }>{avi.serie_bede} tome: {avi.tome_bede}</h5>
                        <p className="card bg-light">
                            <p style={{textDecorationLine: 'underline'}} key={avi.uid}>{avi.auteur} le {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(avi.date))}</p>
                            <p key={avi.uid}> {avi.contenu}</p>
                            {/* {this.state.cookies.get('Session') === chaque_avis.auteur &&
                            <p><Link to={"/avis/maj/" + chaque_avis._id + "/" + bede._id}>Modifier</Link> ou 
                                <Link to={"/avis/supprimer/" + chaque_avis._id + "/" + bede._id}> Supprimer</Link></p>
                            } */}
                        </p>
                    </div>
                ))}
            <Link to={"/liste/avis"} >voir plus</Link>
                {/* <h3> Evenements à Venir</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Ville</th>
                        <th>Date</th>
                        <th></th>
                       
                    </tr>
                    </thead>
                    <tbody>
                    {evenements.map(evenement =>( //nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr key={evenement._id}>
                            <td > {evenement.nom}</td>
                            <td >{evenement.ville}</td>
                            <td >{new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(evenement.date))}</td>
                            <td><Link to={"/evenement/detail/"+evenement._id} className="btn btn-primary">Détail</Link></td>
                          
                        </tr>
                     ) )}
                    </tbody>
                </table> */}
            </div>
        )
    }
}
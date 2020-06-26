import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import Cookies from 'universal-cookie';


export default class AdminListeEvenements extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { 
            evenements: [],
            cookies: new Cookies(),
        };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/membre/liste')
        api.get('evenement/liste')
            .then(response => {
                this.setState({ evenements: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        const { evenements } = this.state;
        return (
            <div>
                <h3>Liste des Evenements</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Ville</th>
                        <th>Date</th>
                        <th>Ajouté par</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {evenements.map(evenement =>( //nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td key={evenement.uid}> <Link to={"/evenement/detail/"+evenement._id}>{evenement.nom}</Link></td>
                            <td key={evenement.uid}>{evenement.ville}</td>
                            <td key={evenement.uid}>{new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(evenement.date))}</td>
                            <td key={evenement.uid}>{evenement.cree_par}</td>
                            <td><Link to={"/evenement/maj/"+ this.state.id} className="btn btn-info">Modifier l'evenement</Link></td>
                            <td><Link to={"/evenement/supprimer/"+evenement._id} className="btn btn-danger">Supprimer</Link></td>
                        </tr>
                     ) )}
                    </tbody>
                </table>
            </div>
        )
    }
}
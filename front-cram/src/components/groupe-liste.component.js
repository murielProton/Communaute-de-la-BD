import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class ListeGroupes extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = {
            liste_groupes: [],
            errors: []
        };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/groupe/liste')
        api.get('groupe/liste')
            .then(response => {
                console.log(response.data);
                this.setState({ liste_groupes: response.data.ListeGroupe });
            })
            .catch(function (err) {
                console.log(err);
            })
    }
   
    render() {
        return (
            <div>
                <h3>Liste de tous les groupes</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Nom du Groupe</th>
                        <th>Administrateur du Groupe</th>
                        <th>Privé</th>
                        <th>Date de Création</th>
                        <th>Membres du Groupe</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.liste_groupes.map((groupe) =>//nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td> {groupe.nom_groupe}</td>
                            <td>{groupe.admin_groupe}</td>
                            <td>{groupe.prive}</td>
                            <td>{groupe.date_c_g}</td>
                            <td>{groupe.membres_groupe.map((membre_groupe) =>
                            <div>{membre_groupe.pseudo}</div>
                            )}
                            </td>
                            {/*<td><Link to={"/profil/"+membre._id} className="btn btn-primary">Vue du profil</Link></td>
                            <td><Link to={"/supprime/"+membre._id} className="btn btn-danger">Supprimer</Link></td>*/}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
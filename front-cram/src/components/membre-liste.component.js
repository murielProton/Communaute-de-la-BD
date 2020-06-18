import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class ListeMembres extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { membres: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/membre/liste')
        api.get('membre/liste')
            .then(response => {
                this.setState({ membres: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        return (
            <div>
                <h3>Liste des membres</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Pseudo</th>
                        <th>Email</th>
                        <th>Ville</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.membres.map((membre) =>//nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td> {membre.pseudo}</td>
                            <td>{membre.email}</td>
                            <td>{membre.ville}</td>
                            <td><Link to={"/profil/"+membre._id} className="btn btn-primary">Vue du profil</Link></td>
                            <td><Link to={"/supprimer/"+membre._id+"/"+membre.pseudo} className="btn btn-danger">Supprimer</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
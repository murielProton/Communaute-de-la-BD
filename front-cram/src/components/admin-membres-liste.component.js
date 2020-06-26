import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class AdminListeMembres extends Component {
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
                        <th>Membre depuis</th>
                        <th>Banni</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.membres.map((membre) =>//nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td> {membre.pseudo}</td>
                            <td>{new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(membre.date_inscription))}</td>
                            {membre.banni === false &&
                            <td>non</td>
                            }
                            {membre.banni === true &&
                            <td>oui</td>
                            }
                            {/* <td>{membre.banni}</td> */}
                            <td><Link to={"/profil/"+membre._id} className="btn btn-primary">Profil</Link></td>
                            {membre.banni === false &&
                            <td><Link to={"/admin/bannir/"+membre._id} className="btn btn-warning">Bannir</Link></td>
                            }
                            {membre.banni === true &&
                            <td><Link to={"/admin/debannir/"+membre._id} className="btn btn-success">Débannir</Link></td>
                            }
                            <td><Link to={"/supprimer/"+membre._id+"/"+membre.pseudo} className="btn btn-danger">Supprimer</Link></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
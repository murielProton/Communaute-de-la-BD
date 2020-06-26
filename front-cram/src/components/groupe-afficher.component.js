import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class ListeBedes extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { bedes: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/bede/liste')
        api.get('bede/liste')
            .then(response => {
                this.setState({ bedes: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        return (
            <div>
                <h3>Liste des bandes dessinées</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Série</th>
                        <th>Tome</th>
                        <th>titre</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.bedes.map((bede) =>//nous parcourons la liste des tâches à faire en utilisant la fonction map. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td> {bede.serie}</td>
                            <td>{bede.tome}</td>
                            <td>{bede.titre}</td>
                            <td><Link to={"/bd/detail/"+bede._id} className="btn btn-primary">Voir plus</Link></td>
                            <td><Link to={"/avis/ajouter/"+bede._id} className="btn btn-primary">Donner un avis</Link></td>
                            {/* <td><Link to={"/supprimer/"+membre._id+"/"+membre.pseudo} className="btn btn-danger">Supprimer</Link></td> */}
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
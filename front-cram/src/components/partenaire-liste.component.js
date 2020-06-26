import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';



export default class ListePartenaires extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { partenaires: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/membre/liste')
        api.get('partenaire/liste')
            .then(response => {
                this.setState({ partenaires: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        const { partenaires } = this.state;
        return (
            <div>
                <h3>Liste des Partenaires</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Debut de la campagne de pub</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {partenaires.map(partenaire =>( //nous parcourons la liste des tâches à faire en utilisant la fonction de carte. Chaque élément de tâche est généré à l'aide du composant Todo qui n'est pas encore implémenté. L'élément de tâche actuel est affecté à la propriété de tâche de ce composant.
                        <tr>
                            <td key={partenaire.uid}> {partenaire.nom}</td>
                            <td key={partenaire.uid}> {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(partenaire.debut_pub))}</td>
                            <td><Link to={"/partenaire/detail/"+partenaire._id} className="btn btn-primary">detail</Link></td>
                            <td><Link to={"/partenaire/supprimer/"+partenaire._id} className="btn btn-danger">Supprimer</Link></td>
                        </tr>
                     ) )}
                    </tbody>
                </table>
            </div>
        )
    }
}
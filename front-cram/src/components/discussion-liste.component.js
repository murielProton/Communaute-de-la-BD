import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

export default class ListeDiscussion extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { discussions: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
       // axios.get('http://localhost:4242/api/allposts')
        api.get('discussion/liste')
        .then(response => {
            this.setState({ discussions: response.data });
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
  
    render() {
        const { discussions } = this.state; 
        return (
            <div>
                <h3>Liste des discussions</h3>
                <table className="table table-striped" style={{ marginTop: 30 }} >
                    <thead>
                    <tr>
                        <th>Titre</th>
                    </tr>
                    </thead>
                    <tbody>
                    {discussions.map(discussion =>( //nous parcourons la liste des discussion en cours en utilisant la fonction de carte. Chaque élément de discussion est généré à l'aide du composant  qui n'est pas encore implémenté. 
                        <tr>
                      
                            <td key={discussion.uid}> <Link to={"/discussion/detail/"+discussion._id}>{discussion.titre}</Link></td>
                            {/* <td><Link to={"/discussion/supprimer/"+discussion._id} className="btn btn-danger">Supprimer la discussion</Link></td> */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
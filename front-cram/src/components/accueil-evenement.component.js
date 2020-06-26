import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class EvenementAccueil extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { evenements: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/membre/liste')
        api.get('accueil/evenement')
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
            <div className="container">
                <h3>Evenements à Venir </h3>
            {evenements.map(evenement =>(
            <div className="card-container" key={evenement._id}>  
                <div className="sur_une_ligne">
                        <p >{new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(evenement.date))} </p>
                        <h4 ><Link to={"/evenement/detail/"+evenement._id} >{evenement.nom}</Link></h4>
                        {/* <Link to={"/evenement/detail/"+evenement._id} >Détail</Link> */}
                        <p >Ville : {evenement.ville}</p>
                </div>
            </div>
            ))}   
            
                <Link to={"/liste/evenement"} >voir plus</Link>
            
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
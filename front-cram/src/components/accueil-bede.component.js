import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';


export default class BedeAccueil extends Component {
    constructor(props) {//utilisons le constructeur du composant pour initialiser l'état avec un tableau todos vide:
        super(props);
        this.state = { bedes: [] };
    }
    componentDidMount() {//Pour récupérer les données liste de la base de données, la méthode de cycle de vie componentDidMount est ajoutée:
        // axios.get('http://localhost:4242/membre/liste')
        api.get('accueil/bede')
            .then(response => {
                this.setState({ bedes: response.data });
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
   
    render() {
        const { bedes } = this.state;
        return (
            <div className="container">
                <h3>Dernières bandes dessinées enregistrées </h3>
            {bedes.map(bede =>(
            <div className="card-container" key={bede._id}>  
                        <p>{new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(bede.enregistre_le))} </p> 
                        <h4 ><Link to={"/bd/detail/"+bede._id}>{bede.serie}</Link></h4>
                        <h5>{bede.titre} tome: {bede.tome}</h5>
            </div>
            ))}
{/* 
                {bedes.map(bede => (
                    <div className="card">
                        <h5 className='card-header' key={ bede.uid }>{bede.serie} tome: {bede.tome} {bede.titre}</h5>
                        <p className="card bg-light">
                            <p key={bede.uid}> le {new Intl.DateTimeFormat('fr-Fr',{ month:'long',day:'2-digit',year:'numeric'}).format(new Date(bede.enregistre_le))}</p>
                        </p>
                    </div>
                ))} 
                jsdfs */}
                
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
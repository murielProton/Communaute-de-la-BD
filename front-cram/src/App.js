import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // Eu par npm install react-router-dom
import "bootstrap/dist/css/bootstrap.min.css"; // Eu par npm install bootstrap
// import './App.css';

import InscriptionMembre from './components/membre-inscription.component';
import ConnexionMembre from './components/membre-connexion.component';
import Deconnexion from './components/membre-deconnexion.component';
import ProfilMembre from './components/membre-profil.component';
import SupprimerMembre from './components/membre-supprimer.component';
import MajMembre from './components/membre-maj.component';
import ListeMembres from './components/membre-liste.component';


function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/inscription" exact component={InscriptionMembre} />
        <Route path="/connexion" exact component={ConnexionMembre} />
        <Route path="/deconnexion" exact component={Deconnexion} />
        <Route path="/profil/:id" exact component={ProfilMembre} />
        <Route path="/supprime/:id" exact component={SupprimerMembre} />
        <Route path="/maj/:id" exact component={MajMembre} />
        <Route path="/liste" exact component={ListeMembres}/>

      </Router>
    </div>
  );
}

export default App;

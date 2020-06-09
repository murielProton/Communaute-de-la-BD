import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // Eu par npm install react-router-dom
import "bootstrap/dist/css/bootstrap.min.css"; // Eu par npm install bootstrap
// import './App.css';

import InscriptionMembre from './components/membre-inscription.component';
import ConnexionMembre from './components/membre-connexion.component';

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/inscription" exact component={InscriptionMembre} />
        <Route path="/connexion" exact component={ConnexionMembre} />
      </Router>
    </div>
  );
}

export default App;

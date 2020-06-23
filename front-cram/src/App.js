import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // Eu par npm install react-router-dom
import Cookies from 'universal-cookie'; // Eu par npm install universal-cookie
import "bootstrap/dist/css/bootstrap.min.css"; // Eu par npm install bootstrap
import './App.css';
import Navbar, { NavbarText } from 'react-bootstrap/Navbar'; //Eu par npm install react-bootstrap bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; //Eu par npm install react-bootstrap bootstrap
import Nav from 'react-bootstrap/Nav'; //Eu par npm install react-bootstrap bootstrap


import InscriptionMembre from './components/membre-inscription.component';
import ConnexionMembre from './components/membre-connexion.component';
import DeconnexionMembre from './components/membre-deconnexion.component';
import ProfilMembre from './components/membre-profil.component';

import ListeMembres from './components/membre-liste.component';
import MajMembre from './components/membre-maj-autre.component';
import ValidMajMembre from './components/membre-maj-validation.component';
import ChoixMajMembre from './components/membre-maj-choix.component';
import MajMotDePasseMembre from './components/membre-maj-motdepasse.component';
import MajEmailMembre from './components/membre-maj-email.component';
import SupprimerMembre from './components/membre-supprimer.component';

import AjoutBede from './components/bede-ajouter.component';
import ListeBedes from './components/bede-liste.component';
import DetailBede from './components/bede-detail.component';
import MajBede from './components/bede-maj.component';

/*import AjoutCollection from './components/collection-ajouter.component';
import ListeCollection from './components/collection-liste.component';
//import DetailCollection from './components/collection-detail.component';
import MajCollection from './components/collection-maj.component';
import SupprimerCollection from './components/collection-supprimer.component';*/

import CreationGroupe from './components/groupe-creation.component';
import ListeGroupe from './components/groupe-liste.component';


function LiensAdmin(props) {
  let admin = props.admin;
  console.log("je suis dans app.js Liens Admin");
  if (admin) {
    return <div className="Admin">
      <NavDropdown title="Administration" id="basic-nav-dropdown">
        <NavDropdown.Item href="/inscription" >Ajouter un membres</NavDropdown.Item>
        <NavDropdown.Item href="/liste/membres" >Liste des membres</NavDropdown.Item>
      </NavDropdown>
    </div>
  }
  return <div></div>
}

// Cette fonctions récupère props aller la voir en ligne 160 si on veut rajouter des cookies
function LiensDisponiblesQuandConnecte(props) {
  let pseudo = props.pseudo;
  let admin = props.admin;
  let membre_id = props._id;
  console.log("Je suis dans app.js Liens Disponibles quand on se connecte.");
  let url_profil = "/profil/";//A FAIRE Récupérer + membre._id;
  let url_profil_maj = "/maj/profil/";//A FAIRE Récupérer + membre._id;
  if (props.pseudo) {
    return <Nav className="mr-auto">
      <Nav.Link href="/liste/bede">Accueil</Nav.Link>

      <NavDropdown title="Bandes Déssinées" id="basic-nav-dropdown">
        <NavDropdown.Item href="/ajout/bede" >Ajouter</NavDropdown.Item>
        <NavDropdown.Item href="/liste/bede" >Liste</NavDropdown.Item>
      </NavDropdown>
      <LiensAdmin pseudo={props.pseudo} admin={props.admin} _id={props._id} />
      <div className="EcritureBlanche nav-link">{pseudo}</div>
      <Nav.Link href="/deconnexion">Se deconnecter</Nav.Link>
    </Nav>
  } else {
    return <Nav className="mr-auto">
      <Nav.Link href="/">Accueil</Nav.Link>
      <NavDropdown title="Connexion" id="basic-nav-dropdown">
        <NavDropdown.Item href="/inscription">Inscription</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/connexion">Se connecter</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  }
}
class App extends Component {
  constructor(props) {
    super(props)
    this.setPseudo = this.setPseudo.bind(this);
    this.getPseudo = this.getPseudo.bind(this);
    this.setAdmin = this.setAdmin.bind(this);
    this.setId = this.setId.bind(this);
    
    this.state = {
      pseudo: null,
      admin: null,
      _id: null,
      
    }
    //changer la string arrivée en JSON en boolean
    //Cookies set dans le construceurs pour qu'ils restent peut importe la page où l'on se trouve.
    let cookie = new Cookies();
    this.setPseudo(cookie.get('Session'));
  }
  setPseudo(pseudo) {
    console.log("je suis dans l'app.js setPseudo");
    let cookie = new Cookies();
    this.setState({ pseudo: pseudo });
    // ATTENTION les cookies sont des string, les boolean sont envoyés en string
    this.setAdmin(cookie.get('Session_admin') == 'true');
    this.setId(cookie.get('Session_id'));

  }
  getPseudo() {
    return this.state.pseudo;
  }
  setAdmin(admin) {
    this.setState({ admin: admin });
  }
  setId(_id) {
    this.setState({ _id: _id });
  }

  render() {
    return (
      <Router>
        <div className="container EcritureNoire">
          <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/liste/bede">CRAM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" />
            {/*A Faire ajouter le nom du membre connecté*/}
            <div className="collpase navbar-callapse">
              <LiensDisponiblesQuandConnecte pseudo={this.state.pseudo} admin={this.state.admin} _id={this.state._id} />
            </div>
          </Navbar>
          <br />
          {/* <Index/> */}

          {/* Route pour la page d'accueil */}
          {/* <Route path="/" exact component={Home} /> */}

          {/* Routes pour les membres: */}
          <Route path="/inscription" exact component={InscriptionMembre} />
          <Route path="/connexion" render={(props) => <ConnexionMembre {...props} setPseudo={this.setPseudo} getPseudo={this.getPseudo} />} />
          <Route path="/deconnexion" render={(props) => <DeconnexionMembre {...props} setPseudo={this.setPseudo} getPseudo={this.getPseudo} />} />
          <Route path="/profil/:id" exact component={ProfilMembre} />

          {/* A FAIRE séparer les routes membres des routes profils*/}
          <Route path="/validmaj/:id" component={ValidMajMembre} />
          <Route path="/choixmaj/:id" component={ChoixMajMembre} />
          <Route path="/majmotdepasse/:id" component={MajMotDePasseMembre} />
          <Route path="/majemail/:id" component={MajEmailMembre} />
          <Route path="/maj/profil/:id" component={MajMembre} />
          <Route path="/liste/membres" exact component={ListeMembres} />
          <Route path="/supprimer/:id/:pseudo" exact component={SupprimerMembre} />

          {/* Routes pour les bedes */}
          <Route path="/ajout/bede" exact component={AjoutBede} />
          <Route path="/liste/bede" component={ListeBedes} />
          <Route path="/detail/bede/:id" component={DetailBede} />
          {/* <Route path="/maj/bede/:id" component={MajBede} />*/}
          {/* <Route path="/supprimer/bede/:id" component={SupprimerBede} />*/}

          {/* Routes pour les collections */}
          {/* <Route path="/ajout/collection" component={AjoutCollection} />
          <Route path="/liste/collection" component={ListeCollection} />
          <Route path="/detail/collection/:id" component={DetailCollection} 
          <Route path="/maj/collection" component={MajCollection} />
          <Route path="/suprimer/collection" component={SupprimerCollection} />*/}

          {/* Routes pour les groupes */}
          <Route path="/creation/groupe" exact component={CreationGroupe} />
          <Route path="/liste/groupe" exact component={ListeGroupe} />
        </div>
      </Router>
    );
  }
}
export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // Eu par npm install react-router-dom
import Cookies from 'universal-cookie'; // Eu par npm install universal-cookie
import "bootstrap/dist/css/bootstrap.min.css"; // Eu par npm install bootstrap
import './App.css';
import Navbar from 'react-bootstrap/Navbar'; //Eu par npm install react-bootstrap bootstrap
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

// A FAIRE: si admin voit pas la même chose

function LiensDisponiblesQuandConnecte(props) {
  const pseudo = props.pseudo;
  const _id = props._id;
  const admin = props.admin;
  console.log("pseudo =" + pseudo);
  console.log("admin =" + admin);
  console.log("_id =" + _id);
  let url_profil = "/profil/";//A FAIRE Récupérer + membre._id;
  let url_profil_maj = "/maj/profil/";//A FAIRE Récupérer + membre._id;
  if (pseudo) {
    return <Nav className="mr-auto">
      <Nav.Link href="/liste/bede">Accueil</Nav.Link>

      <NavDropdown title="Bandes Déssinées" id="basic-nav-dropdown">
        <NavDropdown.Item href="/ajout/bede" >Ajouter</NavDropdown.Item>
        <NavDropdown.Item href="/liste/bede" >Liste</NavDropdown.Item>
        {/*<NavDropdown.Item href="/maj/bede/:id" >Mettre à Jour</NavDropdown.Item>*/}
        {/*<NavDropdown.Item href="/suprimer/bede/:id" >Supprimer</NavDropdown.Item>*/}
      </NavDropdown>

      {/*<NavDropdown title="Votre Collection" id="basic-nav-dropdown">
        <NavDropdown.Item href="/ajout/collection" >Ajouter</NavDropdown.Item>
        <NavDropdown.Item href="/detail/collection/:id" >Details</NavDropdown.Item>
        <NavDropdown.Item href="/liste/collection" >Liste</NavDropdown.Item>
        <NavDropdown.Item href="/maj/collection" >Mettre à Jour</NavDropdown.Item>
        <NavDropdown.Item href="/supprimer/collection" >Supprimer</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>*/}


      {/*<NavDropdown title="Groupes" id="basic-nav-dropdown">
        <NavDropdown.Item href="/creation/groupe" >Ajouter</NavDropdown.Item>
        <NavDropdown.Item href="/detail/collection/:id" >Details</NavDropdown.Item>
        <NavDropdown.Item href="/liste/groupe" >Liste</NavDropdown.Item>
        {/*<NavDropdown.Item href="/maj/collection" >Mettre à Jour</NavDropdown.Item>*/}
      {/*<NavDropdown.Item href="/supprimer/collection" >Supprimer</NavDropdown.Item>*/}
      {/*<NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>*/}

      <NavDropdown title="Membres" id="basic-nav-dropdown">
        {/*A FAIRE séparer les routes inscription de ajouter un membre*/}
        <NavDropdown.Item href="/inscription" >Ajouter</NavDropdown.Item>
        {/*<NavDropdown.Item href="/detail/membres/:id" >Details</NavDropdown.Item>*/}
        <NavDropdown.Item href="/liste/membres" >Liste</NavDropdown.Item>
        {/*<NavDropdown.Item href="/maj/membres" >Mettre à Jour</NavDropdown.Item>*/}
        {/*A FAIRE ? séparer les routes supprimer membre de supprimer profil*/}
        {/*<NavDropdown.Item href="/supprimer/:id/:pseudo" >Supprimer</NavDropdown.Item>*/}
        {/*<NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
      </NavDropdown>

      {/*<NavDropdown title={pseudo} id="basic-nav-dropdown">
        <NavDropdown.Item href={url_profil} >Votre Profil</NavDropdown.Item>
        <NavDropdown.Item href= {url_profil_maj} >Mettre à Jour</NavDropdown.Item>
        <NavDropdown.Item href="/supprimer/:id/:pseudo" >Supprimer</NavDropdown.Item>
        {/*<NavDropdown.Item href="/maj/collection" >Mettre à Jour</NavDropdown.Item>
        {/*<NavDropdown.Item href="/supprimer/collection" >Supprimer</NavDropdown.Item>
        {/*<NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>*/}
      <div className="EcritureBlanche">{pseudo}</div>
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
    this.getAdmin = this.getAdmin.bind(this);
    this.set_id = this.set_id.bind(this);
    this.get_id = this.get_id.bind(this);
    this.state = {
      pseudo: null,
      admin: null,
      _id: null,
      cookies: new Cookies()
    }
    if (this.state.cookies.get('Session')) {
      this.state = { pseudo: this.state.cookies.get('Session') }
    }
  }
  setPseudo(pseudo) {
    let cookie = new Cookies();
    console.log("Vieux Pseudo :" + this.state.pseudo);
    this.setState({ pseudo: pseudo,
      admin : cookie.get('Session_admin'),
      _id : cookie.get('Session_id')
    });
    console.log("nouveau pseudo :" + this.state.pseudo);
    console.log("nouveau admin :" + this.state.admin);
    console.log("nouveau _id :" + this.state._id);
  }
  getPseudo() {
    return this.state.pseudo;
  }
  setAdmin(admin) {
    console.log("Vieux Admin : " + this.state.admin);
    this.setState({ admin: admin });
    console.log("nouveau admin" + this.state.admin);
  }
  getAdmin() {
    return this.state.admin;
  }
  set_id(_id) {
    console.log("Vieux _id " + this.state._id)
    this.setState({ _id: _id });
    console.log("nouveau _id " + this.state._id)
  }
  get_id() {
    return this.state._id;
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

              <LiensDisponiblesQuandConnecte pseudo={this.state.pseudo} />
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

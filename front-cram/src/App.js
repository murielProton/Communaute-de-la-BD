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
import SupprimerMembre from './components/membre-supprimer.component';
import ValidMajMembre from './components/membre-maj-validation.component';
import ChoixMajMembre from './components/membre-maj-choix.component';
import MajMotDePasseMembre from './components/membre-maj-motdepasse.component';
import MajEmailMembre from './components/membre-maj-email.component';

import AjoutBede from './components/bede-ajouter.component';
import ListeBedes from './components/bede-liste.component';
import DetailBede from './components/bede-detail.component';

import GroupeCreation from './components/groupe-creation.component';
import GroupeListe from './components/groupe-liste.component';

// A FAIRE: changer la couleur de la nav bar {{color : "#db504a"}}
// A FAIRE: si admin voit pas la même chose

function LiensDisponiblesQuandConnecte(props) {
  const pseudo = props.pseudo;
  console.log("pseudo =" + pseudo);
  if (pseudo) {
    return <Nav className="mr-auto">
      <Nav.Link href="/">Accueil</Nav.Link>
      <NavDropdown title={pseudo} id="basic-nav-dropdown">
      <NavDropdown.Item href="/liste/membres" >Mon profil</NavDropdown.Item>
      {/*A FAIRE si groupe personnel déjà créé alors tu vas sur mon groupe détails
      Du groupe détail le membre pourra créer d'autres groupes*/}
      <NavDropdown.Item href="/collection" >Ma collection de bds</NavDropdown.Item>
      <NavDropdown.Item href="/groupe/creation" >Mes groupes</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Liste" id="basic-nav-dropdown">
        <NavDropdown.Item href="/liste/membres">Liste des membres</NavDropdown.Item>
        <NavDropdown.Item href="/groupe/liste">Liste des groupes</NavDropdown.Item>
        <NavDropdown.Item href="/allposts">A voir</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
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
    this.state = { pseudo: null,  cookies: new Cookies() }
    if (this.state.cookies.get('Session')) {
      this.state = { pseudo: this.state.cookies.get('Session') }
    }
   
  }
  setPseudo(pseudo) {
    console.log("Vieux Pseudo :" + this.state.pseudo);
    this.setState({ pseudo: pseudo });
    console.log("nouveau pseudo :" + this.state.pseudo);
  }
  getPseudo() {
    return this.state.pseudo;
  }
  render() {
    return (
      <Router>
        <div className="container EcritureRouge">
          <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/">CRAM</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"/>
              {/*A Faire ajouter le nom du membre connecté*/}
              <div className="collpase navbar-callapse">
               
                    <LiensDisponiblesQuandConnecte pseudo={this.state.pseudo} />
              </div>
            </Navbar>
            <br />
            <h2>CRAM</h2>
            {/* <Index/> */}

            {/* Route pour la page d'accueil */}
            {/* <Route path="/" exact component={Home} /> */}

            {/* Routes pour les membres: */}
            <Route path="/inscription" exact component={InscriptionMembre} /> 
            <Route path="/connexion" render={(props) => <ConnexionMembre {...props} setPseudo={this.setPseudo} getPseudo={this.getPseudo} />} />
            <Route path="/deconnexion" render={(props) => <DeconnexionMembre {...props} setPseudo={this.setPseudo} getPseudo={this.getPseudo} />} />
            <Route path="/profil/:id" exact component={ProfilMembre} />
            <Route path="/supprimer/:id/:pseudo" exact component={SupprimerMembre} />
            <Route path="/validmaj/:id" component={ValidMajMembre} /> 
            <Route path="/choixmaj/:id" component={ChoixMajMembre}/>
            <Route path="/majmotdepasse/:id" component={MajMotDePasseMembre}/>
            <Route path="/majemail/:id" component={MajEmailMembre}/>
            <Route path="/majprofil/:id" component={MajMembre}/>
            <Route path="/liste/membres" exact component={ListeMembres}/>

            

            {/* Routes pour les bedes */}
            <Route path="/ajoutbede" exact component={AjoutBede} />
            <Route path='/liste/bds' component={ListeBedes} />
            <Route path="/bd/:id" component={DetailBede} />

            <Route path="/groupe/creation" exact component={GroupeCreation} />
            <Route path="/groupe/liste" exact component={GroupeListe} />
            </div>
          </Router>
    );
  }
}
export default App;

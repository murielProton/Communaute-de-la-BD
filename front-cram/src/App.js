import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // Eu par npm install react-router-dom
import Cookies from 'universal-cookie'; // Eu par npm install universal-cookie
import "bootstrap/dist/css/bootstrap.min.css"; // Eu par npm install bootstrap
// import './App.css';

import Navbar from 'react-bootstrap/Navbar'; //Eu par npm install react-bootstrap bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown'; //Eu par npm install react-bootstrap bootstrap
import Nav from 'react-bootstrap/Nav'; //Eu par npm install react-bootstrap bootstrap

// Imports des membres
import InscriptionMembre from './components/membre-inscription.component';
import ConnexionMembre from './components/membre-connexion.component';
import Deconnexion from './components/membre-deconnexion.component';
import ProfilMembre from './components/membre-profil.component';
import ListeMembres from './components/membre-liste.component';
import MajMembre from './components/membre-maj-autre.component';
import SupprimerMembre from './components/membre-supprimer.component';
import ValidMajMembre from './components/membre-maj-validation.component';
import ChoixMajMembre from './components/membre-maj-choix.component';
import MajMotDePasseMembre from './components/membre-maj-motdepasse.component';
import MajEmailMembre from './components/membre-maj-email.component';
import GroupeProfilMembre from './components/membre-profil-pour-groupe.component';

// Imports des bedes
import AjoutBede from './components/bede-ajouter.component';
import ListeBedes from './components/bede-liste.component';
import DetailBede from './components/bede-detail.component';
import MajBede from './components/bede-maj.component';

// Imports des avis
import AjouterAvis from './components/avis-ajouter.component';
import MajAvis from './components/avis-maj.component';
import SupprimerAvis from './components/avis-supprimer.component';
import ListeAvis from './components/avis-liste.component';

// Imports des collections
import RechercherPourAjouterCollection from './components/collection-rechercher-pour-ajouter.component';
import AjouterCollection from './components/collection-ajouter.component';
import ListeDeMaCollection from './components/collection-liste.component';
import RetirerBedeCollection from './components/collection-retirer-bede.component';
import DetailBedeCollection from './components/collection-bede-detail.component';

// Imports de l'administrateur
import AdminAjoutBede from './components/admin-bede-ajouter.component';
import AdminMajBede from './components/admin-bede-maj.component';
import AdminListeBedes from './components/admin-bede-liste.component';
import AdminDetailBede from './components/admin-bede-detail.component';
import AdminSupprimerBede from './components/admin-bede-supprimer.component';
import AdminListeAvis from './components/admin-avis-liste.component';
import AdminMajAvis from './components/admin-avis-maj.component';
import AdminSupprimerAvis from './components/admin-avis-supprimer.component';
import AdminListeMembres from './components/admin-membres-liste.component';
import AdminBannirMembre from './components/admin-membre-bannir.component';
import AdminDebannirMembre from './components/admin-membre-debannir.component';
import AdminListeDiscussion from './components/admin-discussion-liste.component';
import AdminListeEvenements from './components/admin-evenement-liste.component';
import AdminDetailDiscussion from './components/admin-discussion-detail.component';
import AdminMajDiscussion from './components/admin-discussion-maj.component';

// Imports navigation hors connexion
import HorsConnexionListeBedes from './components/hors-connexion-liste-bede.component';
import HorsConnexionRechercherBede from "./components/hors-connexion-rechercher-bede.component";

// Imports des messages
import CreationMessage from './components/message-creation.component';
import SupprimerMessage from './components/message-supprimer.component';
import MajMessage from './components/message-maj.component';

// Imports des discussions
import ListeDiscussion from './components/discussion-liste.component';
import DetailDiscussion from './components/discussion-detail.component';
import CreationDiscussion from './components/discussion-creation.component';
import SupprimerDiscussion from './components/discussion-supprimer.component';
import MajDiscussion from './components/discussion-maj.component';

// Imports des groupes
import GroupeCreation from './components/groupe-creation.component';
import GroupeProfilDetail from './components/groupe-profil-detail.component';
import ListeCollectionMembreGroupe from './components/groupe-profil-collection.component';

// Imports des évênements
import DetailEvenement from './components/evenement-detail.component';
import ListeEvenements from './components/evenement-liste.component';
import SupprimerEvenement from './components/evenement-supprimer.component';
import CreationEvenement from './components/evenement-creation.component';
import MajEvenement from './components/evenement-maj.component';

// Imports des partenaires
import DetailPartenaire from './components/partenaire-detail.component';
import ListePartenaires from './components/partenaire-liste.component';
import SupprimerPartenaire from './components/partenaire-supprimer.component';
import CreationPartenaire from './components/partenaire-creation.component';
import MajPartenaire from './components/partenaire-maj.component';

// Imports de l'accueil
import Accueil from './components/accueil-affichage.component';
import EvenementAccueil from './components/accueil-evenement.component';
import AvisAccueil from './components/accueil-avis.component';
import BedeAccueil from './components/accueil-bede.component';

// A FAIRE: changer la couleur de la nav bar {{color : "#db504a"}}
// A FAIRE: si admin voit pas la même chose



function LiensAdmin(props) {
  let admin = props.admin;
  console.log("je suis dans app.js Liens Admin");
  if (admin) {
    return <div className="Admin">
      <NavDropdown title="Administration" id="basic-nav-dropdown">
        <NavDropdown.Item href="/admin/membres/liste" >Liste des membres</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/admin/bd/liste" >Liste des bédés</NavDropdown.Item>
        <NavDropdown.Item href="/inscription" >Valider une bédé complète</NavDropdown.Item>
        <NavDropdown.Item href="/admin/bd/ajouter" >Ajouter une bédé</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/admin/avis/liste" >Les avis des membres</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/admin/discussions/liste" >Gérer les discussions</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/admin/liste/evenement" >Gérer les événements</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/admin/liste/partenaire" >Afficher les partenaires</NavDropdown.Item>
        <NavDropdown.Item href="/admin/partenaire/creer" >Ajouter un partenaire</NavDropdown.Item>

      </NavDropdown>
    </div>
  }
  return <div></div>
}

function LiensDisponiblesQuandConnecte(props) {
  let pseudo = props.pseudo;
  let admin = props.admin;
  let membre_id = props._id;

  console.log("Je suis dans app.js Liens Disponibles quand on se connecte.");
  console.log("pseudo =" + pseudo);

  // Ces constantes permettent d'intégrer des variables dans les liens de la navbar
  const ma_collection_url = "/collection/afficher/" + pseudo;
  const mon_profil_url = "/profil/" + membre_id;

  if (pseudo) {
    return <Nav className="mr-auto">
      <NavDropdown title="Evênements" id="basic-nav-dropdown">
      <NavDropdown.Item href="/liste/evenement" >Voir les évênements</NavDropdown.Item>
      <NavDropdown.Item href="/evenement/creer" >Créer un évênement</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/bd/rechercher">Bédés de la communauté</Nav.Link>
      <Nav.Link href="/discussion/creer">Discussions</Nav.Link>
        <LiensAdmin pseudo={props.pseudo} admin={props.admin} _id={props._id} />
      <NavDropdown title={pseudo} id="basic-nav-dropdown">
      {/*A FAIRE si groupe personnel déjà créé alors tu vas sur mon groupe détails
      Du groupe détail le membre pourra créer d'autres groupes*/}
      <NavDropdown.Item href={ma_collection_url} >Ma collection de bds</NavDropdown.Item>
      <NavDropdown.Item href="/collection/rechercher/ajouter" >Ajouter une bd à ma collection</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href={mon_profil_url} >Mon profil</NavDropdown.Item>
      <NavDropdown.Divider />
      {/* <NavDropdown.Item href="/groupe/creation" >Mes groupes</NavDropdown.Item> */}
      <NavDropdown.Item href="/groupe/creation" >Créer un nouveau groupe</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/deconnexion" >Se deconnecter</NavDropdown.Item>
      </NavDropdown>
      {/* <NavDropdown title="Liste" id="basic-nav-dropdown">
        <NavDropdown.Item href="/liste/membres">Liste des membres</NavDropdown.Item>
        <NavDropdown.Item href="/allposts">A voir</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
  } else {
    return <Nav className="mr-auto">
      <Nav.Link href="/">Accueil</Nav.Link>
      <Nav.Link href="/liste/evenement">Evênements</Nav.Link>
      <Nav.Link href="/bd/rechercher">Bédés de la communauté</Nav.Link>
      <Nav.Link href="/liste/discussion">Discussions</Nav.Link>
      <Nav.Link href="/inscription">Inscription</Nav.Link>
      <Nav.Link href="/connexion">Connexion</Nav.Link>
    </Nav>
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    let cookies = new Cookies();
    this.setPseudo = this.setPseudo.bind(this);
    this.getPseudo = this.getPseudo.bind(this);
    this.setAdmin = this.setAdmin.bind(this);
    this.setId = this.setId.bind(this); 

    this.state = {
      
      pseudo: cookies.get('Session'),
      admin: cookies.get('Session_admin') == 'true',
      _id: cookies.get('Session_id'),
    }
   
  }

  setPseudo(pseudo) {
    let cookie = new Cookies();
    console.log("je suis dans l'app.js setPseudo");
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
        <div className="container">
          <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/">LaCommunautéDeLaBédé</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"/>
              {/*A Faire ajouter le nom du membre connecté*/}
              <div className="collpase navbar-callapse">
               
                    <LiensDisponiblesQuandConnecte pseudo={this.state.pseudo} admin={this.state.admin} _id={this.state._id} />
              </div>
            </Navbar>
            <br />
            {/* <h2>CRAM</h2> */}
            {/* <Index/> */}

            {/* Route pour la page d'accueil */}
            {/* <Route path="/" exact component={Home} /> */}

            {/* Routes pour les membres: */}
            <Route path="/inscription" exact component={InscriptionMembre} /> 
            <Route path="/connexion" render={(props) => <ConnexionMembre {...props} setPseudo={this.setPseudo} getPseudo={this.getPseudo} />} />
            <Route path="/deconnexion" render={(props) => <Deconnexion {...props} setPseudo={this.setPseudo} getPseudo={this.getPseudo} />} />
            <Route path="/profil/:id" exact component={ProfilMembre} />
            <Route path="/supprimer/:id/:pseudo" exact component={SupprimerMembre} />
            <Route path="/validmaj/:id" component={ValidMajMembre} /> 
            <Route path="/choixmaj/:id" component={ChoixMajMembre}/>
            <Route path="/majmotdepasse/:id" component={MajMotDePasseMembre}/>
            <Route path="/majemail/:id" component={MajEmailMembre}/>
            <Route path="/majprofil/:id" component={MajMembre}/>
            <Route path="/liste/membres" exact component={ListeMembres}/>
            <Route path="/detail/membre/:id" component={GroupeProfilMembre} />

            {/* Routes pour les bedes */}
            {/* Le chemin de Ajout bede a été modifié en /bd/ajouter */}
            <Route path="/bd/ajouter" exact component={AjoutBede} />
            <Route path='/liste/bds' component={ListeBedes} />
            <Route path="/bd/detail/:id" component={DetailBede} />
            <Route path="/bd/maj/:id" component={MajBede} />

            {/* Routes pour les avis */}
            <Route path="/avis/ajouter/:id/:bd_serie/:bd_tome" component={AjouterAvis} />
            <Route path="/avis/maj/:id/:id_bd" component={MajAvis} />
            <Route path="/avis/supprimer/:id/:id_bd" component={SupprimerAvis} />
            <Route path="/liste/avis" component={ListeAvis} />

            {/* Routes pour les collections */}
            <Route path="/collection/rechercher/ajouter" component={RechercherPourAjouterCollection} />
            <Route path="/collection/ajouter/:id" component={AjouterCollection} />
            <Route path="/collection/afficher/:pseudo" component={ListeDeMaCollection} />
            <Route path='/collection/retirer/:id' component={RetirerBedeCollection} />
            <Route path="/collection/bd/detail/:id" component={DetailBedeCollection} />

            {/* Routes pour l'administrateur */}
            <Route path="/admin/bd/ajouter" component={AdminAjoutBede} />
            <Route path="/admin/bd/liste" component={AdminListeBedes} />
            <Route path="/admin/bd/detail/:id" component={AdminDetailBede} />
            <Route path="/admin/bd/maj/:id" component={AdminMajBede} />
            <Route path="/admin/bd/supprimer/:id" component={AdminSupprimerBede} />
            <Route path="/admin/avis/liste" component={AdminListeAvis} />
            <Route path="/admin/avis/maj/:id" component={AdminMajAvis} />
            <Route path="/admin/avis/supprimer/:id" component={AdminSupprimerAvis} />
            <Route path="/admin/membres/liste" component={AdminListeMembres} />
            <Route path="/admin/bannir/:id" component={AdminBannirMembre} />
            <Route path="/admin/debannir/:id" component={AdminDebannirMembre} />
            <Route path="/admin/discussions/liste" component={AdminListeDiscussion} />
            <Route path="/admin/liste/evenement" component={AdminListeEvenements} />
            <Route path="/admin/discussion/detail/:id" component={AdminDetailDiscussion} />
            <Route path="/admin/discussion/maj/:id" component={AdminMajDiscussion} />

            {/* Routes hors connexion */}
            <Route path="/bd/liste" component={HorsConnexionListeBedes} />
            <Route path="/bd/rechercher" component={HorsConnexionRechercherBede} />

            {/* Routes des messages */}
            <Route path="/message/creer/:id" component={CreationMessage}/>
            <Route path="/message/supprimer/:id" component={SupprimerMessage}/>
            <Route path="/message/maj/:id/:id_conversation" component={MajMessage}/>

            {/* Routes des discussions */}
            <Route path="/discussion/creer" component={CreationDiscussion}/>
            <Route path="/discussion/supprimer/:id" exact component={SupprimerDiscussion} />
            <Route path="/liste/discussion" component={ListeDiscussion}/>
            <Route path="/discussion/detail/:id" component={DetailDiscussion}/>
            <Route path="/discussion/maj/:id" component={MajDiscussion}/>

            {/* Routes pour les groupes */}
            <Route path="/groupe/creation" exact component={GroupeCreation} />
            <Route path="/groupe/profil/detail/:id" component={GroupeProfilDetail} />
            <Route path="/collection/groupe/afficher/:pseudo" component={ListeCollectionMembreGroupe} />

            {/* Routes les évênements */}
            <Route path="/evenement/creer" component={CreationEvenement}/>
            <Route path="/evenement/supprimer/:id/:nom" exact component={SupprimerEvenement} />
            <Route path="/liste/evenement" component={ListeEvenements}/>
            <Route path="/evenement/detail/:id" component={DetailEvenement}/>
            <Route path="/evenement/maj/:id" component={MajEvenement}/>

            {/* Routes pour les partenaires */}
            <Route path="/admin/partenaire/creer" component={CreationPartenaire}/>
            <Route path="/partenaire/supprimer/:id" exact component={SupprimerPartenaire} />
            <Route path="/admin/liste/partenaire" component={ListePartenaires}/>
            <Route path="/partenaire/detail/:id" component={DetailPartenaire}/>
            <Route path="/partenaire/maj/:id" component={MajPartenaire}/>

            {/* Routes pour l'accueil */}
            <Route path="/" exact component={Accueil}/>
            <Route path="/accueil/avis" component={AvisAccueil} />
            <Route path="/accueil/bd" component={BedeAccueil} />
            <Route path="/accueil/evenement" component={EvenementAccueil} />

            </div>
          </Router>
    );
  }
}
export default App;
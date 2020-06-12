import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // Eu par npm install react-router-dom
import "bootstrap/dist/css/bootstrap.min.css"; // Eu par npm install react-bootstrap bootstrap
// import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import InscriptionMembre from './components/membre-inscription.component';
import ConnexionMembre from './components/membre-connexion.component';
import ProfilMembre from './components/membre-profil.component';
import SupprimeMembre from './components/membre-supprimer.component';
import AjourMembre from './components/membre-maj.component';
import ListeMembres from './components/membre-liste.component';

function App() {
 
  return (
  
    <Router>
    <div className="container">
  <Navbar  bg="primary" variant="dark" expand="lg">
  <Navbar.Brand href="/">CRAM</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <NavDropdown title="Connexion" id="basic-nav-dropdown">
        <NavDropdown.Item href="/inscription">Inscription</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/">Se connecter</NavDropdown.Item>
      </NavDropdown>
      <Nav.Link href="/liste" >Ma page</Nav.Link>
      <NavDropdown title="Liste" id="basic-nav-dropdown">
        <NavDropdown.Item href="/liste">Liste des membres</NavDropdown.Item>
        <NavDropdown.Item href="/allposts">A voir</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
        <Nav.Link href="/logout">Se deconnecter</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
               
               
          <br/>
      <h2>CRAM</h2>
      {/* <Index/> */}
      <Route path="/inscription" exact component={InscriptionMembre} />
        <Route path="/connexion" exact component={ConnexionMembre} />
        <Route path="/profil/:id" exact component={ProfilMembre} />
        <Route path="/supprime/:id" exact component={SupprimeMembre} />
        <Route path="/jour/:id" component={AjourMembre} />
        <Route path="/liste" exact component={ListeMembres}/>
    </div>
    </Router>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         {/* <Route path="/" exact component={Home} /> */}
//         <Route path="/inscription" exact component={InscriptionMembre} />
//         <Route path="/connexion" exact component={ConnexionMembre} />
//         <Route path="/profil/:id" exact component={ProfilMembre} />
//         <Route path="/supprime/:id" exact component={SupprimeMembre} />
//         <Route path="/jour/:id" component={AjourMembre} />
//         <Route path="/liste" exact component={ListeMembres}/>

//       </Router>
//     </div>
//   );
// }

// export default App;

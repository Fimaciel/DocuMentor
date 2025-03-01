import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const MyNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <span className="brand-text">Documentor</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links">
            <Nav.Link 
              as={Link} 
              to="/personagens" 
              className="nav-link-item"
            >
              Personagens
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/estudantes" 
              className="nav-link-item"
            >
              Estudantes
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/professores" 
              className="nav-link-item"
            >
              Professores
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/casas" 
              className="nav-link-item"
            >
              Casas
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/magias" 
              className="nav-link-item"
            >
              Magias
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaHatWizard, FaMagic, FaHome, FaUserGraduate } from "react-icons/fa";
import { FaBookSkull } from "react-icons/fa6"; 
import "./Navbar.css";

const MyNavbar = () => {
  return (
    <Navbar expand="lg" className="hogwarts-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <div className="brand-container">
            <FaHatWizard className="brand-icon" />
            <span className="brand-text">Documentor</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navbar-links">
            <Nav.Link as={Link} to="/" className="nav-link-item">
              <FaHome className="nav-icon" />
              Início
            </Nav.Link>
            <Nav.Link as={Link} to="/estudantes" className="nav-link-item">
              <FaUserGraduate className="nav-icon" />
              Estudantes
            </Nav.Link>
            <Nav.Link as={Link} to="/professores" className="nav-link-item">
              <FaMagic className="nav-icon" />
              Professores
            </Nav.Link>
            <Nav.Link as={Link} to="/casas" className="nav-link-item">
              <FaHome className="nav-icon" /> 
              Casas
            </Nav.Link>
            <Nav.Link as={Link} to="/magias" className="nav-link-item">
            <FaBookSkull className="nav-icon" />
              Magias
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
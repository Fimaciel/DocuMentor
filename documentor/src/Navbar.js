import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">Home</Link>
        <Link to="/publish">Publicar</Link>
      </div>
    </nav>
  );
}

export default Navbar;
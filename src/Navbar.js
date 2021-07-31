import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="link">
        Home
      </Link>
      <img
        className="poke-img-nav"
        alt="Pikachu"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
      />
      <Link to="/pokemon/" className="link">
        Poké Charts
      </Link>
    </nav>
  );
};

export default Navbar;

// menu du haut, avec un menu burger sur mobile
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const LIENS = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/projets', label: 'Projets' },
  { to: '/competences', label: 'Compétences' },
  { to: '/parcours', label: 'Parcours' },
];

function Navbar() {
  const [ouvert, setOuvert] = useState(false);
  const fermer = () => setOuvert(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo" onClick={fermer}>Ondine.</Link>

      <button
        className="navbar__toggle"
        onClick={() => setOuvert(o => !o)}
        aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={ouvert}
        aria-controls="navbar-links"
      >
        {ouvert ? <X size={24} /> : <Menu size={24} />}
      </button>

      <ul id="navbar-links" className={`navbar__links ${ouvert ? 'open' : ''}`}>
        {LIENS.map(({ to, label, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} onClick={fermer}>{label}</NavLink>
          </li>
        ))}
        <li>
          <a href="#contact" onClick={fermer}>Contact</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

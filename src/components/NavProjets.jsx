// boutons en bas d'une page : précédent, remonter en haut, suivant
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import './NavProjets.css';

function NavProjets({ precedent, suivant, chemin }) {
  return (
    <nav className="projet-nav" aria-label="Autres projets">
      <Link to={`${chemin}/${precedent.slug}`} className="projet-nav__lien">
        <span className="projet-nav__sens"><ArrowLeft size={16} /> Projet précédent</span>
        <span className="projet-nav__titre display">{precedent.titre}</span>
      </Link>

      <button
        type="button"
        className="projet-nav__haut"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Remonter en haut de la page"
      >
        <ArrowUp size={22} />
      </button>

      <Link to={`${chemin}/${suivant.slug}`} className="projet-nav__lien projet-nav__lien--suivant">
        <span className="projet-nav__sens">Projet suivant <ArrowRight size={16} /></span>
        <span className="projet-nav__titre display">{suivant.titre}</span>
      </Link>
    </nav>
  );
}

export default NavProjets;

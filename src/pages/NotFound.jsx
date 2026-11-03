// page 404 quand l'adresse n'existe pas
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './NotFound.css';

function NotFound({ message = "Cette page n'existe pas ou a été déplacée." }) {
  return (
    <div className="not-found">
      <span className="not-found__code">404</span>
      <h1>Page <em>introuvable</em></h1>
      <p>{message}</p>
      <Link to="/" className="btn-primary">
        Retour à l'accueil <ArrowRight size={16} />
      </Link>
    </div>
  );
}

export default NotFound;

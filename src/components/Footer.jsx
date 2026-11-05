// footer avec mes contacts et le lien vers les mentions légales
import { Link } from 'react-router-dom';
import { Mail, Phone, FileDown } from 'lucide-react';
import SocialLinks from './SocialLinks';
import TornEdge from './TornEdge';
import profil from '../data/profil.json';
import './Footer.css';

// sur l'accueil, le footer continue la bande noire de Mes outils
function Footer({ colle = false }) {
  return (
    <footer className={`footer ${colle ? 'footer--colle' : ''}`} id="contact">
      {!colle && <TornEdge cote="haut" graine={23} />}

      <div className="footer__corps">
        {colle && <hr className="footer__trait" />}
        <span className="kicker footer__kicker">Contact</span>
        <h2 className="display footer__titre">Discutons <em>ensemble</em></h2>

        <div className="footer__actions">
          {profil.email && (
            <a href={`mailto:${profil.email}`} className="footer__btn">
              <Mail size={16} /> {profil.email}
            </a>
          )}
          {profil.telephone && (
            <a href={`tel:${profil.telephone.replace(/\s/g, '')}`} className="footer__btn footer__btn--outline">
              <Phone size={16} /> {profil.telephone}
            </a>
          )}
          {profil.cv && (
            <a href={profil.cv} download className="footer__btn footer__btn--outline">
              <FileDown size={16} /> Télécharger mon CV
            </a>
          )}
        </div>

        <SocialLinks className="footer__socials" />

        <div className="footer__bas">
          <span>© {new Date().getFullYear()} {profil.nom} Taukolo</span>
          <span className="footer__legal">
            <Link to="/mentions-legales">Mentions légales</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

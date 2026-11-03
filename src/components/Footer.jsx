// footer avec mes contacts, présent sur toutes les pages
import { Mail, Phone, FileDown } from 'lucide-react';
import SocialLinks from './SocialLinks';
import TornEdge from './TornEdge';
import profil from '../data/profil.json';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="contact">
      <TornEdge cote="haut" graine={23} />

      <div className="footer__corps">
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
          <span>Nouvelle-Calédonie ✸</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// liens GitHub et LinkedIn, affichés seulement s'ils sont remplis dans profil.json
import { Github, Linkedin } from './BrandIcons';
import profil from '../data/profil.json';

function SocialLinks({ className }) {
  if (!profil.github && !profil.linkedin) return null;

  return (
    <div className={className}>
      {profil.github && (
        <a href={profil.github} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
          <Github size={18} />
        </a>
      )}
      {profil.linkedin && (
        <a href={profil.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
      )}
    </div>
  );
}

export default SocialLinks;

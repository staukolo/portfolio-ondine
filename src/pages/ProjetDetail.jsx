// page d'un projet : présentation, technos, liens et partie compétences
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { Github } from '../components/BrandIcons';
import FicheReflexive from '../components/FicheReflexive';
import projetsData from '../data/projets.json';
import NotFound from './NotFound';
import './ProjetDetail.css';

function ProjetDetail() {
  const { slug } = useParams();
  const projet = projetsData.find(p => p.slug === slug);

  if (!projet) {
    return <NotFound message="Ce projet n'existe pas ou a été retiré." />;
  }

  // la date sert juste à trier, ici on affiche la période en mois
  const date = projet.periode;

  // pour les applis mobiles on met la capture verticale à gauche
  const formatMobile = Boolean(projet.image_mobile);

  const presentation = (
    <div className="projet-detail__body">
      <section>
        <h2>Le <em>projet</em></h2>
        <p>{projet.description_longue}</p>
      </section>

      <aside className="projet-detail__aside">
        <h2>Les <em>technos</em></h2>
        <div className="projet-detail__tags">
          {projet.technologies.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>

        {(projet.lien_github || projet.lien_demo) && (
          <div className="projet-detail__links">
            {projet.lien_demo && (
              <a href={projet.lien_demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Voir la démo <ExternalLink size={16} />
              </a>
            )}
            {projet.lien_github && (
              <a href={projet.lien_github} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Github size={16} /> Code source
              </a>
            )}
          </div>
        )}
      </aside>
    </div>
  );

  return (
    <article className="projet-detail">
      <Link to="/projets" className="projet-detail__back">
        <ArrowLeft size={16} /> Tous les projets
      </Link>

      <header className="projet-detail__header">
        <span className="projet-detail__contexte">{projet.contexte === 'academique' ? 'Académique' : 'Personnel'}</span>
        <h1>{projet.titre}</h1>
        <p className="projet-detail__intro">{projet.description_courte}</p>
        {date && (
          <span className="projet-detail__date">
            <Calendar size={16} /> {date}
          </span>
        )}
      </header>

      {formatMobile ? (
        <div className="projet-detail__mobile">
          <img className="projet-detail__capture" src={projet.image_mobile} alt={`Aperçu de l'application ${projet.titre}`} />
          {presentation}
        </div>
      ) : (
        <>
          {projet.image ? (
            <img className="projet-detail__image" src={projet.image} alt={`Aperçu du projet ${projet.titre}`} />
          ) : (
            <div className="projet-detail__image projet-detail__image--placeholder" />
          )}
          {presentation}
        </>
      )}

      <FicheReflexive projet={projet} />
    </article>
  );
}

export default ProjetDetail;

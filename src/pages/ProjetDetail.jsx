// page d'un projet : présentation, technos, liens et images
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { Github } from '../components/BrandIcons';
import Carrousel from '../components/Carrousel';
import EtudeCas from '../components/EtudeCas';
import NavProjets from '../components/NavProjets';
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
  const recap = projet.recap;

  // projet d'avant et d'après, on boucle au bout de la liste
  const index = projetsData.indexOf(projet);
  const precedent = projetsData[(index - 1 + projetsData.length) % projetsData.length];
  const suivant = projetsData[(index + 1) % projetsData.length];

  const carrousel = projet.galerie && <Carrousel titre={projet.galerie.titre} images={projet.galerie.images} document={projet.galerie.document} />;

  const presentation = (
    <div className="projet-detail__body">
      {projet.etude ? (
        <section className="projet-detail__recit">
          <h2>Le <em>contexte</em></h2>
          <p>{projet.etude.contexte}</p>
          <h2>L'<em>objectif</em></h2>
          <p>{projet.etude.objectif}</p>
        </section>
      ) : (
        <section>
          <h2>Le <em>projet</em></h2>
          <p>{projet.description_longue}</p>
        </section>
      )}

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
        {date && !recap && (
          <span className="projet-detail__date">
            <Calendar size={16} /> {date}
          </span>
        )}
      </header>

      {recap && (
        <dl className="recap">
          {[
            ['Cadre', recap.cadre],
            ['Durée', date],
            ['Équipe', recap.equipe],
            ['Mon rôle', recap.role],
            ['Outils', recap.outils],
            ['Statut', recap.statut],
          ].filter(([, valeur]) => valeur).map(([label, valeur]) => (
            <div key={label} className="recap__ligne">
              <dt>{label}</dt>
              <dd>{valeur}</dd>
            </div>
          ))}
        </dl>
      )}

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

      {projet.etude ? <EtudeCas etude={projet.etude}>{carrousel}</EtudeCas> : carrousel}

      <NavProjets precedent={precedent} suivant={suivant} chemin="/projets" />
    </article>
  );
}

export default ProjetDetail;

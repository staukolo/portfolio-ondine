// page Projets : tous mes projets en polaroids
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { Github } from '../components/BrandIcons';
import PageHeader from '../components/PageHeader';
import projetsData from '../data/projets.json';
import './Projets.css';

const LABELS_CONTEXTE = { academique: 'Académique', personnel: 'Personnel' };

function Projets() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.polaroid', {
          opacity: 0,
          y: -30,
          scale: 1.05,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.5)',
          clearProps: 'opacity,transform',
        });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="projets-page">
      <PageHeader
        kicker="Réalisations / 2024 — 2026"
        title={<>Mes <em>projets</em></>}
        intro="Web, 3D, mobile, vidéo… une sélection de projets réalisés pendant mon BUT MMI."
        aside={<span className="projets-compteur display">{String(projetsData.length).padStart(2, '0')}<small>projets</small></span>}
      />

      <section className="projets-mur" ref={gridRef}>
        {projetsData.map((projet, index) => (
          <article key={projet.id} className="polaroid">
            <Link to={`/projets/${projet.slug}`} className="polaroid__photo" aria-label={`Voir le projet ${projet.titre}`}>
              {projet.image && <img src={projet.image} alt="" loading="lazy" />}
              <span className="polaroid__titre display">{projet.titre}</span>
              <span className="polaroid__stamp">{LABELS_CONTEXTE[projet.contexte] ?? projet.contexte}</span>
            </Link>

            <div className="polaroid__body">
              <span className="polaroid__numero">N°{String(index + 1).padStart(2, '0')}</span>
              <h3>
                <Link to={`/projets/${projet.slug}`}>{projet.titre}</Link>
              </h3>
              <p>{projet.description_courte}</p>

              <div className="polaroid__tags">
                {projet.technologies.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>

              <div className="polaroid__links">
                <Link to={`/projets/${projet.slug}`} className="link-btn">
                  Détails <ArrowRight size={16} />
                </Link>
                {projet.lien_github && (
                  <a href={projet.lien_github} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <Github size={16} /> Code
                  </a>
                )}
                {projet.lien_demo && (
                  <a href={projet.lien_demo} target="_blank" rel="noopener noreferrer" className="link-btn">
                    <ExternalLink size={16} /> Démo
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Projets;

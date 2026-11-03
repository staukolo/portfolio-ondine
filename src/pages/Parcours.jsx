// page Parcours : mes formations et expériences en une seule liste
import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHeader from '../components/PageHeader';
import experiencesData from '../data/experiences.json';
import formationsData from '../data/formations.json';
import './Parcours.css';

gsap.registerPlugin(ScrollTrigger);

function Parcours() {
  const timelineRef = useRef(null);
  // on mélange formations et expériences, la plus récente en premier
  const items = [
    ...experiencesData.map(e => ({
      type: 'experience',
      titre: e.poste,
      sousTitre: e.entreprise,
      lieu: e.lieu,
      dateDebut: e.date_debut,
      dateFin: e.date_fin,
      description: e.description,
    })),
    ...formationsData.map(f => ({
      type: 'formation',
      titre: f.intitule,
      sousTitre: f.etablissement,
      lieu: null,
      dateDebut: f.date_debut,
      dateFin: f.date_fin,
      description: f.description,
    })),
  ].sort((a, b) => new Date(b.dateDebut) - new Date(a.dateDebut));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.etape').forEach((etape) => {
          gsap.from(etape, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'opacity,transform',
            scrollTrigger: { trigger: etape, start: 'top 90%', once: true },
          });
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateStr, anneeSeule = false) => {
    if (!dateStr) return 'Aujourd\'hui';
    const date = new Date(dateStr);
    return anneeSeule
      ? String(date.getFullYear())
      : date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="parcours-page">
      <PageHeader
        kicker={`Formations & expériences / ${items.length} étapes`}
        title={<>Mon <em>parcours</em></>}
        intro="Formations, stages et alternance : le chemin qui m’a menée au développement web, du plus récent au plus ancien."
        aside={
          <div className="parcours-legende">
            <span className="sticker sticker--ink"><Briefcase size={14} /> Expérience</span>
            <span className="sticker sticker--red"><GraduationCap size={14} /> Formation</span>
          </div>
        }
      />

      <ol className="etapes" ref={timelineRef}>
        {items.map((item, index) => {
          const anneeSeule = item.type === 'formation';
          return (
            <li key={index} className={`etape etape--${item.type}`}>
              <div className="etape__annee display">
                {new Date(item.dateDebut).getFullYear()}
              </div>

              <div className="etape__contenu">
                <span className="etape__dates">
                  {formatDate(item.dateDebut, anneeSeule)} — {formatDate(item.dateFin, anneeSeule)}
                </span>
                <h3>{item.titre}</h3>
                <p className="etape__lieu">
                  {item.sousTitre}
                  {item.lieu && (
                    <span><MapPin size={13} /> {item.lieu}</span>
                  )}
                </p>
                {item.description && <p className="etape__description">{item.description}</p>}
              </div>

              <span className={`sticker sticker--small etape__type ${item.type === 'experience' ? 'sticker--ink' : 'sticker--red'}`}>
                {item.type === 'experience' ? <Briefcase size={12} /> : <GraduationCap size={12} />}
                {item.type === 'experience' ? 'Expérience' : 'Formation'}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Parcours;

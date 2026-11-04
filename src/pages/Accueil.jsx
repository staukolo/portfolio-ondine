// page d'accueil : titre PORTFOLIO, présentation, bande portrait et projets
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight, FileDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';
import BandePortrait from '../components/BandePortrait';
import profil from '../data/profil.json';
import projetsData from '../data/projets.json';
import competencesData from '../data/competences.json';
import experiencesData from '../data/experiences.json';
import formationsData from '../data/formations.json';
import './Accueil.css';

gsap.registerPlugin(ScrollTrigger);

const WORDS = ['Développeuse Web', 'Étudiante BUT MMI', 'Curieuse de tout'];
const TYPING_SPEED = 90;
const ERASING_SPEED = 45;
const PAUSE_DURATION = 1500;

// "bonjour" dans plusieurs langues, les lettres tombent une par une
const SALUTS = ['Malo', 'Bonjour', 'Hello'];

function Salut() {
  const [index, setIndex] = useState(0);
  const [sortie, setSortie] = useState(false);

  useEffect(() => {
    let attente;
    const minuteur = setTimeout(() => {
      setSortie(true);
      attente = setTimeout(() => {
        setIndex((i) => (i + 1) % SALUTS.length);
        setSortie(false);
      }, 500);
    }, 2600);
    return () => { clearTimeout(minuteur); clearTimeout(attente); };
  }, [index]);

  return (
    <h2 className="display hello__titre" aria-label={SALUTS.join(', ')}>
      <span key={index} className={`salut ${sortie ? 'salut--sortie' : ''}`} aria-hidden="true">
        {SALUTS[index].split('').map((lettre, i) => (
          <span key={i} className="salut__lettre" style={{ '--i': i }}>{lettre}</span>
        ))}
      </span>
    </h2>
  );
}

const BANDE_SEGMENTS = [
  { texte: 'Développeuse web' },
  { texte: '✸', accent: true },
  { texte: 'Design UI' },
  { texte: '✸', accent: true },
  { texte: 'Front-end' },
  { texte: '✸', accent: true },
];


// "React" → "Re", "PHP MVC" → "PM" pour les icônes de skills
const abreviation = (nom) => {
  const mots = nom.replace(/[^\p{L}\s.]/gu, ' ').split(/\s+/).filter(Boolean);
  if (mots.length > 1) return (mots[0][0] + mots[1][0]).toUpperCase();
  return mots[0][0].toUpperCase() + (mots[0][1] ?? '').toLowerCase();
};

const formatMois = (date) => date
  ? new Date(date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  : 'Aujourd’hui';

function VisageO({ avatar = false }) {
  if (avatar && profil.avatar) {
    return <img className="titre-o__photo titre-o__photo--avatar" src={profil.avatar} alt="" />;
  }
  if (profil.photo) {
    return <img className="titre-o__photo" src={profil.photo} alt="" />;
  }
  return (
    <svg className="titre-o__visage" viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="currentColor" strokeWidth="5" />
      <path d="M22 34 Q30 18 44 26 Q52 14 64 24 Q78 18 80 36" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="37" cy="50" r="4.5" fill="currentColor" />
      <circle cx="63" cy="50" r="4.5" fill="currentColor" />
      <path d="M36 66 Q50 78 64 66" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <circle cx="27" cy="62" r="6" fill="var(--red)" opacity="0.8" />
      <circle cx="73" cy="62" r="6" fill="var(--red)" opacity="0.8" />
    </svg>
  );
}

function Accueil() {
  const [typedText, setTypedText] = useState('');
  const pageRef = useRef(null);

  const projetsPhares = projetsData.filter(p => p.mis_en_avant);
  const formation = formationsData[0];
  // effet machine à écrire
  useEffect(() => {
    let isTyping = true;
    let wordIndex = 0;
    let charIndex = 0;
    let timeout;

    const type = () => {
      const currentWord = WORDS[wordIndex];
      if (isTyping) {
        if (charIndex < currentWord.length) {
          setTypedText(currentWord.slice(0, charIndex + 1));
          charIndex++;
        } else {
          timeout = setTimeout(() => { isTyping = false; type(); }, PAUSE_DURATION);
          return;
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setTypedText(currentWord.slice(0, charIndex));
        } else {
          wordIndex = (wordIndex + 1) % WORDS.length;
          isTyping = true;
        }
      }
      timeout = setTimeout(type, isTyping ? TYPING_SPEED : ERASING_SPEED);
    };

    type();
    return () => clearTimeout(timeout);
  }, []);
  // animations GSAP, coupées si on préfère moins de mouvement
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.titre-lettre', {
          yPercent: 110,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power4.out',
        });
        gsap.from('.hero__fade', {
          opacity: 0,
          y: 16,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          ease: 'power2.out',
        });

        gsap.utils.toArray('.reveal').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="accueil" ref={pageRef}>
      <section className="hero">
        <div className="hero__top hero__fade">
          <span className="kicker">Développeuse web / Design UI</span>
          <span className="kicker">{new Date().getFullYear()}</span>
        </div>

        <div className="hero__bloc">
        <h1 className="hero__titre display" aria-label="Portfolio">
          {'PORTF'.split('').map((l, i) => (
            <span key={i} className="titre-masque" aria-hidden="true"><span className="titre-lettre">{l}</span></span>
          ))}
          <span className="titre-masque" aria-hidden="true">
            <span className="titre-lettre titre-o"><VisageO avatar /></span>
          </span>
          {'LIO'.split('').map((l, i) => (
            <span key={`b${i}`} className="titre-masque" aria-hidden="true"><span className="titre-lettre">{l}</span></span>
          ))}
        </h1>

        <div className="hero__signature hero__fade">
          <svg className="hero__fleche" viewBox="0 0 60 50" aria-hidden="true">
            <path d="M6 44 C 10 24, 26 12, 50 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 4 L51 8 L43 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hand">{profil.nom} Taukolo</span>
        </div>
        </div>

        <p className="hero__typing hero__fade">
          <span>{typedText}</span><span className="cursor" aria-hidden="true"></span>
        </p>

        <div className="hero__ornements hero__fade" aria-hidden="true">✸ ✦ ✿</div>
      </section>

      <section className="hello reveal">
        <figure className="hello__photo">
          <div className="cadre-selection">
            {profil.photo ? (
              <img src={profil.photo} alt={`Portrait de ${profil.nom}`} />
            ) : (
              <div className="hello__photo-vide">
                <span>ta photo<br />détourée ici</span>
              </div>
            )}
            <span className="poignee poignee--hg" />
            <span className="poignee poignee--hd" />
            <span className="poignee poignee--bg" />
            <span className="poignee poignee--bd" />
            <span className="poignee poignee--h" />
            <span className="poignee poignee--b" />
          </div>
        </figure>

        <div className="hello__texte">
          <Salut />
          <p className="hello__intro">
            Moi c’est Ondine ! Je suis étudiante en développement web, passionnée par le
            front-end, le design d’interface et l’image.
          </p>
          <p>
            Après un bac général spécialités Maths et NSI, j’avais envie de faire quelque chose de
            plus créatif, alors j’ai choisi le BUT MMI.
            <br />
            Pendant ma formation, j’ai surtout accroché au développement front-end et au design.
            J’aime m’occuper des couleurs, des animations et de tous les petits détails qui rendent
            un site agréable.
          </p>
          <p>
            En parallèle, la vidéo et la photo ont pris une grande place dans ma vie. Le montage,
            le motion design et la photographie m’ont appris à soigner le rythme, le cadrage et
            l’émotion d’une image.
          </p>

          {formation && (
            <>
              <h3 className="display hello__sous-titre">Formation</h3>
              <p className="hello__ligne">
                <strong>{formation.intitule}</strong><br />
                {formation.etablissement} · {new Date(formation.date_debut).getFullYear()} — {formation.date_fin ? new Date(formation.date_fin).getFullYear() : 'Aujourd’hui'}
              </p>
            </>
          )}

          <div className="hello__actions">
            <Link to="/parcours" className="btn-outline">Mon parcours <ArrowUpRight size={16} /></Link>
            {profil.cv && (
              <a href={profil.cv} download className="btn-primary">CV <FileDown size={16} /></a>
            )}
          </div>
        </div>

        <aside className="hello__aside">
          <h3 className="display hello__sous-titre">Skills</h3>
          <ul className="skills">
            {competencesData.map((c) => (
              <li key={c.id} className={`skill skill--${c.categorie}`} title={c.nom}>
                <span className="skill__icone" aria-hidden="true">{abreviation(c.nom)}</span>
                <span className="skill__nom">{c.nom}</span>
              </li>
            ))}
          </ul>

          <h3 className="display hello__sous-titre">Expérience</h3>
          <ul className="experiences">
            {experiencesData.map((e) => (
              <li key={e.id}>
                <span className="experiences__dates">{formatMois(e.date_debut)} — {formatMois(e.date_fin)}</span>
                <strong>{e.poste}</strong>
                <span>{e.entreprise}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <BandePortrait segments={BANDE_SEGMENTS} photo={profil.photo} alt={`Portrait de ${profil.nom}`}>
        <div className="bande__portrait-vide"><VisageO /></div>
      </BandePortrait>

      <section className="studio reveal">
        <div className="studio__entete">
          <h2 className="display studio__titre">Les <em>projets</em></h2>
          <Link to="/projets" className="btn-outline">Tout voir <ArrowRight size={16} /></Link>
        </div>

        <div className="studio__polaroids">
          {projetsPhares.map((projet) => (
            <Link key={projet.id} to={`/projets/${projet.slug}`} className="polaroid-mini">
              <span className="polaroid-mini__photo">
                {projet.image && <img src={projet.image} alt="" loading="lazy" />}
                <span className="polaroid-mini__titre display">{projet.titre}</span>
              </span>
              <span className="polaroid-mini__legende">
                <strong>{projet.titre}</strong>
                <span>{projet.description_courte}</span>
              </span>
            </Link>
          ))}
        </div>

        <SocialLinks className="studio__socials" />
      </section>
    </div>
  );
}

export default Accueil;

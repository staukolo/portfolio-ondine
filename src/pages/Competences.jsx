// page Compétences : les AC de BUT 3 et les projets qui les prouvent
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import TornEdge from '../components/TornEdge';
import referentiel from '../data/referentiel.json';
import outils from '../data/outils.json';
import { TOUS_LES_AC, PROJETS_AVEC_FICHE, projetsPourAC } from '../utils/competences';
import './Competences.css';

const TOUS_LES_OUTILS = outils.flatMap((g) => g.outils);
const MOITIE = Math.ceil(TOUS_LES_OUTILS.length / 2);
const LIGNES = [TOUS_LES_OUTILS.slice(0, MOITIE), TOUS_LES_OUTILS.slice(MOITIE)];

function Outil({ outil, index = 0 }) {
  return (
    <li className="outil" style={{ '--i': index }}>
      {outil.logo ? (
        <img src={outil.logo} alt="" className={`outil__logo ${outil.sombre ? 'outil__logo--sombre' : ''} ${outil.large ? 'outil__logo--large' : ''}`} />
      ) : (
        <span className="outil__logo outil__logo--texte" aria-hidden="true">
          {outil.nom.split(' ').map((m) => m[0]).join('').slice(0, 3)}
        </span>
      )}
      <span className="outil__nom">{outil.nom}</span>
    </li>
  );
}

function Competences() {
  const acCouverts = TOUS_LES_AC.filter((ac) => projetsPourAC(ac.code).length > 0).length;
  const [onglet, setOnglet] = useState('Tout');
  const groupe = outils.find((g) => g.categorie === onglet);

  return (
    <div className="competences-page">
      <PageHeader
        kicker={`Volet compétences / ${referentiel.annee}`}
        title={<>Mes <em>compétences</em></>}
        intro={`${referentiel.formation}. Pour chaque apprentissage critique (AC), les projets qui le prouvent, avec mon analyse pour chacun.`}
        aside={
          <span className="projets-compteur competences-compteur display">
            {acCouverts}/{TOUS_LES_AC.length}
            <small>AC prouvés</small>
          </span>
        }
      />

      {referentiel.competences.map((competence) => (
        <section key={competence.id} className="competence" style={{ '--c': competence.couleur }}>
          <header className="competence__entete">
            <h2 className="display competence__nom">{competence.nom}</h2>
            <p className="competence__intitule">
              {competence.intitule}
              <span>Niveau {competence.niveau} · {competence.niveau_intitule}</span>
            </p>
          </header>

          <ul className="ac-liste">
            {competence.ac.map((ac) => {
              const preuves = projetsPourAC(ac.code);
              return (
                <li key={ac.code} id={ac.code} className={`ac ${preuves.length ? '' : 'ac--vide'}`}>
                  <span className="ac__code">{ac.code}</span>
                  <span className="ac__libelle">{ac.libelle}</span>
                  <span className="ac__preuves">
                    {preuves.length ? preuves.map((p) => (
                      <Link key={p.id} to={`/projets/${p.slug}`} className="sticker sticker--small">
                        {p.titre}
                      </Link>
                    )) : <span className="ac__a-venir">À venir</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section className="outils">
        <TornEdge cote="haut" graine={41} />
        <div className="outils__fond">
        <h2 className="display outils__titre">Mes <em>outils</em></h2>
        <div className="outils__onglets" role="tablist">
          {['Tout', ...outils.map((g) => g.categorie)].map((nom) => (
            <button
              key={nom}
              type="button"
              role="tab"
              aria-selected={onglet === nom}
              className={`outils__onglet ${onglet === nom ? 'is-actif' : ''}`}
              onClick={() => setOnglet(nom)}
            >
              {nom}
            </button>
          ))}
        </div>

        {/* la zone garde toujours la même hauteur, avec Tout les logos défilent */}
        <div className="outils__scene" role="tabpanel">
          {groupe ? (
            <ul key={onglet} className="outils__groupe">
              {groupe.outils.map((outil, i) => <Outil key={outil.nom} outil={outil} index={i} />)}
            </ul>
          ) : (
            <div key="tout" className="outils__defile">
              {LIGNES.map((ligne, n) => (
                <div key={n} className={`outils__piste ${n ? 'outils__piste--inverse' : ''}`}>
                  {[0, 1].map((copie) => (
                    <ul key={copie} aria-hidden={copie === 1}>
                      {ligne.map((outil) => <Outil key={outil.nom} outil={outil} />)}
                    </ul>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
        <TornEdge cote="bas" graine={57} />
      </section>

      <section className="journal">
        <h2 className="display journal__titre">Journal de <em>progression</em></h2>

        <ol className="journal__liste">
          {PROJETS_AVEC_FICHE.map((projet) => (
            <li key={projet.id}>
              <Link to={`/projets/${projet.slug}`} className="journal__entree">
                <span className="journal__projet display">{projet.titre}</span>
                <span className="journal__ac">{projet.fiche.ac.join(' · ')}</span>
                <span className="journal__lire">Lire la fiche <ArrowRight size={16} /></span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default Competences;

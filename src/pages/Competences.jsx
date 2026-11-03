// page Compétences : les AC de BUT 3 et les projets qui les prouvent
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import referentiel from '../data/referentiel.json';
import { TOUS_LES_AC, PROJETS_AVEC_FICHE, projetsPourAC } from '../utils/competences';
import './Competences.css';

function Competences() {
  const acCouverts = TOUS_LES_AC.filter((ac) => projetsPourAC(ac.code).length > 0).length;

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

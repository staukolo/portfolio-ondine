// page protégée par mot de passe : les AC de BUT 3 et les fiches qui les prouvent
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import referentiel from '../data/referentiel.json';
import { TOUS_LES_AC, projetsAvecFiche, projetsPourAC } from '../utils/competences';
import { useFiches } from '../utils/fiches';
import './EspaceEnseignants.css';

function EspaceEnseignants() {
  const { fiches, erreur } = useFiches();
  const acCouverts = fiches
    ? TOUS_LES_AC.filter((ac) => projetsPourAC(ac.code, fiches).length > 0).length
    : null;

  return (
    <div className="enseignants-page">
      <Link to="/" className="btn-outline enseignants__public">
        Voir le portfolio public <ArrowUpRight size={16} />
      </Link>

      <PageHeader
        kicker={`Espace enseignants / ${referentiel.annee}`}
        title={<>Mes <em>compétences</em></>}
        intro={`${referentiel.formation}. Pour chaque apprentissage critique (AC), les projets qui le prouvent, avec mon analyse pour chacun.`}
        aside={fiches && (
          <span className="projets-compteur enseignants-compteur display">
            {acCouverts}/{TOUS_LES_AC.length}
            <small>AC prouvés</small>
          </span>
        )}
      />

      {erreur && <p className="enseignants__erreur">Impossible de charger les fiches. Recharge la page.</p>}

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
              const preuves = fiches ? projetsPourAC(ac.code, fiches) : [];
              return (
                <li key={ac.code} id={ac.code} className={`ac ${fiches && !preuves.length ? 'ac--vide' : ''}`}>
                  <span className="ac__code">{ac.code}</span>
                  <span className="ac__libelle">{ac.libelle}</span>
                  <span className="ac__preuves">
                    {preuves.map((p) => (
                      <Link key={p.id} to={`/espace-enseignants/${p.slug}`} className="sticker sticker--small">
                        {p.titre}
                      </Link>
                    ))}
                    {fiches && !preuves.length && <span className="ac__a-venir">À venir</span>}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      {fiches && (
        <section className="journal">
          <h2 className="display journal__titre">Journal de <em>progression</em></h2>

          <ol className="journal__liste">
            {projetsAvecFiche(fiches).map((projet) => (
              <li key={projet.id}>
                <Link to={`/espace-enseignants/${projet.slug}`} className="journal__entree">
                  <span className="journal__projet display">{projet.titre}</span>
                  <span className="journal__ac">{fiches[projet.slug].ac.join(' · ')}</span>
                  <span className="journal__lire">Lire la fiche <ArrowRight size={16} /></span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}

export default EspaceEnseignants;

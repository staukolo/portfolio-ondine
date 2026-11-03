// partie compétences d'un projet : AC, preuves, démonstration et bilan
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';
import { trouverAC } from '../utils/competences';
import './FicheReflexive.css';

function AnalyseAC({ analyse }) {
  const ac = trouverAC(analyse.ac);
  return (
    <article className="analyse" style={{ '--c': ac?.competence.couleur }}>
      <h3 className="analyse__titre">
        <span className="analyse__code">{analyse.ac}</span>
        {ac?.libelle}
      </h3>
      <p className="analyse__texte">{analyse.texte}</p>
    </article>
  );
}

function FicheReflexive({ projet }) {
  const { fiche } = projet;
  if (!fiche) return null;

  const preuves = [
    projet.lien_github && { href: projet.lien_github, label: 'Dépôt GitHub', icone: <Github size={16} /> },
    projet.lien_demo && { href: projet.lien_demo, label: 'Site en ligne', icone: <ExternalLink size={16} /> },
    ...(fiche.preuves ?? []).map((p) => ({ href: p.url, label: p.label, icone: <ExternalLink size={16} /> })),
  ].filter(Boolean);

  const bilan = [
    fiche.recul && { titre: <>Difficultés &amp; <em>axes d’amélioration</em></>, texte: fiche.recul },
    fiche.dimension_pro && { titre: <>Dimension <em>pro</em></>, texte: fiche.dimension_pro },
    fiche.je_vs_nous && { titre: <>Synthèse <em>Je vs Nous</em></>, texte: fiche.je_vs_nous },
  ].filter(Boolean);

  return (
    <section className="fiche" aria-labelledby="fiche-titre">
      <header className="fiche__entete">
        <span className="kicker">Volet compétences / Journal de progression</span>
        <h2 id="fiche-titre" className="display fiche__titre">Ce que ça <em>prouve</em></h2>
      </header>

      <div className="fiche__bandeau">
        <div className="fiche__groupe">
          <h3 className="kicker fiche__etiquette">AC visés</h3>
          <ul className="fiche__ac">
            {fiche.ac.map((code) => {
              const ac = trouverAC(code);
              return (
                <li key={code}>
                  <Link
                    to={`/competences#${code}`}
                    className="fiche__ac-code"
                    style={{ '--c': ac?.competence.couleur }}
                    title={ac?.libelle}
                  >
                    {code}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        {preuves.length > 0 && (
          <div className="fiche__groupe">
            <h3 className="kicker fiche__etiquette">Preuve de compétence</h3>
            <div className="fiche__preuves">
              {preuves.map((p) => (
                <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer" className="btn-outline">
                  {p.icone} {p.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <h3 className="display fiche__bloc-titre fiche__demo-titre">Démonstration</h3>
      {fiche.intro && <p className="fiche__intro">{fiche.intro}</p>}
      {fiche.analyses?.length > 0 && (
        <div className="fiche__analyses">
          {fiche.analyses.map((analyse) => <AnalyseAC key={analyse.ac} analyse={analyse} />)}
        </div>
      )}

      {bilan.length > 0 && (
        <div className="fiche__bilan">
          {bilan.map(({ titre, texte }, i) => (
            <div key={i} className="fiche__bloc">
              <h3 className="display fiche__bloc-titre">{titre}</h3>
              <p>{texte}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FicheReflexive;

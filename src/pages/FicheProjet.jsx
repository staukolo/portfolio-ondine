// page protégée par mot de passe : la fiche réflexive d'un projet
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import FicheReflexive from '../components/FicheReflexive';
import NavProjets from '../components/NavProjets';
import projetsData from '../data/projets.json';
import { projetsAvecFiche } from '../utils/competences';
import { useFiches } from '../utils/fiches';
import NotFound from './NotFound';
import './FicheProjet.css';

function FicheProjet() {
  const { slug } = useParams();
  const { fiches, erreur } = useFiches();
  const projet = projetsData.find((p) => p.slug === slug);

  if (!projet || (fiches && !fiches[slug])) {
    return <NotFound message="Cette fiche n'existe pas." />;
  }

  // fiche d'avant et d'après, on boucle au bout de la liste
  const liste = fiches ? projetsAvecFiche(fiches) : [];
  const index = liste.findIndex((p) => p.slug === slug);
  const precedent = liste[(index - 1 + liste.length) % liste.length];
  const suivant = liste[(index + 1) % liste.length];

  return (
    <article className="fiche-projet">
      <Link to="/espace-enseignants" className="fiche-projet__retour">
        <ArrowLeft size={16} /> Toutes les compétences
      </Link>

      <header className="fiche-projet__entete">
        <h1 className="display fiche-projet__titre">{projet.titre}</h1>
        <Link to={`/projets/${projet.slug}`} className="btn-outline">
          Voir la page du projet <ArrowUpRight size={16} />
        </Link>
      </header>

      {erreur && <p>Impossible de charger la fiche. Recharge la page.</p>}
      {fiches && <FicheReflexive key={slug} projet={projet} fiche={fiches[slug]} />}
      {fiches && <NavProjets precedent={precedent} suivant={suivant} chemin="/espace-enseignants" />}
    </article>
  );
}

export default FicheProjet;

// fonctions pour relier les AC du référentiel aux projets
import referentiel from '../data/referentiel.json';
import projetsData from '../data/projets.json';

export const TOUS_LES_AC = referentiel.competences.flatMap((competence) =>
  competence.ac.map((ac) => ({ ...ac, competence })),
);

export const trouverAC = (code) => TOUS_LES_AC.find((ac) => ac.code === code);

export const projetsAvecFiche = (fiches) => projetsData
  .filter((p) => fiches[p.slug]?.ac?.length)
  .sort((a, b) => (b.date_realisation ?? '').localeCompare(a.date_realisation ?? ''));

export const projetsPourAC = (code, fiches) =>
  projetsAvecFiche(fiches).filter((p) => fiches[p.slug].ac.includes(code));

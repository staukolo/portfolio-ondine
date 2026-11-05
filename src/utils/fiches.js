// charge les fiches depuis le fichier protégé par le mot de passe
import { useEffect, useState } from 'react';

let chargement = null;

function chargerFiches() {
  chargement ??= fetch('/espace-enseignants/fiches.json')
    .then((reponse) => {
      if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
      return reponse.json();
    })
    .catch((erreur) => {
      chargement = null;
      throw erreur;
    });
  return chargement;
}

export function useFiches() {
  const [etat, setEtat] = useState({ fiches: null, erreur: false });

  useEffect(() => {
    let actif = true;
    chargerFiches()
      .then((fiches) => { if (actif) setEtat({ fiches, erreur: false }); })
      .catch(() => { if (actif) setEtat({ fiches: null, erreur: true }); });
    return () => { actif = false; };
  }, []);

  return etat;
}

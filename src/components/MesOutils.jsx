// section Mes outils de l'accueil : onglets et logos dans une bande noire
import { useState } from 'react';
import TornEdge from './TornEdge';
import outils from '../data/outils.json';
import './MesOutils.css';

const TOUS_LES_OUTILS = outils.flatMap((g) => g.outils);
const MOITIE = Math.ceil(TOUS_LES_OUTILS.length / 2);
const LIGNES = [TOUS_LES_OUTILS.slice(0, MOITIE), TOUS_LES_OUTILS.slice(MOITIE)];

function Outil({ outil, index = 0 }) {
  return (
    <li className="outil" style={{ '--i': index }}>
      <img
        src={outil.logo}
        alt=""
        className={`outil__logo ${outil.sombre ? 'outil__logo--sombre' : ''} ${outil.large ? 'outil__logo--large' : ''}`}
      />
      <span className="outil__nom">{outil.nom}</span>
    </li>
  );
}

function MesOutils() {
  const [onglet, setOnglet] = useState('Tout');
  const groupe = outils.find((g) => g.categorie === onglet);

  return (
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
    </section>
  );
}

export default MesOutils;

// bord de papier déchiré en SVG, utilisé au-dessus du footer
import { useId } from 'react';
import './TornEdge.css';

const LARGEUR = 1440;
const HAUTEUR = 64;

function aleatoire(graine) {
  let s = graine;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function bruit(rand, pas, amplitude) {
  const points = Array.from({ length: Math.ceil(LARGEUR / pas) + 2 }, () => (rand() - 0.5) * 2 * amplitude);
  return (x) => {
    const i = Math.floor(x / pas);
    const t = (1 - Math.cos(((x % pas) / pas) * Math.PI)) / 2;
    return points[i] * (1 - t) + points[i + 1] * t;
  };
}

function genererDechirure(graine) {
  const rand = aleatoire(graine);
  const vague = bruit(rand, 260, 12);
  const cassure = bruit(rand, 55, 5);
  const epaisseur = bruit(rand, 80, 7);

  const bord = [];
  const fond = [];
  for (let x = -20; x <= LARGEUR + 20; x += 6) {
    const xc = Math.max(0, Math.min(LARGEUR, x));
    const y = 20 + vague(xc) + cassure(xc) + (rand() - 0.5) * 3;
    bord.push([x, y]);
    fond.push([x, y + Math.max(3, 10 + epaisseur(xc) + rand() * 4)]);
  }

  // le noir dépasse un peu en bas pour ne pas voir de ligne au raccord
  const versChemin = (ligne, bas) =>
    `M${ligne.map(([x, y]) => `${x},${y.toFixed(1)}`).join(' L')} L${LARGEUR + 20},${bas} L-20,${bas} Z`;

  return { papier: versChemin(bord, HAUTEUR - 2), encre: versChemin(fond, HAUTEUR + 20) };
}

function TornEdge({ cote = 'haut', graine = 7 }) {
  const id = useId().replace(/:/g, '');
  const { papier, encre } = genererDechirure(graine);

  return (
    <svg
      className={`torn-edge torn-edge--${cote}`}
      viewBox={`0 0 ${LARGEUR} ${HAUTEUR}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={`fibres-${id}`} x="-5%" y="-40%" width="110%" height="180%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.06 0.22" numOctaves="4" seed={graine} result="bruit" />
          <feDisplacementMap in="SourceGraphic" in2="bruit" scale="7" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`bord-${id}`} x="-5%" y="-40%" width="110%" height="180%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.09 0.3" numOctaves="3" seed={graine + 5} result="bruit" />
          <feDisplacementMap in="SourceGraphic" in2="bruit" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`grain-${id}`} colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={graine + 11} result="g" />
          <feColorMatrix in="g" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0" result="ga" />
          <feComposite in="ga" in2="SourceGraphic" operator="in" result="gc" />
          <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="gc" /></feMerge>
        </filter>
      </defs>

      <g filter={`url(#grain-${id})`}>
        <path d={papier} fill="#fbfaf6" filter={`url(#fibres-${id})`} />
      </g>
      <path d={encre} fill="var(--ink)" filter={`url(#bord-${id})`} />
    </svg>
  );
}

export default TornEdge;

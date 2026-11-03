// bande noire de l'accueil : texte qui défile, mon portrait et le papier déchiré
import { useLayoutEffect, useRef } from 'react';
import MarqueeCreuse from './MarqueeCreuse';
import './BandePortrait.css';

function aleatoire(graine) {
  let s = graine;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function bruit(rand, pas, amplitude) {
  const points = Array.from({ length: Math.ceil(100 / pas) + 2 }, () => (rand() - 0.5) * 2 * amplitude);
  return (x) => {
    const i = Math.floor(x / pas);
    const t = (1 - Math.cos(((x % pas) / pas) * Math.PI)) / 2;
    return points[i] * (1 - t) + points[i + 1] * t;
  };
}

// bord du papier : il descend plus bas au centre
function genererBord(graine) {
  const rand = aleatoire(graine);
  const vague = bruit(rand, 18, 4);
  const cassure = bruit(rand, 4, 2.2);
  const epaisseur = bruit(rand, 6, 2.5);

  const bord = [];
  const fibres = [];
  for (let x = 0; x <= 100.001; x += 0.5) {
    const d = Math.abs(x - 50) / 50;
    const creux = Math.pow(1 - d, 1.6);
    const y = 32 + 52 * creux + vague(x) + cassure(x) + (rand() - 0.5) * 1.6;
    bord.push([x, y]);
    fibres.push([x, y - Math.max(2.5, 6 + epaisseur(x) + rand() * 2)]);
  }
  return { bord, fibres };
}

const pct = (n) => `${n.toFixed(2)}%`;

function formes(graine, cote) {
  const { bord, fibres } = genererBord(graine);
  const y = (v) => (cote === 'haut' ? v : 100 - v);

  const clip = cote === 'haut'
    ? `polygon(0% 0%, 100% 0%, ${bord.slice().reverse().map(([x, v]) => `${pct(x)} ${pct(y(v))}`).join(', ')})`
    : `polygon(${bord.map(([x, v]) => `${pct(x)} ${pct(y(v))}`).join(', ')}, 100% 100%, 0% 100%)`;

  const ligne = (pts) => pts.map(([x, v]) => `${(x * 10).toFixed(1)},${y(v).toFixed(2)}`);
  const rebord = `M${ligne(bord).join(' L')} L${ligne(fibres.slice().reverse()).join(' L')} Z`;

  return { clip, rebord };
}

const HAUT = formes(11, 'haut');
const BAS = formes(29, 'bas');

function Papier({ cote, forme, papierRef }) {
  return (
    <div className={`bp__papier bp__papier--${cote}`}>
      <div className="bp__feuille" ref={papierRef} style={{ clipPath: forme.clip }}>
        <svg className="bp__rebord" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <filter id={`fibres-${cote}`} x="-2%" y="-20%" width="104%" height="140%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.08 0.6" numOctaves="3" seed={cote === 'haut' ? 3 : 8} result="b" />
              <feDisplacementMap in="SourceGraphic" in2="b" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
          <path d={forme.rebord} fill="#fbfaf6" filter={`url(#fibres-${cote})`} />
        </svg>
      </div>
    </div>
  );
}

function BandePortrait({ segments, photo, alt, children }) {
  const hautRef = useRef(null);
  const basRef = useRef(null);

  // pour que les carreaux du papier tombent pile sur ceux de la page
  useLayoutEffect(() => {
    const aligner = () => {
      [hautRef.current, basRef.current].forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = r.left + window.scrollX;
        const y = r.top + window.scrollY;
        el.style.backgroundPosition = `${-x}px ${-y}px`;
      });
    };
    aligner();
    const ro = new ResizeObserver(aligner);
    ro.observe(document.body);
    window.addEventListener('resize', aligner);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', aligner);
    };
  }, []);

  return (
    <section className="bp" aria-label={alt}>
      <MarqueeCreuse className="display bp__texte" segments={segments} />

      <Papier cote="haut" forme={HAUT} papierRef={hautRef} />

      <div className="bp__portrait">
        {photo ? <img src={photo} alt={alt} /> : children}
      </div>

      <Papier cote="bas" forme={BAS} papierRef={basRef} />
    </section>
  );
}

export default BandePortrait;

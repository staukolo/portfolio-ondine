// texte géant qui défile et qui rétrécit au centre de l'écran
import { useEffect, useRef } from 'react';
import './MarqueeCreuse.css';

// taille des lettres au milieu (1 = taille normale)
const ECHELLE_CENTRE = 0.18;

function MarqueeCreuse({ segments, vitesse = 200, className = '' }) {
  const conteneurRef = useRef(null);
  const pisteRef = useRef(null);

  useEffect(() => {
    const conteneur = conteneurRef.current;
    const piste = pisteRef.current;
    const lettres = [...piste.querySelectorAll('.mc__lettre')];
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let centres = [];
    let demiPiste = 0;
    let largeur = 0;
    let decalage = 0;
    let visible = true;
    let raf = 0;
    let dernier = performance.now();

    const mesurer = () => {
      largeur = conteneur.clientWidth;
      demiPiste = piste.scrollWidth / 2;
      centres = lettres.map(l => l.offsetLeft + l.offsetWidth / 2);
    };

    const dessiner = () => {
      piste.style.transform = `translate3d(${decalage}px, 0, 0)`;
      const milieu = largeur / 2;
      for (let i = 0; i < lettres.length; i++) {
        const distance = Math.min(1, Math.abs(centres[i] + decalage - milieu) / milieu);
        const echelle = ECHELLE_CENTRE + (1 - ECHELLE_CENTRE) * Math.pow(distance, 0.85);
        lettres[i].style.transform = `scaleY(${echelle.toFixed(3)})`;
      }
    };

    const boucle = (maintenant) => {
      const dt = Math.min(0.05, (maintenant - dernier) / 1000);
      dernier = maintenant;
      if (visible) {
        decalage -= vitesse * dt;
        if (decalage <= -demiPiste) decalage += demiPiste;
        dessiner();
      }
      raf = requestAnimationFrame(boucle);
    };

    mesurer();
    dessiner();
    document.fonts?.ready.then(() => { mesurer(); dessiner(); });

    const ro = new ResizeObserver(() => { mesurer(); dessiner(); });
    ro.observe(conteneur);
    const io = new IntersectionObserver(([entree]) => { visible = entree.isIntersecting; });
    io.observe(conteneur);
    if (!reduit) raf = requestAnimationFrame(boucle);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [vitesse]);

  return (
    <div className={`mc ${className}`} ref={conteneurRef} aria-hidden="true">
      <div className="mc__piste" ref={pisteRef}>
        {[0, 1].map((copie) =>
          segments.map((segment, i) => (
            <span key={`${copie}-${i}`} className={`mc__mot ${segment.accent ? 'mc__mot--accent' : ''}`}>
              {[...segment.texte].map((c, j) => (
                <span key={j} className="mc__lettre">{c === ' ' ? ' ' : c}</span>
              ))}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export default MarqueeCreuse;

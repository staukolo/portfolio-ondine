// carrousel de quelques pages d'un document, on clique pour voir en grand
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import './Carrousel.css';

function Carrousel({ titre, images }) {
  const pisteRef = useRef(null);
  const [ouverte, setOuverte] = useState(null);

  const defiler = (sens) => {
    const piste = pisteRef.current;
    const carte = piste.querySelector('.carrousel__item');
    piste.scrollBy({ left: sens * (carte.offsetWidth + 16), behavior: 'smooth' });
  };

  // dans la vue en grand : flèches du clavier et Échap
  useEffect(() => {
    if (ouverte === null) return undefined;
    const clavier = (e) => {
      if (e.key === 'Escape') setOuverte(null);
      if (e.key === 'ArrowRight') setOuverte((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setOuverte((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', clavier);
    return () => window.removeEventListener('keydown', clavier);
  }, [ouverte, images.length]);

  return (
    <section className="carrousel">
      <div className="carrousel__entete">
        <h2 className="display carrousel__titre">{titre}</h2>
        <div className="carrousel__fleches">
          <button type="button" onClick={() => defiler(-1)} aria-label="Images précédentes"><ArrowLeft size={20} /></button>
          <button type="button" onClick={() => defiler(1)} aria-label="Images suivantes"><ArrowRight size={20} /></button>
        </div>
      </div>

      <ul className="carrousel__piste" ref={pisteRef}>
        {images.map((image, i) => (
          <li key={image.src} className="carrousel__item">
            <button type="button" onClick={() => setOuverte(i)} aria-label={`Voir en grand : ${image.legende}`}>
              <img src={image.src} alt={image.legende} loading="lazy" />
            </button>
            <span className="carrousel__legende">{image.legende}</span>
          </li>
        ))}
      </ul>

      {ouverte !== null && (
        <div className="visionneuse" role="dialog" aria-modal="true" aria-label={images[ouverte].legende} onClick={() => setOuverte(null)}>
          <img src={images[ouverte].src} alt={images[ouverte].legende} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="visionneuse__fermer" onClick={() => setOuverte(null)} aria-label="Fermer"><X size={22} /></button>
          <span className="visionneuse__compteur">{ouverte + 1} / {images.length} · {images[ouverte].legende}</span>
        </div>
      )}
    </section>
  );
}

export default Carrousel;

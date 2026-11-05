// images d'un projet en mode moodboard, sur un fond noir quadrillé
import './Moodboard.css';

function Moodboard({ titre, images }) {
  if (!images?.length) return null;

  return (
    <section className="moodboard">
      <h2 className="display moodboard__titre">{titre ?? <>Le <em>moodboard</em></>}</h2>
      <div className="moodboard__fond">
        {images.map((image) => (
          <figure key={image.src} className="moodboard__image">
            <img src={image.src} alt={image.legende} loading="lazy" />
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Moodboard;

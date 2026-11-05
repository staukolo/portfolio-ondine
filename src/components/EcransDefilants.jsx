// captures d'une application qui défilent en continu, pause au survol
import './EcransDefilants.css';

function EcransDefilants({ titre, images }) {
  if (!images?.length) return null;

  return (
    <section className="ecrans">
      <h2 className="display ecrans__titre">{titre}</h2>
      <div className="ecrans__bande">
        <div className="ecrans__piste">
          {[0, 1].map((copie) => (
            <ul key={copie} aria-hidden={copie === 1}>
              {images.map((image) => (
                <li key={image.src} className="ecrans__item">
                  <img src={image.src} alt={copie === 0 ? image.legende : ''} loading="lazy" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EcransDefilants;

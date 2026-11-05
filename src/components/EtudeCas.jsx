// étude de cas d'un projet : les coulisses étape par étape et ma part du travail
import './EtudeCas.css';

function EtudeCas({ etude, children }) {
  return (
    <div className="etude">
      <section className="etude__partie">
        <h2 className="display etude__titre">Les <em>coulisses</em></h2>
        <ol className="etude__etapes">
          {etude.demarche.map((etape, i) => (
            <li key={etape.titre} className="etude__etape">
              <span className="etude__numero display" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{etape.titre}</h3>
                <p>{etape.texte}</p>
                {etape.question && (
                  <div className="etude__question">
                    <strong>{etape.question}</strong>
                    <p>{etape.reponse}</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="etude__partie etude__apport">
        <h2 className="display etude__titre">Ma <em>part</em></h2>
        <div className="etude__groupes">
          {etude.apport.map((groupe) => (
            <div key={groupe.titre}>
              <h3>{groupe.titre}</h3>
              <ul>
                {groupe.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          ))}
        </div>
        {etude.note && <p className="etude__note">{etude.note}</p>}
      </section>

      {children}
    </div>
  );
}

export default EtudeCas;

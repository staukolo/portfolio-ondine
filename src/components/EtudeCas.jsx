// étude de cas d'un projet : les coulisses étape par étape et ma contribution
import './EtudeCas.css';

// bande de texte qui défile au-dessus et en dessous de Ma contribution
function Defile({ inverse }) {
  const texte = '✸✦✿      Ma contribution      '.repeat(15);
  return (
    <div className={`apport__defile ${inverse ? 'apport__defile--inverse' : ''}`} aria-hidden="true">
      <span>{texte}</span>
      <span>{texte}</span>
    </div>
  );
}

function EtudeCas({ etude, fond, children }) {
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

      <section className="etude__partie apport">
        <Defile />

        <div className="apport__scene" style={fond ? { '--fond': `url(${fond})` } : undefined}>
          <h2 className="display apport__titre">
            Ma{' '}
            <span className="cadre-selection apport__cadre">
              contribution
              {['hg', 'hd', 'bg', 'bd', 'h', 'b'].map((coin) => <span key={coin} className={`poignee poignee--${coin}`} />)}
            </span>
          </h2>

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
        </div>

        <Defile inverse />
      </section>

      {children}
    </div>
  );
}

export default EtudeCas;

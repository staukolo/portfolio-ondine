// gros titre en haut des pages (Projets, Parcours, Compétences)
import './PageHeader.css';

function PageHeader({ kicker, title, intro, aside }) {
  return (
    <header className="page-header">
      <div className="page-header__main">
        {kicker && <span className="kicker page-header__kicker">{kicker}</span>}
        <h1 className="page-header__title">{title}</h1>
        {intro && <p className="page-header__intro">{intro}</p>}
      </div>
      {aside && <div className="page-header__aside">{aside}</div>}
    </header>
  );
}

export default PageHeader;

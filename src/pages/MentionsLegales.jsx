// mentions légales et politique de confidentialité, sur la même page
import PageHeader from '../components/PageHeader';
import profil from '../data/profil.json';
import './MentionsLegales.css';

function MentionsLegales() {
  return (
    <div className="legal">
      <PageHeader
        kicker="Informations"
        title={<>Mentions <em>légales</em></>}
      />

      <section className="legal__section">
        <h2 className="display legal__titre">Éditrice du <em>site</em></h2>
        <p>
          Ce site est le portfolio d'{profil.nom} Taukolo, étudiante en BUT MMI à l'Université de la
          Nouvelle-Calédonie. Il est réalisé dans le cadre de ma formation, sans but commercial.
        </p>
        <p>
          Responsable de la publication : {profil.nom} Taukolo<br />
          Contact : <a href={`mailto:${profil.email}`}>{profil.email}</a>
        </p>
      </section>

      <section className="legal__section">
        <h2 className="display legal__titre"><em>Hébergement</em></h2>
        <p>
          Netlify, Inc.<br />
          512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis
        </p>
      </section>

      <section className="legal__section">
        <h2 className="display legal__titre">Propriété <em>intellectuelle</em></h2>
        <p>
          Les textes, le design et le code sont les miens, sauf mention contraire. Les projets en équipe
          citent les personnes qui y ont participé, et les logos des outils appartiennent à leurs
          propriétaires.
        </p>
      </section>

      <section className="legal__section" id="confidentialite">
        <h2 className="display legal__titre">Politique de <em>confidentialité</em></h2>
        <p>
          <strong>Ce site ne collecte aucune donnée personnelle</strong> : pas de formulaire, pas de
          cookies, pas de statistiques.
        </p>
        <p>
          Pour afficher le site, l'hébergeur (Netlify) et Google Fonts (qui fournit les polices)
          reçoivent votre adresse IP. Si vous m'écrivez, j'utilise votre email uniquement pour vous
          répondre.
        </p>
        <p>
          Vous pouvez me demander d'accéder à vos données ou de les supprimer en écrivant à{' '}
          <a href={`mailto:${profil.email}`}>{profil.email}</a>.
        </p>
      </section>
    </div>
  );
}

export default MentionsLegales;

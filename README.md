# Portfolio — Ondine Taukolo

Mon portfolio de BUT MMI (3e année, parcours développement web), fait avec **React**, **Vite**, **React Router** et **GSAP**, et mis en ligne sur **Netlify**.

Il a deux parties :
- **vitrine** : l'accueil, mes projets et mon parcours ;
- **compétences** : pour chaque AC de BUT 3, les projets qui le prouvent, avec une fiche par projet.

## Lancer le projet

```bash
npm install
npm run dev      # serveur de dev
npm run build    # build dans dist/
npm run preview  # voir le build
npm run lint     # vérifier le code
```

## Organisation

```
src/
  pages/        Accueil, Projets, ProjetDetail, Parcours, MentionsLegales, NotFound,
                EspaceEnseignants, FicheProjet
  components/   Navbar, Footer, PageHeader, FicheReflexive, BandePortrait...
  data/         tout le contenu du site en JSON
  utils/        fonctions pour relier les AC aux projets
public/
  images/       photos et captures des projets
  _redirects    pour que React Router marche sur Netlify
```

## Modifier le contenu

Tout est dans `src/data/`, pas besoin de toucher au code :

| Fichier             | Contenu                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `profil.json`       | mes contacts, ma photo, mon CV                                   |
| `projets.json`      | les projets (partie publique)                                    |
| `referentiel.json`  | les compétences et AC de BUT 3                                   |
| `competences.json`  | mes savoir-faire (Skills de l'accueil)                           |
| `outils.json`       | mes outils et logiciels (page d'accueil)                         |
| `experiences.json`  | mes stages et mon alternance                                     |
| `formations.json`   | mes formations                                                   |

Un champ vide (`""`) n'est pas affiché sur le site.

## Espace enseignants

Les compétences et les fiches sont sur `/espace-enseignants`, protégé par un identifiant et un mot de passe. Aucun lien du site n'y mène.

- Les fiches sont dans `public/espace-enseignants/fiches.json`.
- La protection est dans `netlify/edge-functions/protege-enseignants.js`.
- L'identifiant et le mot de passe se règlent dans Netlify, avec les variables `ENSEIGNANT_LOGIN` et `ENSEIGNANT_MDP`. Sans elles, l'espace reste fermé.

En local (`npm run dev`), il n'y a pas de mot de passe : la protection ne marche que sur Netlify.

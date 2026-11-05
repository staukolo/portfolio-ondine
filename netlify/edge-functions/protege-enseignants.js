// demande l'identifiant et le mot de passe avant d'ouvrir l'espace enseignants
// ils sont réglés dans Netlify, jamais écrits dans le code
/* global Netlify */

export default async (request, context) => {
  const login = Netlify.env.get('ENSEIGNANT_LOGIN');
  const mdp = Netlify.env.get('ENSEIGNANT_MDP');

  // si les réglages manquent, l'espace reste fermé
  if (!login || !mdp) {
    return new Response('Espace non configuré.', { status: 503 });
  }

  if (request.headers.get('authorization') !== `Basic ${btoa(`${login}:${mdp}`)}`) {
    return new Response('Identifiant ou mot de passe requis.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Espace enseignants", charset="UTF-8"' },
    });
  }

  const reponse = await context.next();
  const headers = new Headers(reponse.headers);
  headers.set('Cache-Control', 'private, no-store');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  return new Response(reponse.body, { status: reponse.status, headers });
};

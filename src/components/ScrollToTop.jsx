// remonte en haut quand on change de page (ou va à l'ancre s'il y en a une)
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const cible = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (cible) {
      cible.scrollIntoView({ block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;

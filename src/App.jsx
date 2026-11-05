// structure du site : menu, routes des pages et footer
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Accueil from './pages/Accueil';
import Projets from './pages/Projets';
import ProjetDetail from './pages/ProjetDetail';
import Parcours from './pages/Parcours';
import EspaceEnseignants from './pages/EspaceEnseignants';
import FicheProjet from './pages/FicheProjet';
import MentionsLegales from './pages/MentionsLegales';
import NotFound from './pages/NotFound';

function App() {
  const { pathname } = useLocation();
  // pas de menu ni de footer dans l'espace enseignants
  const espaceEnseignants = pathname.startsWith('/espace-enseignants');

  return (
    <>
      <ScrollToTop />
      {!espaceEnseignants && <Navbar />}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/projets/:slug" element={<ProjetDetail />} />
        <Route path="/espace-enseignants" element={<EspaceEnseignants />} />
        <Route path="/espace-enseignants/:slug" element={<FicheProjet />} />
        <Route path="/parcours" element={<Parcours />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!espaceEnseignants && <Footer colle={pathname === '/'} />}
    </>
  );
}

export default App;

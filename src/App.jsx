// structure du site : menu, routes des pages et footer
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Accueil from './pages/Accueil';
import Projets from './pages/Projets';
import ProjetDetail from './pages/ProjetDetail';
import Parcours from './pages/Parcours';
import Competences from './pages/Competences';
import MentionsLegales from './pages/MentionsLegales';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/projets/:slug" element={<ProjetDetail />} />
        <Route path="/competences" element={<Competences />} />
        <Route path="/parcours" element={<Parcours />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

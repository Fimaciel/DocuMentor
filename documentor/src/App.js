import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Navbar";
import Estudantes from "./pages/Estudantes";
import Estudante from "./pages/Estudante";
import Professores from "./pages/Professores";
import Professor from "./pages/Professor";
import Casas from "./pages/Casas";
import Casa from "./pages/Casa";
import Magias from "./pages/Magias";
import Magia from "./pages/Magia";
import Personagens from "./pages/Personagens";
import Personagem from "./pages/Pesonagem";

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
      <Route path="/personagens" element={<Personagens />} />
      <Route path="/personagem/:id" element={<Personagem />} />
        <Route path="/estudantes" element={<Estudantes />} />
        <Route path="/estudante/:id" element={<Estudante />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/professor/:id" element={<Professor />} />
        <Route path="/casas" element={<Casas />} />
        <Route path="/casas/:id" element={<Casa />} />
        <Route path="/magias" element={<Magias />} />
        <Route path="/magias/:id" element={<Magia />} />
      </Routes>
    </Router>
  );
};

export default App;

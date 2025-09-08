import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Messages from "./pages/Messages";
import Eleves from "./pages/Eleves";
import Enseignants from "./pages/Enseignants";
import Classes from "./pages/Classes";
import SousClasses from "./pages/SousClasses";
import Evaluations from "./pages/Evaluations";
import Matieres from "./pages/Matieres";
import MatiereClasse from "./pages/MatiereClasse";
import Notes from "./pages/Notes";
import Accueil from "./pages/Accueil";

export default function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('image/Ecole.jpg')" }}
    >
      <div className="flex bg-white/80 min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route path="/acceuil" element={<Accueil />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/eleves" element={<Eleves />} />
            <Route path="/enseignants" element={<Enseignants />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/sous-classes" element={<SousClasses />} />
            <Route path="/evaluations" element={<Evaluations />} />
            <Route path="/matieres" element={<Matieres />} />
            <Route path="/matiere-classe" element={<MatiereClasse />} />
            <Route path="/notes" element={<Notes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  FileText,
  Layers,
  Book,
  ClipboardList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    classes: false,
    matieres: false,
  });

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="h-screen w-64 bg-blue-900 text-white shadow-lg p-4">
      <h2 className="text-2xl font-bold mb-6">École Complexe Guilia</h2>
      <ul className="space-y-2">
        {/* Menu CLASSES avec sous-menu */}
        <li>
          <Link
            to="/acceuil"
            className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
          >
            <Users />
            <span>Accueil</span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => toggleMenu("classes")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-700 rounded"
          >
            <div className="flex items-center gap-2">
              <Layers />
              <span>Classes</span>
            </div>
            {openMenus.classes ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openMenus.classes && (
            <ul className="pl-8 mt-1 space-y-1">
              <li>
                <Link to="/classes" className="block hover:underline">
                  Toutes les classes
                </Link>
              </li>
              <li>
                <Link to="/sous-classes" className="block hover:underline">
                  Sous-classes
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Élèves */}
        <li>
          <Link
            to="/eleves"
            className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
          >
            <Users />
            <span>Élèves</span>
          </Link>
        </li>

        {/* Enseignants */}
        <li>
          <Link
            to="/enseignants"
            className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
          >
            <Users />
            <span>Enseignants</span>
          </Link>
        </li>

        {/* Évaluations */}
        <li>
          <Link
            to="/evaluations"
            className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
          >
            <ClipboardList />
            <span>Évaluations</span>
          </Link>
        </li>

        {/* Menu MATIÈRES avec sous-menu */}
        <li>
          <button
            onClick={() => toggleMenu("matieres")}
            className="w-full flex justify-between items-center p-2 hover:bg-blue-700 rounded"
          >
            <div className="flex items-center gap-2">
              <Book />
              <span>Matières</span>
            </div>
            {openMenus.matieres ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openMenus.matieres && (
            <ul className="pl-8 mt-1 space-y-1">
              <li>
                <Link to="/matieres" className="block hover:underline">
                  Toutes les matières
                </Link>
              </li>
              <li>
                <Link to="/matiere-classe" className="block hover:underline">
                  Matière-Classe
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Notes */}
        <li>
          <Link
            to="/notes"
            className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded"
          >
            <FileText />
            <span>Notes</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

//import { useRoutes } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Accueil() {
  return (
    <div className="min-h-screen p-8 text-gray-800 bg-white">
      <h1 className="text-3xl font-bold mb-4">
        Bienvenue sur le Complexe Scolaire Guilia
      </h1>

      <blockquote className="italic text-lg text-gray-600 mb-6 border-l-4 pl-4 border-blue-400">
        "L'éducation est l'arme la plus puissante qu’on puisse utiliser pour
        changer le monde." — Nelson Mandela
      </blockquote>

      <p className="mb-4 text-lg">
        Cette plateforme vous permet de gérer efficacement les différentes
        entités de votre établissement scolaire :
      </p>

      <ul className="list-disc ml-6 text-base mb-6">
        <li>✅ Gestion des élèves et des enseignants</li>
        <li>✅ Organisation des classes et sous-classes</li>
        <li>✅ Création des matières et des évaluations</li>
        <li>✅ Attribution des notes par matière et évaluation</li>
        <li>✅ Suivi global via le tableau de bord</li>
      </ul>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white rounded p-4 text-center shadow hover:bg-blue-600"
        >
          📊 Tableau de Bord
        </Link>
        <Link
          to="/eleves"
          className="bg-green-500 text-white rounded p-4 text-center shadow hover:bg-green-600"
        >
          👨‍🎓 Élèves
        </Link>
        <Link
          to="/enseignants"
          className="bg-purple-500 text-white rounded p-4 text-center shadow hover:bg-purple-600"
        >
          👩‍🏫 Enseignants
        </Link>
        <Link
          to="/classes"
          className="bg-yellow-500 text-white rounded p-4 text-center shadow hover:bg-yellow-600"
        >
          🏫 Classes
        </Link>
        <Link
          to="/sous-classes"
          className="bg-pink-500 text-white rounded p-4 text-center shadow hover:bg-pink-600"
        >
          🧩 Sous-Classes
        </Link>
        <Link
          to="/matieres"
          className="bg-indigo-500 text-white rounded p-4 text-center shadow hover:bg-indigo-600"
        >
          📚 Matières
        </Link>
        <Link
          to="/evaluations"
          className="bg-orange-500 text-white rounded p-4 text-center shadow hover:bg-orange-600"
        >
          📝 Évaluations
        </Link>
        <Link
          to="/notes"
          className="bg-red-500 text-white rounded p-4 text-center shadow hover:bg-red-600"
        >
          📈 Notes
        </Link>
      </div>
    </div>
  );
}

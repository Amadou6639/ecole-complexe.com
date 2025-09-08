import { useEffect, useState } from "react";
import {
  getEvaluations,
  postEvaluation,
  deleteEvaluation,
} from "../Services/EvaluationsService";
import { getMatieres } from "../Services/matieresService";

export default function Evaluations() {
  const [evaluations, setEvaluations] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    matiere_id: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [resEval, resMatieres] = await Promise.all([
        getEvaluations(),
        getMatieres(),
      ]);
      setEvaluations(resEval.data?.data || []);
      setMatieres(resMatieres.data?.data || []);
    } catch (error) {
      setError("Erreur lors du chargement des données");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdd = async () => {
    if (!form.nom.trim() || !form.matiere_id) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const data = {
        ...form,
        matiere_id: parseInt(form.matiere_id, 10),
      };
      console.log("Données envoyées à l'API :", data);
      await postEvaluation(data);
      setForm({ nom: "", matiere_id: "" });
      await loadData();
      alert("Évaluation ajoutée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert(`Erreur lors de l'ajout : ${error.message || "Erreur inconnue"}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression de cette évaluation ?"))
      return;

    try {
      await deleteEvaluation(id);
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert(
        `Erreur lors de la suppression : ${error.message || "Erreur inconnue"}`
      );
    }
  };

  if (loading) return <div className="p-4">Chargement en cours...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des Évaluations</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Titre de l'évaluation"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <select
          value={form.matiere_id}
          onChange={(e) => setForm({ ...form, matiere_id: e.target.value })}
          className="border p-2 w-full rounded"
        >
          <option value="">Choisir une matière</option>
          {matieres.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nom}
            </option>
          ))}
        </select>

        <button
          onClick={handleAdd}
          disabled={!form.nom.trim() || !form.matiere_id}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300 transition-colors"
        >
          Ajouter Évaluation
        </button>
      </div>

      {evaluations.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          Aucune évaluation trouvée
        </div>
      ) : (
        <table className="w-full border rounded overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Titre</th>
              <th className="border p-2 text-left">Matière</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="border p-2">{e.nom}</td>
                <td className="border p-2">{e.matiere?.nom || "Inconnue"}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

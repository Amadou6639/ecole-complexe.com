import { useEffect, useState } from "react";
import { getClasses } from "../Services/ClassesService";
import {
  getMatieres,
  createMatiere,
  deleteMatiere,
  assignMatiereToClasse,
  deleteMatiereClasseLink,
  getMatieresClasses,
} from "../Services/matieresService";

export default function MatiereClasse() {
  const [matieres, setMatieres] = useState([]);
  const [classes, setClasses] = useState([]);
  const [liens, setLiens] = useState([]);
  const [form, setForm] = useState({ matiere_id: "", classe_id: "" });
  const [newMatiere, setNewMatiere] = useState({ nom: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddMatiere, setShowAddMatiere] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [resM, resC, resL] = await Promise.all([
        getMatieres(),
        getClasses(),
        getMatieresClasses(),
      ]);
      setMatieres(resM.data?.data || []);
      setClasses(resC.data?.data || []);
      setLiens(resL.data?.data || []);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddMatiereToClasse = async () => {
    if (!form.matiere_id || !form.classe_id) {
      alert("Veuillez sélectionner une matière et une classe");
      return;
    }
    try {
      await assignMatiereToClasse(
        parseInt(form.matiere_id, 10),
        parseInt(form.classe_id, 10)
      );
      setForm({ matiere_id: "", classe_id: "" });
      await loadData();
      alert("Liaison créée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert(
        "Erreur lors de l'ajout : " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleDeleteLink = async (matiereId, classeId) => {
    if (!window.confirm("Supprimer cette liaison ?")) return;
    try {
      await deleteMatiereClasseLink(matiereId, classeId);
      await loadData();
      alert("Liaison supprimée avec succès");
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert(
        "Erreur de suppression : " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleAddNewMatiere = async () => {
    if (!newMatiere.nom) {
      alert("Le nom de la matière est obligatoire");
      return;
    }
    try {
      await createMatiere({ nom: newMatiere.nom });
      setNewMatiere({ nom: "" });
      setShowAddMatiere(false);
      await loadData();
      alert("Matière ajoutée avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la matière :", error);
      alert(
        "Erreur lors de l'ajout : " +
          (error.response?.data?.errors?.nom || error.message)
      );
    }
  };

  const handleDeleteMatiere = async (id) => {
    if (!window.confirm("Supprimer cette matière et toutes ses liaisons ?"))
      return;
    try {
      await deleteMatiere(id);
      await loadData();
      alert("Matière supprimée avec succès");
    } catch (error) {
      console.error("Erreur de suppression :", error);
      alert(
        "Erreur de suppression : " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Gestion des Matières et Classes
      </h1>

      {/* Section Ajout de matière */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddMatiere(!showAddMatiere)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          {showAddMatiere ? "Annuler" : "Ajouter une nouvelle matière"}
        </button>

        {showAddMatiere && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <h2 className="font-bold mb-2">Nouvelle Matière</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nom de la matière*"
                value={newMatiere.nom}
                onChange={(e) =>
                  setNewMatiere({ ...newMatiere, nom: e.target.value })
                }
                className="border p-2 flex-1"
                required
              />
              <button
                onClick={handleAddNewMatiere}
                className="bg-green-600 text-white px-4 rounded"
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Section Liaison matière-classe */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">
          Lier une matière à une classe
        </h2>
        <div className="flex gap-2 mb-4">
          <select
            value={form.matiere_id}
            onChange={(e) => setForm({ ...form, matiere_id: e.target.value })}
            className="border p-2 flex-1"
          >
            <option value="">Choisir une matière</option>
            {matieres.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nom}
              </option>
            ))}
          </select>

          <select
            value={form.classe_id}
            onChange={(e) => setForm({ ...form, classe_id: e.target.value })}
            className="border p-2 flex-1"
          >
            <option value="">Choisir une classe</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nom}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddMatiereToClasse}
            disabled={!form.matiere_id || !form.classe_id}
            className="bg-green-600 text-white px-4 rounded disabled:bg-green-300"
          >
            Lier
          </button>
        </div>
      </div>

      {/* Liste des matières */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Liste des Matières</h2>
        <div className="overflow-x-auto">
          <table className="w-full border mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Nom</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {matieres.length === 0 ? (
                <tr>
                  <td colSpan="2" className="border p-2 text-center">
                    Aucune matière trouvée
                  </td>
                </tr>
              ) : (
                matieres.map((m) => (
                  <tr key={m.id}>
                    <td className="border p-2">{m.nom}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleDeleteMatiere(m.id)}
                        className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Liste des liaisons */}
      <div>
        <h2 className="text-lg font-bold mb-2">Liaisons Matières-Classes</h2>
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Matière</th>
                <th className="border p-2">Classe</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {liens.length === 0 ? (
                <tr>
                  <td colSpan="3" className="border p-2 text-center">
                    Aucune liaison trouvée
                  </td>
                </tr>
              ) : (
                liens.map((l) => (
                  <tr key={`${l.matiere_id}-${l.classe_id}`}>
                    <td className="border p-2">
                      {matieres.find((m) => m.id === l.matiere_id)?.nom ||
                        `Matière #${l.matiere_id}`}
                    </td>
                    <td className="border p-2">
                      {classes.find((c) => c.id === l.classe_id)?.nom ||
                        `Classe #${l.classe_id}`}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() =>
                          handleDeleteLink(l.matiere_id, l.classe_id)
                        }
                        className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

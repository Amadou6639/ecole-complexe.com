//    updateMatiereClasse,
//    deleteMatiereClasse,
//  } from "../services/matiereClassesService";
import { useEffect, useState } from "react";
import {
  getMatieres,
  postMatiere,
  updateMatiere,
  deleteMatiere,
} from "../Services/matieresService";

export default function Matieres() {
  const [matieres, setMatieres] = useState([]);
  const [nom, setNom] = useState("");
  const [editId, setEditId] = useState(null);

  const loadMatieres = async () => {
    const res = await getMatieres();
    console.log("Réponse getMatieres:", res);
    setMatieres(res.data?.data || []);
  };

  useEffect(() => {
    loadMatieres();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      if (editId) {
        await updateMatiere({ id: editId, nom });
      } else {
        await postMatiere({ nom });
      }
      setNom("");
      setEditId(null);
      loadMatieres();
    } catch (error) {
      // Affiche le message d’erreur retourné par l’API
      const msg =
        error.response?.data?.errors?.nom || "Erreur lors de l'enregistrement";
      alert(msg);
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Confirmer la suppression ?")) return;
    try {
      await deleteMatiere(id);
      loadMatieres();
    } catch (e) {
      console.error("Erreur lors de la suppression :", e);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Toutes les Matières</h1>

      <div className="mb-4 flex gap-2">
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom de la matière"
          className="border p-2 flex-1"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map((m) => (
            <tr key={m.id}>
              <td className="border p-2">{m.nom}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => {
                    setNom(m.nom);
                    setEditId(m.id);
                  }}
                  className="bg-yellow-500 text-white px-2 rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useState, useEffect } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../Services/notesService";
import { getEvaluations } from "../Services/EvaluationsService";
import { getEleves } from "../Services/ElevesService";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  const [eleves, setEleves] = useState([]);
  const [form, setForm] = useState({
    valeur: "",
    evaluation_id: "",
    eleve_id: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
  });

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [notesRes, evaluationsRes, elevesRes] = await Promise.all([
        getNotes(pagination.page, pagination.perPage),
        getEvaluations(),
        getEleves(),
      ]);

      setNotes(notesRes.data.data);
      setEvaluations(evaluationsRes.data.data);
      setEleves(elevesRes.data);
      setPagination((prev) => ({
        ...prev,
        total: notesRes.data.total,
      }));
    } catch (err) {
      setError(err.message);
      console.error("Erreur de chargement:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.perPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.valeur || !form.evaluation_id || !form.eleve_id) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    // Conversion des valeurs en nombre
    const payload = {
      ...form,
      valeur: parseFloat(form.valeur),
      evaluation_id: parseInt(form.evaluation_id, 10),
      eleve_id: parseInt(form.eleve_id, 10),
    };

    setLoading(true);
    try {
      if (editingId) {
        await updateNote({ ...payload, id: editingId });
        alert("Note mise à jour avec succès");
      } else {
        await createNote(payload);
        alert("Note ajoutée avec succès");
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error("Erreur:", error.response?.data?.errors || error.message);
      alert(
        "Erreur: " +
          (error.response?.data?.errors
            ? Object.values(error.response.data.errors).join(", ")
            : error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette note ?")) return;

    setLoading(true);
    try {
      await deleteNote(id);
      alert("Note supprimée avec succès");
      loadData();
    } catch (error) {
      alert("Erreur: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (note) => {
    setForm({
      valeur: note.valeur,
      evaluation_id: note.evaluation.id,
      eleve_id: note.eleve.id,
    });
    setEditingId(note.id);
  };

  const resetForm = () => {
    setForm({
      valeur: "",
      evaluation_id: "",
      eleve_id: "",
    });
    setEditingId(null);
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestion des Notes</h1>

      {/* Formulaire d'ajout/modification */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editingId ? "Modifier une note" : "Ajouter une nouvelle note"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Élève</label>
              <select
                value={form.eleve_id}
                onChange={(e) => setForm({ ...form, eleve_id: e.target.value })}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Sélectionner un élève</option>
                {Array.isArray(eleves) &&
                  eleves.map((eleve) => (
                    <option key={eleve.id} value={eleve.id}>
                      {eleve.prenom} {eleve.nom}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Évaluation
              </label>
              <select
                value={form.evaluation_id}
                onChange={(e) =>
                  setForm({ ...form, evaluation_id: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Sélectionner une évaluation</option>
                {evaluations.map((evaluation) => (
                  <option key={evaluation.id} value={evaluation.id}>
                    {evaluation.nom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Note</label>
              <input
                type="number"
                min="0"
                max="20"
                step="0.25"
                value={form.valeur}
                onChange={(e) => setForm({ ...form, valeur: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                Annuler
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {editingId ? "Mettre à jour" : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>

      {/* Liste des notes */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Liste des Notes</h2>
          <div className="flex items-center space-x-2">
            <span>Éléments par page:</span>
            <select
              value={pagination.perPage}
              onChange={(e) =>
                setPagination({
                  ...pagination,
                  perPage: Number(e.target.value),
                  page: 1,
                })
              }
              className="p-1 border rounded"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Élève</th>
                <th className="p-2 border">Évaluation</th>
                <th className="p-2 border">Note</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-2 border text-center">
                    Aucune note trouvée
                  </td>
                </tr>
              ) : (
                notes.map((note, index) => (
                  <tr key={index}>
                    <td className="p-2 border">
                      {note.eleve.prenom} {note.eleve.nom}
                    </td>
                    <td className="p-2 border">{note.evaluation.nom}</td>
                    <td className="p-2 border text-center">{note.valeur}/20</td>
                    <td className="p-2 border">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(note)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                          disabled={loading}
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          disabled={loading}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.total > pagination.perPage && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() =>
                setPagination({
                  ...pagination,
                  page: Math.max(1, pagination.page - 1),
                })
              }
              disabled={pagination.page === 1 || loading}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <span>
              Page {pagination.page} sur{" "}
              {Math.ceil(pagination.total / pagination.perPage)}
            </span>
            <button
              onClick={() =>
                setPagination({ ...pagination, page: pagination.page + 1 })
              }
              disabled={
                pagination.page >=
                  Math.ceil(pagination.total / pagination.perPage) || loading
              }
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

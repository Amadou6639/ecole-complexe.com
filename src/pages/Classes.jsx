import React, { useEffect, useState } from "react";
import {
  getClasses,
  createClasse,
  deleteClasse,
} from "../Services/ClassesService";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [newClasse, setNewClasse] = useState({ nom: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await getClasses();
      setClasses(res.data); // important : c’est `res.data` selon ton index.php
    } catch (error) {
      console.error("Erreur lors du chargement des classes :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewClasse({ ...newClasse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newClasse.nom.trim()) return;

    try {
      await createClasse(newClasse);
      setNewClasse({ nom: "" });
      fetchClasses();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette classe ?")) return;

    try {
      await deleteClasse(id);
      fetchClasses();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des classes</h1>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          name="nom"
          placeholder="Nom de la classe (ex: CP1)"
          value={newClasse.nom}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </form>

      {/* Liste des classes */}
      {loading ? (
        <p>Chargement...</p>
      ) : classes.length === 0 ? (
        <p>Aucune classe enregistrée.</p>
      ) : (
        <ul className="space-y-2">
          {classes.map((classe) => (
            <li
              key={classe.id}
              className="flex items-center justify-between bg-white rounded shadow p-3 border"
            >
              <span>{classe.nom}</span>
              <button
                onClick={() => handleDelete(classe.id)}
                className="text-red-600 hover:underline"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Classes;

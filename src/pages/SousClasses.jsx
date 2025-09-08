import React, { useEffect, useState } from "react";
import {
  getSousClasses,
  createSousClasse,
  deleteSousClasse,
} from "../Services/sousClassesService";
import { getClasses } from "../Services/ClassesService";

const SousClasses = () => {
  const [sousClasses, setSousClasses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [newSousClasse, setNewSousClasse] = useState({
    nom: "",
    classe_id: "",
  });

  useEffect(() => {
    fetchSousClasses();
    fetchClasses();
  }, []);

  const fetchSousClasses = async () => {
    const data = await getSousClasses();
    setSousClasses(data.data);
  };

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data.data);
  };

  const handleChange = (e) => {
    setNewSousClasse({ ...newSousClasse, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSousClasse(newSousClasse);
    setNewSousClasse({ nom: "", classe_id: "" });
    fetchSousClasses();
  };

  const handleGenerate = async () => {
    const noms = ["CP1A", "CP2A", "CE1A", "CE2A", "CM1A", "CM2A"];
    for (const nom of noms) {
      const classe = classes.find((c) => nom.startsWith(c.nom)); // associer selon le nom
      if (classe) {
        await createSousClasse({ nom, classe_id: classe.id });
      }
    }
    fetchSousClasses();
  };

  const handleDelete = async (id) => {
    await deleteSousClasse(id);
    fetchSousClasses();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestion des sous-classes</h2>

      <form onSubmit={handleSubmit} className="space-y-2 mb-4">
        <input
          type="text"
          name="nom"
          placeholder="Nom (ex: CP1A)"
          value={newSousClasse.nom}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <select
          name="classe_id"
          value={newSousClasse.classe_id}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Choisir une classe</option>
          {classes.map((classe) => (
            <option key={classe.id} value={classe.id}>
              {classe.nom}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Ajouter
        </button>
      </form>

      <button
        onClick={handleGenerate}
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Générer CP1A à CM2A
      </button>

      <ul className="space-y-2">
        {sousClasses.map((sc) => (
          <li
            key={sc.id}
            className="bg-white p-3 border rounded shadow flex justify-between items-center"
          >
            <span>{sc.nom}</span>
            <button
              onClick={() => handleDelete(sc.id)}
              className="text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SousClasses;

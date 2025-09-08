import React, { useEffect, useState } from "react";
import { getEleves, createEleve, deleteEleve } from "../Services/ElevesService";
import { getSousClasses } from "../Services/sousClassesService";

const Eleves = () => {
  const [eleves, setEleves] = useState([]);
  const [sousClasses, setSousClasses] = useState([]);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    sous_classe_id: "",
  });
  const [errors, setErrors] = useState({});

  // Récupérer les élèves
  const loadEleves = async () => {
    const data = await getEleves();
    setEleves(data.data);
  };
  // Récupérer les sous-classes
  const loadSousClasses = async () => {
    const data = await getSousClasses();
    setSousClasses(data.data);
  };

  useEffect(() => {
    loadEleves();
    loadSousClasses();
  }, []);

  // Gestion du changement de champ
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEleve(formData);
      setFormData({
        nom: "",
        prenom: "",
        date_naissance: "",
        sous_classe_id: "",
      });
      setErrors({});
      loadEleves();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  // Supprimer un élève
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous supprimer cet élève ?")) {
      await deleteEleve(id);
      loadEleves();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des élèves</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        <div>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="border p-2 w-full"
          />
          {errors.nom && <p className="text-red-500 text-sm">{errors.nom}</p>}
        </div>

        <div>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="border p-2 w-full"
          />
          {errors.prenom && (
            <p className="text-red-500 text-sm">{errors.prenom}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="date_naissance"
            value={formData.date_naissance}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <select
            name="sous_classe_id"
            value={formData.sous_classe_id}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="">Sélectionner une sous-classe</option>
            {sousClasses.map((sc) => (
              <option key={sc.id} value={sc.id}>
                {sc.nom}
              </option>
            ))}
          </select>
          {errors.sous_classe_id && (
            <p className="text-red-500 text-sm">{errors.sous_classe_id}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Ajouter l'élève
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-2">Élèves enregistrés</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Prénom</th>
            <th className="border px-2 py-1">Naissance</th>
            <th className="border px-2 py-1">Sous-classe</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {eleves.map((eleve) => (
            <tr key={eleve.id}>
              <td className="border px-2 py-1">{eleve.nom}</td>
              <td className="border px-2 py-1">{eleve.prenom}</td>
              <td className="border px-2 py-1">{eleve.date_naissance}</td>
              <td className="border px-2 py-1">
                {eleve.sous_classe?.nom || "—"}
              </td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => handleDelete(eleve.id)}
                  className="text-red-500 hover:underline"
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
};

export default Eleves;

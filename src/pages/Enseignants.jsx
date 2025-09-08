import { useEffect, useState } from "react";
import {
  getEnseignants,
  postEnseignant,
  deleteEnseignant,
} from "../Services/EnseignantsService";
import { getSousClasses } from "../Services/sousClassesService";
import { getMatieres } from "../Services/matieresService";

export default function Enseignants() {
  const [enseignants, setEnseignants] = useState([]);
  const [sousClasses, setSousClasses] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    enseignements: [],
  });

  const [newEnseignement, setNewEnseignement] = useState({
    classe: "",
    matiere: "",
  });

  const loadData = async () => {
    try {
      const [resEnseignants, resSousClasses, resMatieres] = await Promise.all([
        getEnseignants(),
        getSousClasses(),
        getMatieres(),
      ]);
      setEnseignants(resEnseignants.data?.data || []);
      setSousClasses(resSousClasses.data?.data || []);
      setMatieres(resMatieres.data?.data || []);
    } catch (error) {
      alert("Erreur lors du chargement des données");
      console.error("Erreur loadData :", error, error?.response);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Ajoute un enseignement à la liste
  const addEnseignement = () => {
    if (
      newEnseignement.classe &&
      newEnseignement.matiere &&
      !isNaN(newEnseignement.classe) &&
      !isNaN(newEnseignement.matiere)
    ) {
      setForm((prev) => ({
        ...prev,
        enseignements: [
          ...prev.enseignements,
          {
            classe_id: newEnseignement.classe,
            matiere_id: newEnseignement.matiere,
          },
        ],
      }));
      setNewEnseignement({ classe: "", matiere: "" });
    }
  };

  // Ajoute un enseignant
  const handleAdd = async () => {
    try {
      const data = {
        ...form,
        enseignements: form.enseignements.map((e) => ({
          classe_id: e.classe_id,
          matiere_id: e.matiere_id,
        })),
      };
      await postEnseignant(data);
      setForm({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        enseignements: [],
      });
      setNewEnseignement({ classe: "", matiere: "" });
      await loadData();
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Erreur lors de l'ajout de l'enseignant");
    }
  };

  // Supprime un enseignant
  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await deleteEnseignant(id);
      await loadData();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression de l'enseignant");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des Enseignants</h1>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Prénom"
          value={form.prenom}
          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={form.telephone}
          onChange={(e) => setForm({ ...form, telephone: e.target.value })}
          className="border p-2 w-full"
        />

        <div className="flex gap-2">
          <select
            value={newEnseignement.classe}
            onChange={(e) =>
              setNewEnseignement({
                ...newEnseignement,
                classe: e.target.value ? parseInt(e.target.value) : "",
              })
            }
            className="border p-2 flex-1"
          >
            <option value="">Choisir sous-classe</option>
            {Array.isArray(sousClasses) &&
              sousClasses.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nom}
                </option>
              ))}
          </select>
          <select
            value={newEnseignement.matiere}
            onChange={(e) =>
              setNewEnseignement({
                ...newEnseignement,
                matiere: e.target.value ? parseInt(e.target.value) : "",
              })
            }
            className="border p-2 flex-1"
          >
            <option value="">Choisir matière</option>
            {Array.isArray(matieres) &&
              matieres.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nom}
                </option>
              ))}
          </select>
          <button
            onClick={addEnseignement}
            className="bg-blue-500 text-white px-4 rounded"
          >
            +
          </button>
        </div>

        <div>
          <strong>Enseignements :</strong>
          <ul className="list-disc pl-5">
            {form.enseignements.map((ens, index) => {
              const classeNom =
                sousClasses.find((s) => s.id === ens.classe_id)?.nom ||
                ens.classe_id;
              const matiereNom =
                matieres.find((m) => m.id === ens.matiere_id)?.nom ||
                ens.matiere_id;
              return (
                <li key={index}>
                  {classeNom} - {matiereNom}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Ajouter Enseignant
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Téléphone</th>
            <th className="border p-2">Enseignements</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(enseignants) &&
            enseignants.map((e) => (
              <tr key={e.id}>
                <td className="border p-2">{e.nom}</td>
                <td className="border p-2">{e.prenom}</td>
                <td className="border p-2">{e.email}</td>
                <td className="border p-2">{e.telephone}</td>
                <td className="border p-2">
                  <ul>
                    {(e.enseignements || []).map((ens, idx) => (
                      <li key={idx}>
                        {ens.sous_classe?.nom} - {ens.matiere?.nom}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(e.id)}
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

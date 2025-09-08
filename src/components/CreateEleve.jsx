import React, { useState } from "react";
import { createEleve, getEleves } from "../services/elevesService";

const CreateEleve = ({ onElevesUpdated }) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEleve({ nom, prenom });
      const updated = await getEleves();
      onElevesUpdated(updated);
      setNom("");
      setPrenom("");
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        placeholder="Prénom"
        className="border p-2 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Ajouter
      </button>
    </form>
  );
};

export default CreateEleve;

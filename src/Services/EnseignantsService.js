import api from "./api"; // Assure-toi que api.js est déjà configuré avec axios

// Récupérer tous les enseignants
export const getEnseignants = () => {
  return api.get("/enseignants/index.php");
};

// Ajouter un enseignant
export const postEnseignant = (data) => {
  return api.post("/enseignants/post.php", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Supprimer un enseignant
export const deleteEnseignant = (id) => {
  return api.post(`/enseignants/delete.php?id=${id}`);
};

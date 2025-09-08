import api from "./api";

// Récupérer toutes les matières
export const getMatieres = () => {
  return api.get("matieres/index.php");
};

// Ajouter une nouvelle matière
export const createMatiere = async (matiere) => {
  const formData = new FormData();
  for (let key in matiere) {
    formData.append(key, matiere[key]);
  }
  const response = await api.post("matieres/post.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer une matière
export const deleteMatiere = (id) => {
  return api.post("matieres/delete.php", { id });
};

// Mettre à jour une matière
export const updateMatiere = (matiere) => {
  return api.post("matieres/update.php", matiere);
};

// postMatiere (optionnel, à adapter selon ton usage)
export const postMatiere = (matiere) => {
  const formData = new FormData();
  for (let key in matiere) {
    formData.append(key, matiere[key]);
  }
  return api.post("matieres/post.php", formData);
};

// Lier une matière à une classe
export const assignMatiereToClasse = (matiere_id, classe_id) => {
  return api.post("matieres_classes/post.php", { matiere_id, classe_id });
};

// Supprimer le lien matière-classe
export const deleteMatiereClasseLink = (matiere_id, classe_id) => {
  return api.post("matieres_classes/delete.php", { matiere_id, classe_id });
};

// Récupérer toutes les liaisons matière-classe
export const getMatieresClasses = () => {
  return api.get("matieres_classes/index.php");
};

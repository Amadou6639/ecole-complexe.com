import api from "./api";

// Récupérer toutes les classes
export const getClasses = async () => {
  const response = await api.get("classes/index.php");
  return response.data;
};

// Ajouter une classe
export const createClasse = async (classe) => {
  const formData = new FormData();
  for (let key in classe) {
    formData.append(key, classe[key]);
  }
  const response = await api.post("classes/post.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Supprimer une classe
export const deleteClasse = async (id) => {
  const response = await api.post(
    "classes/delete.php",
    { id: id },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

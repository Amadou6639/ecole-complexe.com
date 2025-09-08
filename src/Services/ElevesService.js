import api from "./api";

// ✅ Récupérer tous les élèves
export const getEleves = async () => {
  const response = await api.get("/eleves/index.php");
  return response.data;
};

// ✅ Ajouter un élève
export const createEleve = async (eleve) => {
  const formData = new FormData();
  for (let key in eleve) {
    formData.append(key, eleve[key]);
  }

  const response = await api.post("/eleves/post.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✅ Supprimer un élève
export const deleteEleve = async (id) => {
  const response = await api.post(
    `/eleves/delete.php`,
    { id: id },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

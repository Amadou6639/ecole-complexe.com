import api from "./api";

export const getSousClasses = async () => {
  const response = await api.get("sous_classes/index.php");
  return response.data;
};

export const createSousClasse = async (sousClasse) => {
  const formData = new FormData();
  for (let key in sousClasse) {
    formData.append(key, sousClasse[key]);
  }
  const response = await api.post("sous_classes/post.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteSousClasse = async (id) => {
  const response = await api.post("sous_classes/delete.php", { id });
  return response.data;
};

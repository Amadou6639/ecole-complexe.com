// src/Services/evaluationsService.js
import api from "./api";

export const getEvaluations = () => {
  return api.get("evaluations/index.php");
};

// Ajoutez d'autres fonctions si nécessaire
export const createEvaluation = (data) => {
  return api.post("evaluations/post.php", data);
};
export const postEvaluation = (data) => {
  return api.post("evaluations/post.php", data);
};

export const updateEvaluation = (data) => {
  return api.post("evaluations/update.php", data);
};

export const deleteEvaluation = (id) => {
  return api.post("evaluations/delete.php", { id });
};

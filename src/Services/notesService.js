import api from "./api";

export const getNotes = (page = 1, perPage = 100) => {
  return api.get(`notes/index.php?page=${page}&per_page=${perPage}`);
};

export const createNote = (noteData) => {
  return api.post("notes/post.php", noteData);
};

export const updateNote = (noteData) => {
  return api.post("notes/update.php", noteData);
};

export const deleteNote = (id) => {
  return api.post("notes/delete.php", { id });
};

// Fonction pour vérifier si une note existe déjà
export const checkNoteExists = (evaluation_id, eleve_id) => {
  return api.get(
    `notes/index.php?evaluation_id=${evaluation_id}&eleve_id=${eleve_id}`
  );
};

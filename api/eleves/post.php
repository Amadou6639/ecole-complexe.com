<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "eleves";
$lsColumns = [
    "nom",
    "prenom",
    "date_naissance",
    "sous_classe_id",
];

$data = validate($lsColumns);
$classe = find("sous_classes", $data["sous_classe_id"]);
$nbrEleve = recordCount($table, ["nom" => $data["nom"], "prenom" => $data["prenom"], "date_naissance" => $data["date_naissance"]]);
$errors = [];

$nbrEleve > 0 && $errors["nom"] = "Ce nom existe déjà";
$nbrEleve > 0 && $errors["prenom"] = "Ce nom existe déjà";
!$classe && $errors["sous_classe_id"] = "Cette classe n'existe pas";

// Error 443
if (count($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit(0);
}

$obj = insert($table, $data);

echo json_encode($obj);

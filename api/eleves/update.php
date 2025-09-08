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
$classe = find("sous_classes", $data["id"]);
$eleve = findOrFail($table, $data["id"]);
$errors = [];

!$classe && $errors["sous_classe_id"] = "Cette classe n'existe pas";


// Error 443
if (count($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit(0);
}

$obj = update($table, $data, $data["id"]);

echo json_encode($obj);

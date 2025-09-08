<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "evaluations";
$lsColumns = [
    "id",
    "nom",
    "matiere_id",
];


$data = validate($lsColumns);
$evaluation = findOrFail($table, $data["id"]);
$matiere = find("matieres", $data["id"]);
$errors = [];

!$matiere && $errors["matiere_id"] = "Cette matiere n'existe pas";

// Error 443
if (count($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit(0);
}

$obj = update($table, $data, $data["id"]);
echo json_encode($obj);

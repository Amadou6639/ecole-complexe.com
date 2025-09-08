<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "sous_classes";
$lsColumns = [
    "id",
    "nom",
    "classe_id"
];


$data = validate($lsColumns);
$obj = findOrFail($table, $data["id"]);
$c1 = recordCount("classes", ["id" => $data["classe_id"]]);
$errors = [];

$c1 == 0 && $errors["classe_id"] = "Cette classe n'existe pas";

if ($obj->nom !== $data["nom"]) {
    $c1 = recordCount($table, ["nom" => $data["nom"]]);
    $c1 > 0 && $errors["nom"] = "Ce nom existe déjà";
}

// Error 443
if (count($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit(0);
}

$obj = update($table, $data, $data["id"]);

echo json_encode($obj);

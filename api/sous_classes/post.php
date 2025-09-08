<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "sous_classes";
$lsColumns = [
    "nom",
    "classe_id"
];

$data = validate($lsColumns);
$c1 = recordCount($table, ["nom" => $data["nom"]]);
$c2 = recordCount("classes", ["id" => $data["classe_id"]]);
$errors = [];

$c1 > 0 && $errors["nom"] = "Ce nom existe déjà";
$c2 == 0 && $errors["classe_id"] = "Cette classe n'existe pas";

// Error 443
if (count($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit(0);
}

$obj = insert($table, $data);
if ($obj) {
    http_response_code(201);
}
echo json_encode($obj);

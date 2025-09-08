<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "notes";
$lsColumns = [
    "nom",
    "evaluation_id",
    "eleve_id",
];

$data = validate($lsColumns);
$obj = findOrFail($table, $data["id"]);
$evaluation = find("evaluations", $data["evaluation_id"]);
$eleve = find("eleves", $data["eleve_id"]);
$errors = [];

!$evaluation && $errors["evaluation_id"] = "Cette evaluation n'existe pas";
!$eleve && $errors["evaluation_id"] = "Cet élève n'existe pas";

// Error 443
if (count($errors) > 0) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
}
$obj = update($table, $data, $data["id"]);

$obj->eleve = $eleve;
$obj->evaluation = $evaluation;
echo json_encode($obj);

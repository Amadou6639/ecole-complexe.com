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
$evaluation = find("evaluations", $data["evaluation_id"]);
$eleve = find("eleves", $data["eleve_id"]);

$c = recordCount($table, ["evaluation_id" => $data["evaluation_id"], "eleve_id" => $data["eleve_id"]]);
$errors = [];

!$evaluation && $errors["evaluation_id"] = "Cette evaluation n'existe pas";
!$eleve && $errors["evaluation_id"] = "Cet élève n'existe pas";
$c > 0 && $errors["eleve_id"] = "Cet élève a déjà une note pour cette évaluation";

// Error 443
if (count($errors) > 0) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
}
$obj = insert($table, $data);
if ($obj) {
    http_response_code(201);
    $obj->eleve = $eleve;
    $obj->evaluation = $evaluation;
}
echo json_encode($obj);

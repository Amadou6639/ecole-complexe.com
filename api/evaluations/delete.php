<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "evaluations";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);
$evaluation = findOrFail($table, $data["id"]);
$c1 = recordCount("matieres", ["id" => $evaluation->matiere_id]);

// Error 443
if ($c1 > 0) {
    http_response_code(422);
    echo json_encode(['errors' => ["id" => "Cette évaluation ne peut pas être supprimer car il existe des données qui en dependent"]]);
    exit();
}

$obj = delete($table, $data["id"]);
echo json_encode($obj);

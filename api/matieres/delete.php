<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "classes";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);
$c1 = recordCount("matieres_classes", ["matiere_id" => $data["id"]]);
$c2 = recordCount("evaluations", ["matiere_id" => $data["id"]]);
$c3 = recordCount("enseignants_classes_matieres", ["matiere_id" => $data["id"]]);

if ($c1 > 0 || $c2 > 0 || $c3 > 0) {
    // Error 443
    http_response_code(422);
    echo json_encode(['errors' => ["id" => "Cette matière ne peut pas être supprimer car il existe des données qui en dependent"]]);
    exit();
}
$obj = delete($table, $data["id"]);

echo json_encode($obj);

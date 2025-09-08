<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "sous_classes";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);
$c1 = recordCount("eleves", ["sous_classe_id" => $data["id"]]);
$c2 = recordCount("enseignants_classes_matieres", ["sous_classe_id" => $data["id"]]);

if ($c1 > 0 || $c2 > 0) {
    // Error 443
    http_response_code(422);
    echo json_encode(['errors' => ["id" => "Cette classe ne peut pas être supprimer car il existe des données qui en dependent"]]);
    exit();
}
$obj = delete($table, $data["id"]);

echo json_encode($obj);

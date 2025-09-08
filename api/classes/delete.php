<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "classes";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);
$count = recordCount("sous_classes", ["classe_id" => $data["id"]]);

if ($count > 0) {
    // Error 443
    http_response_code(422);
    echo json_encode(['errors' => ["id" => "La classe ne peut pas être supprimer car il existe des sous classes qui en dependent"]]);
    exit();
}
$obj = delete($table, $data["id"]);

echo json_encode($obj);

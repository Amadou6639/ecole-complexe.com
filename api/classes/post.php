<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "classes";
$lsColumns = [
    "nom"
];

$data = validate($lsColumns);
$count = recordCount($table, ["nom" => $data["nom"]]);

if ($count > 0) {
    // Error 443
    http_response_code(422);
    echo json_encode(['errors' => ["nom" => "Le nom existe déjà"]]);
    exit();
}
$obj = insert($table, $data);
if ($obj) {
    http_response_code(201);
}
echo json_encode($obj);

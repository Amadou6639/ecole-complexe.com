<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "evaluations";
$lsColumns = [
    "nom",
    "matiere_id",
];

$data = validate($lsColumns);
$obj = insert($table, $data);

if ($obj) {
    http_response_code(201);
}

echo json_encode($obj);

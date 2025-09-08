<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "notes";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);
$evaluation = findOrFail($table, $data["id"]);

$obj = delete($table, $data["id"]);
echo json_encode($obj);

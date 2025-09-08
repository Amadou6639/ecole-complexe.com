<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "matieres_classes";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);

$obj = delete($table, $data["id"]);

echo json_encode($obj);

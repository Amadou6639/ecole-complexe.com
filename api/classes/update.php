<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$lsColumns = [
    "nom",
    "id"
];

$table = "classes";

$data = validate($lsColumns);
$obj = findOrFail($table, $data["id"]);

if ($data["nom"] != $obj) {
    $count = recordCount($table, ["nom" => $data["nom"]]);

    // Error 443
    if ($count > 0) {
        http_response_code(422);
        echo json_encode(['errors' => ["nom" => "Ce nom existe déjà"]]);
        exit();
    }
}
$obj = update($table, $data, $data["id"]);

echo json_encode($obj);

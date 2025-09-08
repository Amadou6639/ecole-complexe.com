<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "eleves";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);
$eleve = findOrFail($table, $data["id"]);
$c1 = recordCount("notes", ["eleve_id" => $data["id"]]);

$errors = [];
!$eleve && $errors["id"] = "Cette ressource n'existe pas";
// !$c1 && $errors["id"] = "Cet eleve ne pas pas être supprimé";
if (count($errors)) {
    // Error 443
    http_response_code(422);
    echo json_encode(['errors' => ["id" => "Cette classe ne peut pas être supprimer car il existe des données qui en dependent"]]);
    exit();
}
$obj = delete($table, $data["id"]);

echo json_encode($obj);

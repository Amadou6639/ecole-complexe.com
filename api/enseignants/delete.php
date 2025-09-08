<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "enseignants";
$lsColumns = [
    "id"
];

$data = validate($lsColumns);
$enseignant = findOrFail($table, $data["id"]);
$c1 = recordCount("enseignants", ["id" => $data["id"]]);

$errors = [];
!$enseignant && $errors["id"] = "Cette ressource n'existe pas";
!$c1 && $errors["id"] = "Cet enseignant ne pas pas être supprimé";
if (count($errors)) {
    // Error 443
    http_response_code(422);
    echo json_encode(['errors' => ["id" => "Cette classe ne peut pas être supprimer car il existe des données qui en dependent"]]);
    exit();
}
$pdo = getPdo();
$pdo->beginTransaction();
rawQuery("DELETE FROM enseignants_classes_matieres WHERE enseignant_id=?", [$data["id"]]);
$obj = delete($table, $data["id"], $pdo);
$pdo->commit();

echo json_encode($obj);

<?php
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "matieres_classes";
$lsColumns = [
    "matiere_id",
    "classe_id"
];

$data = validate($lsColumns);
$c1 = recordCount("matieres_classes", ["matiere_id" => $data["matiere_id"], "classe_id" => $data["classe_id"]]);
$matiere = find("matieres", $data["matiere_id"]);
$classe = find("classes", $data["classe_id"]);
$errors = [];

$c1 > 0 && $errors["matiere_id"] = "Cette repartition existe déjà";
!$matiere && $errors["matiere_id"] = "Cette matière n'existe pas";
!$classe && $errors["classes_id"] = "Cette classes n'existe pas";

// Error 443
if (count($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit(0);
}

$obj = insert($table, $data);
if ($obj) {
    http_response_code(201);
    $obj->matiere = $matiere;
    $obj->classe = $classe;
}

echo json_encode($obj);

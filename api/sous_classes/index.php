<?php

require_once "../function.php";

setJsonHeader();

$page = isset($_GET["page"]) && is_numeric($_GET["page"]) ? (int) $_GET["page"] : 1;
$perPage = isset($_GET["per_page"]) && is_numeric($_GET["per_page"]) ? (int) $_GET["per_page"] : 100;

$limit = $perPage;
$offset = ($page - 1) * $perPage;

$table = "sous_classes";

$query = "SELECT sous_classes.*, classes.nom as nomClasse, classes.id AS idClasse FROM sous_classes 
    JOIN classes ON classes.id=sous_classes.classe_id LIMIT $limit OFFSET $offset";

$lsRawData = rawSelect($query);
$lsData = [];
foreach ($lsRawData as $value) {
    array_push($lsData, [
        "id" => $value->id,
        "nom" => $value->nom,
        "classe" => [
            "id" => $value->idClasse,
            "nom" => $value->nomClasse
        ]
    ]);
}
$total = recordCount($table);

$response = [
    "page" => $page,
    "perPage" => $perPage,
    "total" => $total,
    "data" => $lsData
];

echo json_encode($response);


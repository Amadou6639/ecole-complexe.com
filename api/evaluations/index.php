<?php

require_once "../function.php";

setJsonHeader();

$page = isset($_GET["page"]) && is_numeric($_GET["page"]) ? (int) $_GET["page"] : 1;
$perPage = isset($_GET["per_page"]) && is_numeric($_GET["per_page"]) ? (int) $_GET["per_page"] : 100;

$limit = $perPage;
$offset = ($page - 1) * $perPage;

$table = "evaluations";
$query = "SELECT evaluations.*, matieres.nom as nomMatiere, matieres.id AS idMatiere FROM evaluations 
    LEFT JOIN matieres ON matieres.id=evaluations.matiere_id LIMIT $limit OFFSET $offset";
$rawData = rawSelect($query);
$lsData = [];
foreach ($rawData as $value) {
    $eleve = [
        "id" => $value->id,
        "nom" => $value->nom,
        "matiere" => [
            "id" => $value->idMatiere,
            "nom" => $value->nomMatiere,
        ]
    ];
    array_push($lsData, $eleve);
}
$total = recordCount($table);

$response = [
    "page" => $page,
    "perPage" => $perPage,
    "total" => $total,
    "data" => $lsData
];

echo json_encode($response);


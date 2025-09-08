<?php

require_once "../function.php";

assertMethod("GET");
setJsonHeader();

$page = isset($_GET["page"]) && is_numeric($_GET["page"]) ? (int) $_GET["page"] : 1;
$perPage = isset($_GET["per_page"]) && is_numeric($_GET["per_page"]) ? (int) $_GET["per_page"] : 100;
$limit = $perPage;
$offset = ($page - 1) * $perPage;

$table = "eleves";
$query = "SELECT eleves.*, sous_classes.nom as nomClasse, sous_classes.id AS idClasse FROM eleves 
    LEFT JOIN sous_classes ON sous_classes.id=eleves.sous_classe_id LIMIT $limit OFFSET $offset";
$rawData = rawSelect($query);
$lsData = [];
foreach ($rawData as $value) {
    $eleve = [
        "id" => $value->id,
        "nom" => $value->nom,
        "prenom" => $value->prenom,
        "date_naissance" => $value->date_naissance, // Correction ici
        "sous_classe" => [
            "id" => $value->idClasse,
            "nom" => $value->nomClasse,
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

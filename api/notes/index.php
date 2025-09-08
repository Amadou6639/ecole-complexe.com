<?php

require_once "../function.php";

setJsonHeader();

$page = isset($_GET["page"]) && is_numeric($_GET["page"]) ? (int) $_GET["page"] : 1;
$perPage = isset($_GET["per_page"]) && is_numeric($_GET["per_page"]) ? (int) $_GET["per_page"] : 100;

$limit = $perPage;
$offset = ($page - 1) * $perPage;

$table = "notes";
$query = "SELECT notes.*, ev.nom as nomEvaluation, ev.id AS idEvaluation, eleves.id AS idEleve, eleves.nom, eleves.prenom, eleves.id FROM notes 
    JOIN evaluations ev ON ev.id=notes.evaluation_id 
    JOIN eleves ON eleves.id=notes.eleve_id 
    LIMIT $limit OFFSET $offset";
$rawData = rawSelect($query);
$lsData = [];
foreach ($rawData as $value) {
    $note = [
        "id" => $value->id,
        "valeur" => $value->valeur,
        "evaluation" => [
            "id" => $value->idEvaluation,
            "nom" => $value->nomEvaluation
        ],
        "eleve" => [
            "id" => $value->idEleve,
            "nom" => $value->nom,
            "prenom" => $value->prenom,
        ]
    ];
    array_push($lsData, $note);
}
$total = recordCount($table);

$response = [
    "page" => $page,
    "perPage" => $perPage,
    "total" => $total,
    "data" => $lsData
];

echo json_encode($response);


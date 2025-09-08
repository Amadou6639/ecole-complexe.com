<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
require_once "../function.php";

setJsonHeader();

$page = isset($_GET["page"]) && is_numeric($_GET["page"]) ? (int) $_GET["page"] : 1;
$perPage = isset($_GET["per_page"]) && is_numeric($_GET["per_page"]) ? (int) $_GET["per_page"] : 100;

$limit = $perPage;
$offset = ($page - 1) * $perPage;

$table = "enseignants";
$query = "SELECT enseignants.*, sous_classes.nom AS nomClasse, sous_classes.id AS idClasse, matieres.nom AS nomMatiere, matieres.id AS idMatiere FROM enseignants 
    LEFT JOIN enseignants_classes_matieres AS e_c_m ON e_c_m.enseignant_id=enseignants.id 
    LEFT JOIN matieres ON matieres.id=e_c_m.matiere_id 
    LEFT JOIN sous_classes ON sous_classes.id=e_c_m.sous_classe_id 
    LIMIT $limit OFFSET $offset";
$rawData = rawSelect($query);
$lsData = [];
foreach ($rawData as $value) {
    $enseignements = [
        [//{
            "sous_classe" => [//{
                "id" => $value->idClasse,
                "nom" => $value->nomClasse,
            ],//}
            "matiere" => [ //{
                "id" => $value->idMatiere,
                "nom" => $value->nomClasse,
            ]//}
        ]//}
    ];
    $enseignant = null;
    foreach ($lsData as $elt) {
        if ($elt["id"] == $value->id) {
            $enseignant = $elt;
            break;
        }
    }
    if ($enseignant !== null) {
        array_push($enseignant["enseignements"], ...$enseignements);
    } else {
        $enseignant = [
            "id" => $value->id,
            "nom" => $value->nom,
            "prenom" => $value->prenom,
            "email" => $value->email,
            "telephone" => $value->telephone,
            "enseignements" => $enseignements
        ];
        array_push($lsData, $enseignant);
    }
}
$total = recordCount($table);

$response = [
    "page" => $page,
    "perPage" => $perPage,
    "total" => $total,
    "data" => $lsData
];

echo json_encode($response);


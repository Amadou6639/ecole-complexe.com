<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
require_once "../function.php";
setJsonHeader();
assertMethod("POST");

$table = "enseignants";
$lsColumns = [
    "nom",
    "prenom",
    "email",
    "telephone",
    // "enseignements", // Type: [Array<{classe: number, matiere: number}]
];

$data = validate($lsColumns);
$enseignements = validate(["enseignements"]);
$nbreEnseignant = recordCount($table, ["nom" => $data["nom"], "prenom" => $data["prenom"], "email" => $data["email"]]);
$errors = [];

$nbreEnseignant > 0 && $errors["nom"] = "Ce nom existe déjà";
$nbreEnseignant > 0 && $errors["prenom"] = "Ce nom existe déjà";

// Error 443
if (count($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit(0);
}

$pdo = getPdo();
$pdo->beginTransaction();

$obj = insert($table, $data, $pdo);

$enseignements = $enseignements["enseignements"];

if (is_array($enseignements) && count($enseignements)) {
    try {

        $query = "INSERT INTO enseignants_classes_matieres(enseignant_id, sous_classe_id, matiere_id) VALUES";
        $params = [];
        foreach ($enseignements as $value) {
            $query .= "(?, ?, ?),";
            array_push($params, $obj->id, $value["classe"], $value["matiere"]);
        }
        $query[-1] = ";";
        $statement = $pdo->prepare($query);
        $statement->execute($params);
        $enseignements = [];
        $query = "SELECT e_c_m.*, m.id AS idMatiere, m.nom AS nomMatiere, sc.id AS classeId, sc.nom AS nomClasse FROM enseignants_classes_matieres e_c_m 
            JOIN matieres m ON m.id=e_c_m.matiere_id
            JOIN sous_classes sc ON sc.id=e_c_m.sous_classe_id WHERE e_c_m.enseignant_id=?";
        $lsRawEnseignement = rawSelect($query, [$obj->id], $pdo);
        foreach ($lsRawEnseignement as $value) {
            array_push($enseignements, [
                "matiere" => [
                    "id" => $value->idMatiere,
                    "nom" => $value->nomMatiere,
                ],
                "sous_classe" => [
                    "id" => $value->classeId,
                    "nom" => $value->nomClasse,
                ]
            ]);
        }
        $obj->enseignements = $enseignements;
    } catch (\Throwable $th) {
        $pdo->rollBack();
        http_response_code(422);
        $errors["message"] = $th->getMessage();
        echo json_encode(['errors' => $errors]);
        exit(0);
    }
}

$pdo->commit();

if ($obj) {
    http_response_code(201);
}
echo json_encode($obj);

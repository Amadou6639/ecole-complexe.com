<?php

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

$dsn = "mysql:host=localhost;dbname=ecole";
$userName = "gestionnaire_ecole";
$password = "Password_gestionnaire_ecole11#";

function getPdo()
{
    global $dsn, $userName, $password;
    return new PDO($dsn, $userName, $password);
}


function setJsonHeader()
{
    static $headerIsSet = false;
    if (!$headerIsSet) {
        header("Content-type: Application/json");
        $headerIsSet = true;
    }
}

function assertMethod(string $method)
{
    $requestMethod = $_SERVER["REQUEST_METHOD"];
    if ($method !== $requestMethod) {
        //405 Method Not Allowed
        http_response_code(405);
        header("Allow: $method");
        exit(json_encode(['error' => 'Method Not Allowed']));
    }
}

function validate(array $columns)
{
    $data = [];
    $errors = [];
    foreach ($columns as $col) {
        if (isset($_POST[$col]) && $_POST[$col]) {
            $data[$col] = $_POST[$col];
        } else {
            $errors[$col] = "Le champs $col est requis";
        }
    }
    // Error 443
    if (count($errors) > 0) {
        http_response_code(422);
        echo json_encode(['errors' => $errors]);
        exit;
    }
    return $data;
}

/**
 * Inserer une données dans la table @param $table
 * @param string $table
 * @param array $data : le tableau associatif contenant les données à inserer
 * @param PDO|null $pdo
 * @return bool|stdClass
 */
function insert(string $table, array $data, PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();
    $fields = array_filter(array_keys($data), fn($elt) => $elt !== "id");
    $field_str = implode(",", $fields);
    $field_param = array_map(fn($item) => ":$item", $fields);
    $filds_param_str = implode(",", $field_param);

    $query = "INSERT INTO $table (  $field_str ) VALUES( $filds_param_str );";
    $statement = $pdo->prepare($query);
    $obj = new stdClass();
    foreach ($data as $key => $value) {
        if ($key !== "id") {
            $statement->bindValue(":$key", $value);
        }
        $obj->$key = $value;
    }

    if ($statement->execute()) {
        $obj->id = $pdo->lastInsertId();
        return $obj;
    }
    return false;
}

function update(string $table, array $data, int $id, PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();
    $columns = array_filter(array_keys($data), fn($elt) => $elt !== "id");
    $field_param = array_map(fn($field) => "$field=:$field", $columns);
    $filds_param_str = implode(",", $field_param);

    $query = "UPDATE $table SET $filds_param_str WHERE id=:id";
    $statement = $pdo->prepare($query);
    $obj = new stdClass();
    $obj->id = $id;
    foreach ($data as $key => $value) {
        if ($key === "id") {
            continue;
        }
        $statement->bindValue(":$key", $value);
        $obj->$key = $value;
    }
    $statement->bindValue(":id", $id);

    if ($statement->execute()) {
        return $obj;
    }
    return false;
}

function select(string $table, array $fields = [], $limite = 100, $offset = null, PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();

    $fields_str = count($fields) == 0 ? "*" : implode(",", $fields);
    $query = "SELECT $fields_str FROM $table LIMIT :limite " . ($offset ? "OFFSET :offset" : "");

    $statement = $pdo->prepare($query);

    $statement->bindValue(":limite", $limite, PDO::PARAM_INT);
    $offset && $statement->bindValue(":offset", $offset, PDO::PARAM_INT);

    if ($statement->execute()) {
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }
    return false;
}

function rawQuery(string $query, array $params, PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();
    $statement = $pdo->prepare($query);
    if ($statement->execute($params)) {
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }
    return false;
}

function recordCount(string $table, $wheres = [], PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();
    $whereKey = array_keys($wheres);
    $query = "SELECT COUNT(*) AS recordCount FROM $table ";
    $params = [];
    foreach ($whereKey as $index => $key) {
        if ($index === 0) {
            $query .= "WHERE $key=?";
        } else {
            $query .= " AND $key=?";
        }
        array_push($params, $wheres[$key]);
    }
    $statement = $pdo->prepare($query);
    if ($statement->execute($params)) {
        return $statement->fetch(PDO::FETCH_OBJ)->recordCount;
    }
    return 0;
}

function rawSelect(string $query, $params = [], PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();

    $statement = $pdo->prepare($query);

    if (isset($params[":limit"])) {
        $statement->bindValue(":limit", (int) $params[":limit"], PDO::PARAM_INT);
        unset($params[":limit"]);
    }
    if (isset($params[":offset"])) {
        $statement->bindValue(":offset", (int) $params[":offset"], PDO::PARAM_INT);
        unset($params[":offset"]);
    }
    if ($statement->execute($params)) {
        return $statement->fetchAll(PDO::FETCH_OBJ);
    }
    return false;
}

function delete(string $table, int $id, PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();

    $query = "DELETE FROM $table WHERE id=:id";

    $statement = $pdo->prepare($query);
    $statement->bindValue(":id", $id, PDO::PARAM_INT);
    return $statement->execute();
}

function isUnique(string $table, array $fields, PDO $pdo)
{
    $pdo = $pdo ?: getPdo();

    $fieldNames = array_keys($fields);
    $field_str = implode(",", array_map(fn($e) => "$e:$e", $fieldNames));
    $query = "SELECT * FROM $table WHERE $field_str";
    $statement = $pdo->prepare($query);

    foreach ($fields as $key => $value) {
        $statement->bindValue(":$key", $value);
    }
    if ($statement->execute()) {
        return count($statement->fetchAll(PDO::FETCH_OBJ)) > 0;
    }
    return false;
}

function find(string $table, int $id, PDO $pdo = null)
{
    $pdo = $pdo ?: getPdo();

    $query = "SELECT * FROM $table WHERE id=:id";
    $statement = $pdo->prepare($query);

    $statement->bindValue(":id", $id);
    if ($statement->execute()) {
        return $statement->fetch(PDO::FETCH_OBJ);
    }
    return false;
}

function findOrFail(string $table, int $id, PDO $pdo = null)
{
    $obj = find($table, $id, $pdo);
    if ($obj) {
        return $obj;
    }
    http_response_code(404);
    echo json_encode(['errors' => ["id" => "Auccun enregistrement trouvé"]]);
    exit(0);
}

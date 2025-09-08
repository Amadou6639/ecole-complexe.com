<?php

require_once "../function.php";

setJsonHeader();

$page = isset($_GET["page"]) && is_numeric($_GET["page"]) ? (int) $_GET["page"] : 1;
$perPage = isset($_GET["per_page"]) && is_numeric($_GET["per_page"]) ? (int) $_GET["per_page"] : 100;

$limit = $perPage;
$offset = ($page - 1) * $perPage;

$table = "classes";

$lsData = select($table, [], $limit, $offset);
$total = recordCount($table);

$response = [
    "page" => $page,
    "perPage" => $perPage,
    "total" => $total,
    "data" => $lsData
];

echo json_encode($response);

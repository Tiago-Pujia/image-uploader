<?php
$limitIds = $_GET['limit'];
$listExcludedIds = join(',',json_decode($_GET['excludedImages'])->list);

$sql = "SELECT ID_IMG FROM vw_imgs WHERE ID_IMG NOT IN($listExcludedIds) ORDER BY rand() LIMIT $limitIds;";
$response = $crud->query($sql);
$response = array_map(fn($el)=>intval($el[0]),$response);

echo json_encode($response);

http_response_code(200);
header('Content-type: application/json');
?>
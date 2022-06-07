<?php
$limitIds = $_GET['limit'];
$listExcludedIds = join(',',json_decode($_GET['excludedImages'])->list);

if($listExcludedIds == null){
    $listExcludedIds = -1;
}

try {
    $sql = "SELECT ID_IMG FROM vw_imgs WHERE ID_IMG NOT IN($listExcludedIds) ORDER BY rand() LIMIT $limitIds;";
    $response = $crud->query($sql);
    $response = array_map(fn($el)=>intval($el[0]),$response);
} catch (\Throwable $th) {
    exit('Error');
}

echo json_encode($response);
http_response_code($response ? 200 : 204);
header('Content-type: application/json');
?>
<?php
try {
    $limitIds = $_GET['limit'];
    $listExcludedIds = join(',',json_decode($_GET['excludedImages'])->list);    
        if($listExcludedIds == null) $listExcludedIds = -1;
    $sql = "SELECT ID_IMG FROM vw_imgs WHERE ID_IMG NOT IN($listExcludedIds) ORDER BY rand() LIMIT $limitIds;";

    include_once $path_root . '/API/crud.php';
    $response = $crud->query($sql);
    $response = array_map(fn($el)=>intval($el[0]),$response);

    echo json_encode($response);
    http_response_code($response ? 200 : 204);
    header('Content-type: application/json');

} catch (\Throwable $th) {
    http_response_code(500);
    
    if(!isset($_GET['limit']) || empty($_GET['limit'])){
        http_response_code(400);
        exit('Define a limit');
    }

    exit('Error');
}
?>
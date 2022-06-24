<?php
try {
    $id_img = $_GET['photoid'];
    $sql = "SELECT VIEWS FROM vw_imgs WHERE ID_IMG = $id_img";

    include_once $path_root . '/API/crud.php';
    $response = $crud->query($sql)[0][0];

    http_response_code($response ? 200 : 204);
    header("Cache-Control: no-cache, must-revalidate");
    header("Expires: Sat, 1 Jul 2000 05:00:00 GMT");
    echo $response;
} catch (\Throwable $th) {
    http_response_code(500);

    if(!isset($_GET['photoid']) || empty($_GET['photoid'])){
        http_response_code(400);
        exit('Define a Photo-ID');
    }
    
    exit('Error');
}
?>
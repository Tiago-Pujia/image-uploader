<?php

try {
    $id_img = $_GET['photoid'];
    
    include_once $path_root . '/API/crud.php';
    $response = $crud->query("SELECT IMG FROM vw_imgs WHERE ID_IMG = $id_img")[0][0];
    
    if(!$response){
        http_response_code(204);
        exit();
    }
    
    http_response_code(200);
    header('Content-type: image/jpg');
    header("Content-Disposition: attachment; filename=photo.jpg");
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
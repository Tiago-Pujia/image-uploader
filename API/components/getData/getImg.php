<?php
$id_img = $_GET['photoid'];
$response = $crud->query("SELECT IMG FROM vw_imgs WHERE ID_IMG = $id_img")[0][0];

if(!$response){
    http_response_code(204);
    exit();
}

http_response_code(200);
header('Content-type: image/jpg');
echo $response;
?>
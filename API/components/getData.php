<?php

if(!isset($_GET['photoid'])) exit('Please select a image');

include_once $_SERVER['DOCUMENT_ROOT'] . "/API/crud.php";

$id_img = $_GET['photoid'];

// Si pide visitas
if(isset($_GET['views']) && isset($id_img)){
    $response = $crud->query("SELECT VIEWS FROM vw_imgs WHERE ID_IMG = $id_img")[0][0];

    http_response_code(200);
    exit($response);

// Si pide solo una imagen 
} else if(isset($id_img)){
    $response = $crud->query("SELECT IMG FROM vw_imgs WHERE ID_IMG = $id_img")[0][0];
    
    if(!$response){
        http_response_code(204);
        exit();
    }
    
    http_response_code(200);
    header('Content-type: image/jpg');
    exit($response);
} 


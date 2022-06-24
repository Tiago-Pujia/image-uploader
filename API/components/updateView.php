<?php
try {
    // Como no hay una variable para el metodo PUT lo creamos
    $_PUT = get_object_vars(json_decode(file_get_contents("php://input")));
    $photoid = intval($_PUT['photoid']);
    $sql = "CALL addView($photoid)";
    
    include_once $_SERVER['DOCUMENT_ROOT'] . '/API/crud.php';
    $crud->store_procedure($sql);

    http_response_code(204);
} catch (\Throwable $th) {
    http_response_code(500);

    if (!isset($_PUT['photoid'])) {
        http_response_code(400);
        exit('Select a image');
    };

    exit('Error');
}
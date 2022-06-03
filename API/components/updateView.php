<?php
// Como no hay una variable para el metodo PUT lo creamos
$_PUT = get_object_vars(json_decode(file_get_contents("php://input")));

if (!isset($_PUT['photoid'])) return('Please select a image');

include_once $_SERVER['DOCUMENT_ROOT'] . "/API/crud.php";

// Sumamos a la BD una visita a una imagen
$photoid = intval($_PUT['photoid']);

$crud->store_procedure("CALL addView($photoid)");

http_response_code(204);
<?php

http_response_code(400);

$server_name = $_SERVER['SERVER_NAME'];
$path_root = $_SERVER['DOCUMENT_ROOT'];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        include_once 'components/getData.php';
        break;

    case 'PUT':
        include_once 'components/updateView.php';
        break;

    case 'POST':
        include_once 'components/insertImg.php';
        break;
}
<?php

if (!isset($_FILES['img'])) return('Please select a image');

include_once $_SERVER['DOCUMENT_ROOT'] . "/API/crud.php";

header("Content-type: application/json");

$file = $_FILES['img'];

// Validación de Datos
function validateFileToImg($file){
    if($file['error'] != 0) return('The image contains errors');
    if($file['size'] >= 16777215) return('The maximum size is 16mb');
    
    function validateFormatImg($fileType){
        $formats = array('image/jpeg','image/png','image/jpg');
        $result = false;
    
        foreach ($formats as $value) {
            if(strpos($fileType,$value) !== false){
                $result = true;
                break;
            };
        }
    
        return $result;
    }
    
    if(!validateFormatImg($file['type'])) return('Invalid image format');

    return 1;
}

$fileResult = validateFileToImg($file);

if($fileResult != 1){
    http_response_code(406);
    exit($fileResult);
}


// Insertar Datos en la BD
$user_image_path = $file['tmp_name'];
$user_ip = $_SERVER['REMOTE_ADDR'];
$insertImg = $crud->insertBlob($user_image_path,$user_ip);

http_response_code(201);
echo $insertImg;
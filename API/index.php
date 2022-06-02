<?php
include_once "crud.php";

header("Content-type: application/json");
http_response_code(500);

if (!isset($_FILES['img'])) return('Please select a image');

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
    exit(
        json_encode([
            'status' => 0, 
            'response' => $fileResult
        ])
    );
}


// Insertar Datos en la BD
$user_image_path = $file['tmp_name'];
$user_ip = $_SERVER['REMOTE_ADDR'];
$insertImg = $crud->insertBlob($user_image_path,$user_ip);
$server_name = $_SERVER['SERVER_NAME'];

http_response_code(201);
echo json_encode([
    'status' => 1, 
    'response' => "http://$server_name/previewImg?photoid=$insertImg"
]);
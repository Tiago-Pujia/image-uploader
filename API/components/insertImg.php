<?php
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

try {
    $file = $_FILES['img'];
    $fileResult = validateFileToImg($file);
    if($fileResult != 1){
        throw new Exception();
    }

    $user_image_path = $file['tmp_name'];
    $user_ip = $_SERVER['REMOTE_ADDR'];

    include_once $path_root . '/API/crud.php';
    $insertImg = $crud->insertBlob($user_image_path,$user_ip);

    http_response_code(201);
    header('Content-type: application/json');
    echo $insertImg;

} catch (\Throwable $th) {
    http_response_code(500);

    if(!isset($_FILES['img']) || empty($_FILES['img'])){
        http_response_code(400);
        exit('Define a img');
    }

    $fileResult = validateFileToImg($file);

    if($fileResult != 1){
        http_response_code(400);
        exit($fileResult);
    }

    exit('Error');
}
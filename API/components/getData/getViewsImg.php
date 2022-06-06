<?php
$id_img = $_GET['photoid'];
$response = $crud->query("SELECT VIEWS FROM vw_imgs WHERE ID_IMG = $id_img")[0][0];

http_response_code(200);
echo $response;
?>
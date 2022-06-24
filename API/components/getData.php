<?php
if(!isset($_GET['action'])) exit('Please define an action');

switch ($_GET['action']) {
    case 'imgJPG':
        include_once 'getData/getImg.php';
        break;
    
    case 'viewsImg':
        include_once 'getData/getViewsImg.php';
        break;

    case 'listImgsId':
        include_once 'getData/getListImgsId.php';
        break;
    
    default:
        echo 'Please define an action';
        break;
}
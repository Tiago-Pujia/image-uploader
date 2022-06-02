<?php

class BD {
    private static $db_type = 'mysql';
    private static $db_host = 'localhost';
    private static $db_name = 'db_ium';
    private static $db_user = 'user_api';
    private static $db_pass = 'peluza';
    protected $db_connection = null;

    public function connect(){
        try {
            $dsn = self::$db_type . ":host=" . self::$db_host . ";dbname=" . self::$db_name;
            $this->db_connection = new PDO($dsn,self::$db_user,self::$db_pass);
            $this->db_connection->exec("SET names utf8");
            return $this->db_connection;
        } catch(PDOException $e) {
            exit('Error');
        };
    }

    public function disconnect(){
        $this->db_connection = null;
    }

    function __destruct(){}
}

class CRUD extends BD {

    // Metodos innecesarios por ahora
    /* 
    public function query($query){
        try {
            $this->connect();
            $response = $this->db_connection->query($query)->fetchAll(PDO::FETCH_NUM);
            $this->disconnect();

            return $response;
        } catch (PDOException $e) {
            return 'Error';
        }
    }

    public function exec($exec){
        try {
            $this->connect();
            $response = $this->db_connection->exec($exec);
            $this->disconnect();
            
            return $response;
        } catch (PDOException $e) {
            return 'Error';
        }
    } 
    */

    public function insertBlob($filePath, $ip_address) {
        try {
            $this->connect();
            $blob = fopen($filePath, 'rb');

            $sqlQuery = "INSERT INTO tbl_imgs(IMG,IP_ADDRESS) VALUES(:IMG,:IP_ADDRESS)";

            $response = $this->db_connection->prepare($sqlQuery);
            $response->bindParam(':IMG', $blob, PDO::PARAM_LOB);
            $response->bindParam(':IP_ADDRESS', $ip_address);
            $response->execute();
            $idImg = $this->db_connection->lastInsertId();

            $this->disconnect();

            return $idImg;
        } catch (PDOException $e) {
            return 'Error';
        }
    }

    function __destruct(){}
}

$crud = new CRUD();

?>
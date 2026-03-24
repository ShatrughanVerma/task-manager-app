<?php
// PostgreSQL Database configuration
class Database {
    private $host = "localhost";
    private $port = "5432";
    private $db_name = "task_manager";
    private $username = "postgres";
    private $password = "Yash@123";
    private $conn;

    public function getConnection() {
        $this->conn = null;
        
        try {
            $dsn = "pgsql:host=" . $this->host . 
                   ";port=" . $this->port . 
                   ";dbname=" . $this->db_name;
            
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->conn->exec("SET NAMES 'UTF8'");
            
        } catch(PDOException $exception) {
            echo json_encode(array(
                "error" => "Database connection failed",
                "message" => $exception->getMessage()
            ));
            die();
        }
        
        return $this->conn;
    }
}
?>


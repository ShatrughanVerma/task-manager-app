<?php
class Task {
    private $conn;
    private $table_name = "tasks";

    public $id;
    public $task_name;
    public $status;
    public $created_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAllTasks() {
        $query = "SELECT id, task_name, status, created_at 
                  FROM " . $this->table_name . " 
                  ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function createTask() {
        $query = "INSERT INTO " . $this->table_name . " 
                  (task_name, status, created_at) 
                  VALUES (:task_name, 'Created', CURRENT_TIMESTAMP) 
                  RETURNING id, created_at";
        
        $stmt = $this->conn->prepare($query);
        $this->task_name = htmlspecialchars(strip_tags($this->task_name));
        $stmt->bindParam(":task_name", $this->task_name);
        
        if($stmt->execute()) {
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->id = $result['id'];
            $this->created_at = $result['created_at'];
            return true;
        }
        return false;
    }

    public function updateStatus() {
        $query = "UPDATE " . $this->table_name . " 
                  SET status = :status 
                  WHERE id = :id 
                  RETURNING status";
        
        $stmt = $this->conn->prepare($query);
        $this->status = htmlspecialchars(strip_tags($this->status));
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":id", $this->id);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>

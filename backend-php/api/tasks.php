<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Direct paths - absolute paths
$db_file = "C:\\xampp\\htdocs\\task-manager-app\\backend-php\\api\\config\\database.php";
$task_file = "C:\\xampp\\htdocs\\task-manager-app\\backend-php\\includes\\Task.php";

// Check if files exist
if (!file_exists($db_file)) {
    die(json_encode(["error" => "database.php not found at: $db_file"]));
}
if (!file_exists($task_file)) {
    die(json_encode(["error" => "Task.php not found at: $task_file"]));
}

include_once $db_file;
include_once $task_file;

$database = new Database();
$db = $database->getConnection();
$task = new Task($db);
$method = $_SERVER['REQUEST_METHOD'];

if($method == 'GET') {
    $stmt = $task->getAllTasks();
    $num = $stmt->rowCount();
    
    if($num > 0) {
        $tasks_arr = array();
        $tasks_arr["records"] = array();
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $task_item = array(
                "id" => (int)$row['id'],
                "task_name" => $row['task_name'],
                "status" => $row['status'],
                "created_at" => $row['created_at']
            );
            array_push($tasks_arr["records"], $task_item);
        }
        
        http_response_code(200);
        echo json_encode($tasks_arr);
    } else {
        http_response_code(200);
        echo json_encode(array("records" => array()));
    }
}
else if($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->task_name)) {
        $task->task_name = trim($data->task_name);
        
        if($task->createTask()) {
            http_response_code(201);
            echo json_encode(array(
                "success" => true,
                "message" => "Task created successfully."
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("error" => "Unable to create task."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Task name is required."));
    }
}
?>

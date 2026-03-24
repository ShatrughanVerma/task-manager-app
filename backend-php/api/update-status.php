<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Direct paths
$db_file = "C:\\xampp\\htdocs\\task-manager-app\\backend-php\\api\\config\\database.php";
$task_file = "C:\\xampp\\htdocs\\task-manager-app\\backend-php\\includes\\Task.php";

include_once $db_file;
include_once $task_file;

$database = new Database();
$db = $database->getConnection();
$task = new Task($db);

if($_SERVER['REQUEST_METHOD'] == 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    
    if(!empty($data->id) && !empty($data->status)) {
        $task->id = (int)$data->id;
        $task->status = $data->status;
        
        if($task->updateStatus()) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Status updated successfully."
            ));
        } else {
            http_response_code(503);
            echo json_encode(array("error" => "Unable to update status."));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "ID and status are required."));
    }
}
?>

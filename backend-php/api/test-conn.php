<?php
$host = "localhost";
$port = "5432";
$dbname = "task_manager";
$user = "postgres";
$pass = "Yash@123";

try {
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname";
    $pdo = new PDO($dsn, $user, $pass);
    echo "✅ Connection successful!<br>";
    
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM tasks");
    $result = $stmt->fetch();
    echo "Total tasks: " . $result['total'];
    
} catch(PDOException $e) {
    echo "❌ Connection failed: " . $e->getMessage();
}
?>

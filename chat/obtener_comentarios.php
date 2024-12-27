
<?php
include 'vote.php';

$sql = "SELECT usuario, comentario, fecha FROM comentarios ORDER BY fecha DESC";
$result = $conn->query($sql);

$comentarios = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $comentarios[] = $row;
    }
    echo json_encode($comentarios);
} else {
    echo json_encode([]);
}

// Cerramos la conexión
$conn->close();
?>
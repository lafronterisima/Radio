<?php
$servidor = "localhost";     // Servidor local
$socket = "/run/mysqld/mysqld.sock";  // Ruta al socket UNIX de MariaDB
$usuario = "LA138US00003";   // MySQL username
$senha = "Radio12om*";       // MySQL password
$dbname = "artist";          // Database name

// Criar a conexão
$conn = mysqli_connect($servidor, $usuario, $senha, $dbname, null, $socket);

// Verificamos la conexión
if (!$conn) {
    die(json_encode(["success" => false, "message" => "Error de conexión: " . mysqli_connect_error()]));
}

// Obtenemos los votos de los artistas
$query = "SELECT id AS artist_id, votes FROM artist ORDER BY id";
$result = $conn->query($query);

if ($result) {
    $votes = [];
    while ($row = $result->fetch_assoc()) {
        $votes[] = $row;
    }
    echo json_encode(["success" => true, "votes" => $votes]);
} else {
    echo json_encode(["success" => false, "message" => "Error al obtener los votos: " . $conn->error]);
}

// Cerramos la conexión
$conn->close();
?>
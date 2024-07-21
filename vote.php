
<?php
	$servidor = "81.25.112.63";
	$usuario = "LA138US00003";
	$senha = "Radio12om*";
	$dbname = "artist";
	
	//Criar a conexao
	$conn = mysqli_connect($servidor, $usuario, $senha, $dbname);
	

// Verificamos la conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Error de conexión: " . $conn->connect_error]));
}

// Verificamos si el usuario ya votó
if (isset($_COOKIE['hasVoted'])) {
    echo json_encode(["success" => false, "message" => "Ya has votado."]);
    exit();
}

// Obtenemos el ID del artista seleccionado de manera segura
$artist_id = isset($_POST['artist']) ? intval($_POST['artist']) : 0;

if ($artist_id > 0) {
    // Preparamos la consulta para evitar inyección SQL
    $stmt = $conn->prepare("UPDATE artist SET votes = votes + 1 WHERE id = ?");
    $stmt->bind_param('i', $artist_id);

    // Ejecutamos la consulta
    if ($stmt->execute()) {
        // Establecemos una cookie para marcar que el usuario ya ha votado
        setcookie('hasVoted', 'true', time() + (86400 * 30), "/");  // Cookie válida por 30 días

        echo json_encode(["success" => true, "message" => "Voto registrado exitosamente."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al registrar el voto: " . $stmt->error]);
    }

    // Cerramos la declaración
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ID de artista inválido."]);
}

// Cerramos la conexión
$conn->close();
?>

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
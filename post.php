<?php
header('Content-Type: application/json');
$response = array('success' => false, 'message' => 'Error desconocido');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
    $comentario = isset($_POST['comentario']) ? trim($_POST['comentario']) : '';

    if (!empty($usuario) && !empty($comentario)) {
        $linea = date('Y-m-d H:i:s') . " - $usuario: $comentario\n";

        if (file_put_contents('chatlog.txt', $linea, FILE_APPEND | LOCK_EX) !== false) {
            $response['success'] = true;
            $response['message'] = 'Comentario recibido.';
        } else {
            $response['message'] = 'No se pudo guardar el comentario.';
        }
    } else {
        $response['message'] = 'Datos inválidos. Asegúrate de completar todos los campos.';
    }
} else {
    $response['message'] = 'Método no permitido. Por favor, usa POST.';
}

echo json_encode($response);
?>
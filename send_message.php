<?php
// Ruta del archivo para almacenar los mensajes
$filename = 'messages.txt';

// Obtiene el nombre de usuario y el mensaje enviados
$username = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
$message = isset($_POST['comentario']) ? trim($_POST['comentario']) : '';

// Validación simple para asegurarse de que el nombre de usuario y el mensaje no estén vacíos
if (empty($username) || empty($message)) {
    echo 'Nombre de usuario y mensaje son requeridos.';
    exit;
}

// Validación adicional para evitar caracteres peligrosos
$username = htmlspecialchars($username, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Establece la zona horaria para Colombia
$timezone = new DateTimeZone('America/Bogota');
$date_time = new DateTime('now', $timezone);
$date_time_formatted = $date_time->format('Y-m-d H:i:s');

// Formatea el mensaje con la fecha y hora
$formatted_message = $username . " (" . $date_time_formatted . "): " . $message;

// Añade el nuevo mensaje al archivo y maneja posibles errores
if (file_put_contents($filename, $formatted_message . PHP_EOL, FILE_APPEND) === false) {
    echo 'Error al enviar el mensaje. Intenta nuevamente más tarde.';
    exit;
}

// Responde con un éxito
echo 'Mensaje enviado';
?>
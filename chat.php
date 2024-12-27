

<?php
// Ruta del archivo para almacenar los mensajes
$filename = 'messages.txt';

// Verifica si el archivo existe y, si no, lo crea con permisos adecuados
if (!file_exists($filename)) {
    if (false === file_put_contents($filename, '')) {
        die('No se pudo crear el archivo.');
    }
}

// Intenta leer el contenido del archivo y manejar posibles errores
$messages = @file_get_contents($filename);
if ($messages === false) {
    die('No se pudo leer el archivo.');
}

// Convierte caracteres especiales a HTML y divide los mensajes en un array
$messages_array = explode("\n", trim($messages));

// Envuelve cada mensaje en un <div> con la clase "message"
$formatted_messages = '';
foreach ($messages_array as $message) {
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); // Escapa caracteres especiales
    if (!empty($message)) {
        $formatted_messages .= "<div class='message'>{$message}</div>";
    }
}

// Envuelve todo el contenido en un contenedor <div>
echo "<div class='messages-container'>{$formatted_messages}</div>";
?>
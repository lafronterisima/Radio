<?php

$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

    //Verifica campos vacios
    if (empty($email) or empty($mensaje)) {
            echo "Completa los campos correspondientes."; 
    }

    else{

        $header = 'From: ' .$email . " \r\n";
        $header .= "X-Mailer: PHP/" . phpversion() . " \r\n";
        $header .= "Mime-Version: 1.0 \r\n";
        $header .= "Content-Type: text/plain";

        $info .= "Su correo es: " . $email . " \r\n";
        $info .= "Mensaje: " . $mensaje . " \r\n";
        $info .= "Enviado: " . date('d/m/Y', time());

        $para = 'osmellca@gmail.com';
        $asunto = 'Mensaje de la página web';

        mail($para, utf8_decode($asunto), utf8_decode($info), $header);
		
		return true;
    }
	
?>



<?php
$usuario  = "LA138US00001";
$password = "Nata2024*";
$servidor = "localhost";
$puerto = 3306; 
$basededatos = "artistas";
$con = mysqli_connect($servidor, $usuario, $password, $basededatos, $puerto) or die("No se ha podido conectar al Servidor");
?>
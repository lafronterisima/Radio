<?php
$usuario  = "LA138US00001";
$password = "Nata2024*";
$servidor = "localhost:3306";
$basededatos = "artistas";
$con = mysqli_connect($servidor, $usuario, $password, $basededatos) or die("No se ha podido conectar al Servidor");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" type="image/x-icon" href="imgs/favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  <title>Votación</title>
  <link rel="stylesheet" href="css/home.css">
  <script src="https://code.jquery.com/jquery-2.2.4.js"></script>


  <style>
  
  *
{
	margin: 0;
	padding: 0;
}
body
{
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	line-height: 23px;
	font-weight: 400;
	background: #FFFFFF;
	color: #1e1e27;
}

h1{
  font-size: 40px;
  padding-top:20px;  
  padding-bottom: 1rem;
  margin-bottom: 0;
  color:white;
  font-family: 'Lobster', cursive;
  
 }
.fotoPelicula{
    width: 100%;
    height: 150px;
    display: block;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.flex-container {
  /* We first create a flex layout context */
  display: flex;
  flex-flow: row wrap;
  
  /* Then we define how is distributed the remaining space */
  justify-content: space-around;
  
  padding: 0;
  margin: 0;
  list-style: none;
}

.flex-item {
  background: #f9f9f9;
  padding: 20px;
  width: auto;
  height: 180px;
  margin-top: 10px;
  line-height: 50px;
  color: white;
  font-weight: bold;
  font-size: 3em;
  text-align: center;
  border-radius: 15px;
}

span{
  color: #333;
  font-size: 18px;
}
.iconVoto{
  width: 100%;
  width: 30px;
}

@keyframes myanimation {
50%  {
    transform: scale(1.05);
  }
}
span .far:hover{
cursor: pointer;
animation-name: myanimation;
animation-duration: 0.3s;
}
.text-center{
text-align: center;
}
.bold{
font-size: 40px;
font-weight: 900;
}
.mt-5{
margin-top: 50px;
}
.mb-5{
margin-bottom: 50px;
line-height: 1;
}
.checkenlike{
  color: green;
}
.checkendislike{
  color: #333;
}
  </style>

</head>
<body>
  
<?php
include('config.php');
  
$sqlArtistas   = ("SELECT * FROM  artistas ORDER BY id DESC");
$dataArtistas  = mysqli_query($con, $sqlArtistas);
?>

<h2 class="text-center bold mt-5 mb-5">VOTACIÓN</h2>

<ul class="flex-container">
<?php
 while ($rowArtista = mysqli_fetch_array($dataArtistas)) {
   $miCookiesvotoLike = "userLike".$rowArtista["id"];
   $miCookiesvotoDislike = "userDisLike".$rowArtista["id"];
?>
  <li class="flex-item">
    <img class="fotoPelicula" src="ivotos/<?php echo $rowArtista["url_foto"]; ?>" alt="">
	
	
  <p style="display: flex; justify-content: space-around;">

  <!--aplicando el operador ternario para agregar la clase checkenlike -->
  <span>
  <i class="far fa-thumbs-up iconVotoLike <?php echo isset($_COOKIE[$miCookiesvotoLike]) ? 'checkenlike' : '' ?>" id="like<?php echo $rowArtista["id"]; ?>" data-id="<?php echo $rowArtista["id"]; ?>"></i> 
    <span id="respuestaVotoLike<?php echo $rowArtista["id"]; ?>"> <?php echo $rowArtista["megusta"]; ?></span>
    <span style="color: red; display:none;" id="yavote<?php echo $rowArtista["id"]; ?>">Ya votaste</span>
  </span>

  <span>
  <i class="far fa-thumbs-down iconVotoDislike <?php echo isset($_COOKIE[$miCookiesvotoDislike]) ? 'checkenlike' : '' ?>" id="dislike<?php echo $rowArtista["id"]; ?>" data-id="<?php echo $rowArtista["id"]; ?>"></i>
    <span id="respuestaVotoDisLike<?php echo $rowArtista["id"]; ?>"> <?php echo $rowArtista["nomegusta"]; ?></span>
  </span>
  </p>
  </li>
<?php } ?>
</ul>


<script src="js/scriptVotos.js"></script>
</body>
</html>
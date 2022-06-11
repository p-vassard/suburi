<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');
?>

<!doctype html>
<html lang="fr">
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Trade+Winds&display=swap" rel="stylesheet">

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link href="./css/main.css" rel="stylesheet">
  <link href="./css/pulser.css" rel="stylesheet">
  <link href="./css/suburi.css" rel="stylesheet">
  <link href="./css/achievements.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"
          integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
          crossorigin="anonymous"></script>
</head>
<body class="bg-light">
<div class="container index bg-white">
  <div class="toast-container position-fixed" id="toaster"></div>
  <div class="row no-gutters">
    <?php include_once "navbar.php"; ?>
  </div>
  <div class="row no-gutters">
    <div class="col has-logo">
      <div class="logo-wrapper">
        <img src="assets/imgs/logoekv.png" class="img-responsive rounded mx-auto d-block" alt=""/>
      </div>
    </div>
  </div>
  <div id="home-text">
    <blockquote>
      <p>
        Le suburi (素振り, litt. « sabre nu, dépouillé ») est un exercice d'entrainement pratiqué dans des arts martiaux
        tel que le kendo ou l'aïkido. Il consiste à faire des coupes de sabre dans le vide. Cet exercice permet un
        travail technique (synchronisation des mouvements bras/jambe) ainsi que l'augmentation de la souplesse du dos et
        des épaules.
      </p>
      <p>
        On peut le pratiquer avec un bokken (ou bokkuto, sabre en bois), ou bien un suburibokken (ou suburito, qui est
        un bokken plus lourd) afin de faire travailler la souplesse et les muscles.
      </p>
    </blockquote>
  </div>
  <?php
  include_once "config.php";
  include_once "achievements.php";
  include_once "training.php";
  include_once "about.php";
  ?>
</div>

<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
        integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
        crossorigin="anonymous"></script>

<script src="script/display/Sound.js"></script>
<script src="script/controller/ControllerHelper.js"></script>
<script src="script/misc/Functions.js"></script>
<script src="script/controller/Controller.js" type="module"></script>
</body>
</html>
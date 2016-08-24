<?php include('../php/common.php') ?>

<link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/pure/0.6.0/grids-responsive-min.css">

<link href='https://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>

        <title>Local Weather Bot</title>
        <link rel="stylesheet" href="css/style.css">

  </head>

    <body id="bground">

<?php include('../php/header.php'); ?>

    <!--
  <nav class="navbar navbar-inverse navbar-default" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header">
       <a class="navbar-brand" href="http://www.aengushearne.com/">AH</a>

      </div>
      <div class="navbar-right"><p class="navbar-text">Local Weather Bot   <span class="glyphicon glyphicon glyphicon-cloud" aria-hidden="true"></span></p></div>
    </div>
  </nav>
    -->
    <div class="container-fluid">
  <div id="weatherNow" class="weather text-center well col-centered col-xs-offset-3 col-xs-6 col-md-offset-4 col-md-4">
    <p>
    <h5>Hi, I'm a weather bot. Please allow your browser to share your location so I can tell you about your local weather.</h5></p>
  </div>
  </div>

  <div class="container-fluid">
    <div id="forecast" class="row-centered">
      <div class="col-xs-offset-1"></div>
    </div>
</div>

  <footer>

  </footer>
</body>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

        <script src="js/key.js"></script>
        <script src="js/weather.js"></script>

</html>
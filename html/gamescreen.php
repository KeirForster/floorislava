<?php
    // Start the session
    session_start();
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>FloorIsLava</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- Custom styles for this template -->
    <link href="../css/gamescreen.css" rel="stylesheet">
    <!-- Google font -->
    <link href="https://fonts.googleapis.com/css?family=Unica+One" rel="stylesheet">
</head>

<body class="text-center">
    <div class="container-fluid">
        <header class="top-section">
            <div class="row no-gutters">
                <div class="col-12">
                    <h1 class="game-title">Floor is Lava</h1>
                    <?php
                        // print header info
                        echo "<code class='lead text-danger highscore-description'>High Score:
                                    <kbd class='text-warning'>" . $_SESSION['highscoreUsername'] . "</kbd>
                                    <span class='text-white'>" . $_SESSION['highscore'] . " seconds</span>
                                    </code>";
        
                        // username successfully retrieved
                        if (isset($_POST['username']))
                        {
                            echo "<code class='text-success lead'>Player:
                                    <kbd><span class='text-white'>" . $_POST["username"] . "</span></code></kbd>";
                        }
        
                        // no username found
                        else
                        {
                            echo "<code class='text-success lead'>Player:
                                    <kbd><span class='text-warning'>None</span></code></kbd>";
                        }
                    ?>
                </div>
            </div>
        </header>
        <main class="row">
            <div class="col-12 bottom-section">
                <canvas id="gameCanvas"></canvas>
            </div>
        </main>
    </div>
</body>
<!-- Bootstrap core JavaScript
    ================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="../../../../assets/js/vendor/jquery-slim.min.js"><\/script>')</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
</body>

</html>
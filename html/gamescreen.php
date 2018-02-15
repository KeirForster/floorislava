<?php
// Start the session
session_start();
require_once '../php/Utility.php';
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../img/volcano.png">
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
        <!-- title section -->
        <header class="top-section">
            <!-- game info -->
            <div class="row no-gutters">
                <div class="col-12">
                    <h1 class="game-title">Floor is Lava</h1>
                    <?php
                    // print header info
                    echo "<code class='lead text-success highscore-description'>High Score:
                                        <kbd class='text-warning'>" . $_SESSION['highscoreUsername'] . "</kbd>
                                        <span class='text-danger'>" . $_SESSION['highscore'] . " <span class='highscore-description-extra'>seconds</span></span>
                                        </code>";

                    // username successfully retrieved
                    if (isset($_POST['username']))
                    {
                        echo "<code class='text-primary lead player-description'>Player:
                                        <kbd class='player-username'>" . $_POST["username"] . "</kbd></code>";
                    }

                    // no username found
                    else
                    {
                        echo "<code class='text-success lead'>Player:
                                        <kbd><span class='text-warning'>None</span></kbd></code>";
                    }
                    ?>
                    <!-- player score -->
            <div class="row no-gutters player-score">
                <div class="col-12">
                    <code class="lead"><span class='text-white'><span id='player-time'></span> seconds</span></code>
                </div>
            </div>
                </div>
            </div>
            
        </header>
        <main class="row">
            <div class="col-12 bottom-section">
                <div id="gameElem" onmouseenter="startGame()" onmouseleave="endGame()" onmousemove="mousemove(event)"></div>
            </div>
        </main>
        <!-- Game over Modal -->
        <div class="modal fade" id="gameover-modal" tabindex="-1" role="dialog" aria-labelledby="gameover" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <h1 class="modal-title text-center text-dark">Game Over</h1>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <div class="container">
                            <form action="../index.php" method="POST">
                                <div class="row">
                                <button type="submit" id="quit" class="btn btn-secondary col-6 quit" data-dismiss="modal">Quit</button>
                                </div>
                            </form>
                            <form action="" method="POST">
                                <div class="row">
                                    <button type="submit" id="play-again" class="btn btn-danger col-6">Play again</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- start the game timer -->
    <script>
        var game = null;
        var timer = null;

        function startGame()
        {
            timer = new GS_Timing(document.getElementById('player-time'));
            timer.start();
            game = new GS_Game(document.getElementById('gameElem'), timer);
            game.start();
        }

        function endGame()
        {
            timer.stop();
            game.endGame();
        }

        function mousemove(event)
        {
            game.mousemove(event);
        }
    </script>
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
<!-- My scripts -->
<script src="../js/gamescreen.js"></script>
</body>

</html>
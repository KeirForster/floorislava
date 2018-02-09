<html>
<head>
    <meta charset="UTF-8">
    <title>FloorIsLava</title>

    <!--  Bootstrap styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <!-- Custom styles -->
    <link href="css/homepage.css" rel="stylesheet">
</head>

<body class="text-center">
<form class="form-signin" action="html/gamescreen.php" method="post">
    <h1 class="h3 mb-3 font-weight-normal">High Score:</h1>

    <!--  Get the highest score stored -->
    <?php
        $userInfo = getUserInfo();
        
        function getUserInfo()
        {
            $filename          = 'db/scores.txt';
            $fHandle           = fopen($filename, 'r'); // attempt to open the file
            $highestScoreFound = false;
            $userInfo          = null;
            
            // successfully opened file
            if ($fHandle)
            {
                // loop through file until end
                while (!feof($fHandle) && !$highestScoreFound)
                {
                    $buffer = fgets($fHandle); // get the next line
                    
                    // contains an entry
                    if ($buffer)
                    {
                        $userInfo          = explode(",", $buffer); // split string on ','
                        $highestScoreFound = true;
                    }
                }
                fclose($fHandle); // close the file
            }
            return $userInfo;
        }
        
        // a score has been successfully retrieved
        if ($userInfo)
        {
            $userName  = $userInfo[0]; // username
            $userScore = $userInfo[1]; // score
            echo "<h4>$userName</h4>";
            echo "<h4>$userScore</h4>";
        }
        
        // no score retrieved
        else
        {
            echo '0 seconds';
        }
    
    ?>

    <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
    <h1 class="h3 mb-3 font-weight-normal">Please enter your username</h1>
    <label for="username" class="sr-only">username</label>
    <input type="text" name="username" class="form-control" placeholder="username" required autofocus>
    <button class="btn btn-lg btn-primary btn-block" type="submit">Play</button>

    <p class="mt-5 mb-3 text-muted">&copy; CST Web and Mobile 2018</p>
</form>

<!--  bootstrap scripts  -->
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
</body>

</html>
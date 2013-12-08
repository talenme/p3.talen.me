<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<title>Lightning Math</title>
	
	<link rel="stylesheet" href="css/mathquiz.css" type="text/css">
    <link rel="stylesheet" type="text/css" href="js/pietimer.css">
	
</head>


<body>
    <div id='header'><img src="images/Lightning_Math_sm.jpg" alt="Lightning Math"></div>
    <br>
    <div id='wrapper'>
        <div id='instructions'>How many math problems can you solve in one minute? <button id="startButton">Start!</button></div>
	   <!-- Left side with all the controls -->
	   <div id='counters'>
            <div class="panel-body">
                <div id="preparation"></div>
            </div>
            <br>
            <div class="panel-body">
                <div id="results"></div>
            </div>
            <br>
            <div class="panel-body">
                <div id="countdown"></div>                    
            </div>
        </div>

        <div id='quizarea'>
            <div id="problems"></div>
            <br>
            <div id="answers">
            </div>
        </div>
        <br>
        
    </div>
    <br>
    <div id='readme'>About: This was an attempt to build an application that was timer based. I put together a math quiz for my 7
        year old daughter to use. It is using a countdown timer that I found in the JQuery plugin library.<br>
        There is a known issue with the start button - it does not disable during the SECOND countdown timer. I could not figure 
        out why, and I tried various things to fix it. I could have just removed it, but decided to keep it in. You can click it 
        multiple times and see the countdown kick off repeatedly until the timer clock starts up.
        <br><br>
        Updates added after the deadline:<br>
        After showing to my daughter, she wanted to personalize it with her own hand-drawn title.
    </div>

    <audio id="boing" src="wav/boing_y.wav" preload="auto"></audio>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>

    <script type="text/javascript" src="js/jquery.pietimer.js"></script>

    <script type="text/javascript" src="js/mathquiz.js"></script>
    
</body>

</html>
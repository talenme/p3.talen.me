/*-------------------------------------------------------------------------------------------------
Greg Misicko December 2013
These scripts support the math quiz "game"
-------------------------------------------------------------------------------------------------*/

// How much time in seconds the quiz will last
var timeLimit = 60;
// How many seconds for the countdown starter timer
var countLimit = 5;

// Is the quiz active now?
var timerActive = false;

// global var for the math answer
var answer = 0;
// Need these for matching double digit answers
var tens = 0;
var ones = 0;

// This is used to track which digit of the answer is currently being entered
var first = true;

// Score counter
var score = 0;
// Mistakes counter
var misses = 0;

// This function watches for the button click. Since there is only one button on the page
// I don't bother to verify which button was clicked.
$('button').click(function() {

	// try to disable the start button so it can't be hit multiple times
	document.getElementById('startButton').disabled = true;

	//reset scores
	score = 0;
	misses = 0;
	
	document.getElementById('results').innerHTML = "";

	// add one so that the global setting can be literal
	var cnt = countLimit + 1;

	// Do the countdown, and then launch the timer
	var timer = window.setInterval(function(){
    	cnt--;
    	document.getElementById('problems').innerHTML = cnt;
    	if (cnt == 0) {
       		window.clearInterval(timer);
       		document.getElementById('preparation').innerHTML = "GO!";
       		timerActive = true;
       		quiz();

        	$('#countdown').pietimer({
          		timerSeconds: timeLimit,
          		color: '#234',
          		fill: false,
          		showPercentage: true,
          		callback: function() {
             		$('#countdown').pietimer('reset');
              		document.getElementById('countdown').innerHTML = "";
              		document.getElementById('startButton').disabled = false;
             		document.getElementById('answers').innerHTML = "";
            	}

        	}); 
        		  
			$('#countdown').pietimer('start');

			// Cannot understand why this does not work in FF...
			//document.getElementById('answers').focus();
			
			// This is what I found that will KEEP focus on the page, which kept getting lost
			// in FF, requiring you to mouseclick on the page after the timer started.
			// The problem is that it makes the url look funny.
			window.location.hash = '#answers';
    	}
	}, 1000);

	// I struggled to figure out a way to get the timing in this code to work so that operations would 
	// appear to run in sequence. Not sure if this was the best approach, but I set a delay here in order
	// to prevent the results from displaying before the timer had run out.
	setTimeout(function() {
    	showResults();
    	document.getElementById('preparation').innerHTML = "";
  	}, ((timeLimit+countLimit+1)*1000));

	//document.getElementById("answers").focus();
});

function showResults() {
	document.getElementById('problems').innerHTML = "";
	document.getElementById('results').innerHTML = "TIMES UP! You got <b>" + score + "</b> correct "
		+ " and <b>" + misses + "</b> wrong";
	timerActive = false;
};

function gotItRight() {
	document.getElementById('answers').innerHTML = "";
	score++;
    document.getElementById('preparation').innerHTML = "CORRECT!";
    quiz();
};

function gotItWrong() {
	document.getElementById('boing').play();
	document.getElementById('answers').innerHTML = "";
	misses++;
    document.getElementById('preparation').innerHTML = "wrong!";
   	quiz();
};

function quiz() {
	// Random numbers for the quiz. I know it looks silly to add zero, but I kept that
	// there as a reminder on how to set the numeric range.
	// One caveat here is that the sum cannot exceed double digits or the evaulation
	// piece of the code will fail
	var numberOne = (Math.floor(Math.random() * 20) + 0);
	var numberTwo = (Math.floor(Math.random() * 20) + 0);

	answer = numberOne + numberTwo;

	// Break out the digits of the answer. I found multiple ways of doing this with
	// substrings, but prefered to use mathematical approach.
	tens = Math.floor(answer / (Math.pow(10, 1)) % 10);
	ones = (answer/(Math.pow(10,0))%10);

	document.getElementById('problems').innerHTML = numberOne + "+" + numberTwo;
};

// Since this is a speed test, I don't require the user to enter data into a form
// and hit enter. Every key stroke is immediately counted.
window.onkeypress = function(event) {
		var entryValue = event.charCode;
		var transformValue = entryValue - 48;
    	
    	if (timerActive && (transformValue >= 0 || transformValue <= 9)) {
    		if (first){
    			document.getElementById('answers').innerHTML = transformValue;
    		}
    		else {
    			// maintain the double digit number using jQuery, although you'll
    			// never actually see it since it gets cleared immediately
    			$('#answers').append(transformValue);
    		}

    		if (answer < 10) {
    			if (transformValue == answer){
    				gotItRight();
   				}
    			else {
    				gotItWrong();
   				}
    		}
    		// double digit answer handling
    		else {
   				if (first) {
    				if (transformValue == tens){
    					// good so far
    					first = false;
    				}
   					else {
    					// they blew it
    					gotItWrong();
    				}
   				}
    			else {
    				if (transformValue == ones) {
    					// they got it right
    					gotItRight();
    				}
    				else {
    					// darn it
    					gotItWrong();
    				}
    				first = true;
    			}
    		}
    	}
}
$('button').click(function() {

	// What button was just clicked?
	var value = $(this).html();

	var message = "fuck yes";
	
	// If they clicked equal, time to do the equation...
	if(value == "Start") {
	
	$('#preview').html(message);
		$(".start").click(function(){
                    $('#timer').pietimer('start');
                });
	}
});
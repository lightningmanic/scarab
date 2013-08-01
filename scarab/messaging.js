/***********************************************************************
 * This file contains functions for sending messages to the message
 * board.  The message board is a list of messages shown throughout the
 * game - each message has a "life" of highlighted attributes.  After
 * so many seconds (defined as a CONSTANT in this file), the message's
 * highlighted feature fades to normal text.
 * This file has one main function to send messages to the message board,
 * which handles everything needed.
 * ********************************************************************/
 
 // how long should a message stay highlighted? (in seconds)
 var HIGHLIGHTED_LIFE = 2;
 
 // how many seconds should the transition (fading) take?
 var TRANSITION = 1;
 
 function AddMessage(text)
 {
	 // create a new div to place into our "inventory_description" list.
	 var message = document.createElement("div");
	 $(message).html(text);
	 $(message).attr('class', 'new_message');
	 
	 // add this message to our inventory description!
	 $('#inventory_description').append(message);
	 
	 // scroll to the bottom!
	 var elem = document.getElementById('inventory_description');
     elem.scrollTop = elem.scrollHeight;
	 
	 setTimeout(function(){
		 $(message).toggleClass('old_message', TRANSITION*1000);
	 }, (HIGHLIGHTED_LIFE*1000));
 }

/***********************************************************************
 * Resets the message box to hold nothing - called on the start of each
 * level.
 * ********************************************************************/
function ResetMessages()
{
	// simply empty the message board!
	$('#inventory_description').empty();
}

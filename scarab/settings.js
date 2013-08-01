var grab_keystroke = '';

/***********************************************************************
 * Master Movement key commands
 * These are used in the "movement.js" file for keymapping
 * ********************************************************************/
var forward = 38;
var backward = 40;
var left = 37;
var right = 39;

var drop = 68;
var pickup = 80;
var map = 77;
var use_item = 85;
var level_key = 76;

var speed_max = 10;
var speed_min = 1;
var speed = 5;

function FillSettings()
{
	// HTML to add
	var HTML = '';
	
	// setup movement DIVs
	HTML += '<div class="movement_label">Movement</div>';
	HTML += '<div id="input_forward" class="input_forward" title="Move Forward: '+GrabHTMLofKey(forward)+'"><img src="images/forward.png" style="width: 26px; height: 26px;" /></div>';
	HTML += '<div id="input_backward" class="input_backward" title="Move Backward: '+GrabHTMLofKey(backward)+'"><img src="images/backward.png" style="width: 26px; height: 26px;" /></div>';
	HTML += '<div id="input_left" class="input_left" title="Turn Left: '+GrabHTMLofKey(left)+'"><img src="images/left_turn.png" style="width: 26px; height: 26px;" /></div>';
	HTML += '<div id="input_right" class="input_right" title="Turn Right: '+GrabHTMLofKey(right)+'"><img src="images/right_turn.png" style="width: 26px; height: 26px;" /></div>';
	
	// setup actions DIVs
	HTML += '<div class="action_label">Actions</div>';
	HTML += '<div id="input_drop" class="input_drop" title="Drop Item: '+GrabHTMLofKey(drop)+'"><img src="images/drop_icon.png" style="width: 40px; height: 40px;" /></div>';
	HTML += '<div id="input_pickup" class="input_pickup" title="Pickup Item: '+GrabHTMLofKey(pickup)+'"><img src="images/pickup_icon.png" style="width: 40px; height: 40px;" /></div>';
	HTML += '<div id="input_map" class="input_map" title="Toggle Map: '+GrabHTMLofKey(map)+'"><img src="images/map_icon.png" style="width: 40px; height: 40px;" /></div>';
	HTML += '<div id="input_use" class="input_use" title="Use Item: '+GrabHTMLofKey(use_item)+'"><img src="images/use_icon.png" style="width: 40px; height: 40px;" /></div>';
	
	// setup speed DIVs
	HTML += '<div class="speed_label">Game Speed</div>';
	HTML += '<div id="speed_bar" class="speed_bar" title="Speed of AI"></div><span id="speed_display" class="speed_display">'+speed+'</span>';
	
	$("#settings_panel").html(HTML);
	
	$("#input_forward").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'forward';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});

	$("#input_backward").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'backward';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});
	
	$("#input_left").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'left';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});
	
	$("#input_right").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'right';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});
	
	$("#input_drop").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'drop';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});
	
	$("#input_pickup").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'pickup';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});
	
	$("#input_map").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'map';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});
	
	$("#input_use").click(function(){
		if(grab_keystroke == '')
			grab_keystroke = 'use';
		else
			grab_keystroke = '';
			
		$(this).toggleClass("grab_keystroke");
	});
	
	// setup the game speed slider
	$("#speed_bar").slider({
		max: speed_max,
		min: speed_min,
		value: speed,
		step: 1,
		animate: true,
		slide: function(event, ui){
			document.getElementById('speed_display').innerHTML = ui.value;
			speed = ui.value;
			SaveKey(speed, "speed");
		}
		});

}

function AssignKey(event)
{
	switch(grab_keystroke)
	{
		case 'forward':
			$("#input_forward").toggleClass("grab_keystroke");
			grab_keystroke = '';
			if(forward == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			forward = event.keyCode;
			SaveKey(forward, "forward");
			$("#input_forward").attr("title", 'Move Forward: '+GrabHTMLofKey(forward));
			break;
		case 'backward':
			grab_keystroke = '';
			$("#input_backward").toggleClass("grab_keystroke");
			if(backward == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			backward = event.keyCode;
			SaveKey(backward, "backward");
			$("#input_backward").attr("title", 'Move Backward: '+GrabHTMLofKey(backward));
			break;
		case 'left':
			grab_keystroke = '';
			$("#input_left").toggleClass("grab_keystroke");
			if(left == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			left = event.keyCode;
			SaveKey(left, "left");
			$("#input_left").attr("title", 'Turn Left: '+GrabHTMLofKey(left));
			break;
		case 'right':
			grab_keystroke = '';
			$("#input_right").toggleClass("grab_keystroke");
			if(right == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			right = event.keyCode;
			SaveKey(right, "right");
			$("#input_right").attr("title", 'Turn Right: '+GrabHTMLofKey(right));
			break;
		case 'drop':
			grab_keystroke = '';
			$("#input_drop").toggleClass("grab_keystroke");
			if(drop == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			drop = event.keyCode;
			SaveKey(drop, "drop");
			$("#input_drop").attr("title", 'Drop Item: '+GrabHTMLofKey(drop));
			break;
		case 'pickup':
			grab_keystroke = '';
			$("#input_pickup").toggleClass("grab_keystroke");
			if(pickup == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			pickup = event.keyCode;
			SaveKey(pickup, "pickup");
			$("#input_pickup").attr("title", 'Pickup Item: '+GrabHTMLofKey(pickup));
			break;
		case 'map':
			grab_keystroke = '';
			$("#input_map").toggleClass("grab_keystroke");
			if(map == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			map = event.keyCode;
			SaveKey(map, "map");
			$("#input_map").attr("title", 'Toggle Map: '+GrabHTMLofKey(map));
			break;
		case 'use':
			grab_keystroke = '';
			$("#input_use").toggleClass("grab_keystroke");
			if(use_item == event.keyCode)
				return;
			if(ConflictKey(event.keyCode))
				return;
			use_item = event.keyCode;
			SaveKey(use_item, "use_item");
			$("#input_use").attr("title", 'Use Item: '+GrabHTMLofKey(use_item));
			break;
	}
}

// Simply saves the keycode to "sor_"+action name ("sor_up", "sor_use", etc.)
function SaveKey(keycode, action)
{
	localStorage.setItem('sor_'+action, keycode);
}

// Simply grabs the action from the local storage and returns the value
function LoadKey(action)
{
	return parseInt(localStorage.getItem('sor_'+action));
}

// runs through all stored keystrokes and returns true if a conflict exists
function ConflictKey(value)
{
	if(value == forward)
	{
		alert('That key is already assigned to "Move Forward".');
		return true;
	}
	if(value == backward)
	{
		alert('That key is already assigned to "Move Backward".');
		return true;
	}
	if(value == left)
	{
		alert('That key is already assigned to "Turn Left".');
		return true;
	}
	if(value == right)
	{
		alert('That key is already assigned to "Turn Right".');
		return true;
	}
	if(value == drop)
	{
		alert('That key is already assigned to "Drop Item".');
		return true;
	}
	if(value == pickup)
	{
		alert('That key is already assigned to "Pickup Item".');
		return true;
	}
	if(value == map)
	{
		alert('That key is already assigned to "Toggle Map".');
		return true;
	}
	if(value == use_item)
	{
		alert('That key is already assigned to "Use Item".');
		return true;
	}
	return false;
}

// function to be called upon page load - checks local storage for all keystrokes and game speed
// and loads them if found
function LoadKeyStrokes()
{
	// for each possible keystroke, check local storage and load if possible
	var key = LoadKey('forward');
	if(key != NaN && String(key) != 'NaN')
		forward = key;
		
	key = LoadKey('backward');
	if(key != NaN && String(key) != 'NaN')
		backward = key;
		
	key = LoadKey('left');
	if(key != NaN && String(key) != 'NaN')
		left = key;
		
	key = LoadKey('right');
	if(key != NaN && String(key) != 'NaN')
		right = key;
		
	key = LoadKey('drop');
	if(key != NaN && String(key) != 'NaN')
		drop = key;
		
	key = LoadKey('pickup');
	if(key != NaN && String(key) != 'NaN')
		pickup = key;
		
	key = LoadKey('map');
	if(key != NaN && String(key) != 'NaN')
		map = key;
		
	key = LoadKey('use_item');
	if(key != NaN && String(key) != 'NaN')
		use_item = key;
		
	key = LoadKey('speed');
	if(key != NaN && String(key) != 'NaN')
		speed = key;
}

function GrabHTMLofKey(keycode)
{
	switch(keycode)
	{
		case 38:
			return 'Up';
			break;
		case 40:
			return 'Down';
			break;
		case 37:
			return 'Left';
			break;
		case 39:
			return 'Right';
			break;
		default:
			return String.fromCharCode(keycode);
			break;
	}
}

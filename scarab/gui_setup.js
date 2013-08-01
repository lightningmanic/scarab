var compass_paper;

var COMPASS_IMAGE; // = "images/compass.png";
var COMPASS_NEEDLE; // = "images/compass_needle.png";

// Image object of the needle
var NEEDLE;

var ANGLE = 90;


// Status Bars (health, hunger, weight)
var HealthBar;
var HungerBar;
var WeightBar;



// This function is called as soon as the page is loaded.
// It's responsible for setting up each individual "window" section:
//  - Menu bar
//  - Movement
//  - News
//  - Compass
//  - Inventory
//  - Status
function SetupDivs()
{
	// position the view div
	document.getElementById('view').style.position = 'absolute';
	document.getElementById('view').style.left = ((window.innerWidth / 2) - 302) + 'px';
	
	// position the view map and compass divs
	document.getElementById('view_map_button').style.position = 'absolute';
	document.getElementById('view_map_button').style.left = ((window.innerWidth / 2) - 392) + 'px';
	document.getElementById('view_map_button').style.top = '40px';
	
	document.getElementById('compass').style.position = 'absolute';
	document.getElementById('compass').style.left = ((window.innerWidth / 2) - 402) + 'px';
	document.getElementById('compass').style.top = '80px';
	
	// setup the movement buttons
	// Forward
	var forward_button = document.createElement("button");
	$(forward_button).html('&uarr;');
	forward_button.className = 'forward_button';
	$(forward_button).click(function(){
		MoveForward();
	});
	$('#movement_controls').append(forward_button);
	
	// Left
	var left_button = document.createElement("button");
	$(left_button).html('&larr;');
	left_button.className = 'left_button';
	$(left_button).click(function(){
		LeftTurn();
	});
	$('#movement_controls').append(left_button);
	
	// Backward
	var backward_button = document.createElement("button");
	$(backward_button).html('&darr;');
	backward_button.className = 'back_button';
	$(backward_button).click(function(){
		MoveBackward();
	});
	$('#movement_controls').append(backward_button);
	
	// Right
	var right_button = document.createElement("button");
	$(right_button).html('&rarr;');
	right_button.className = 'right_button';
	$(right_button).click(function(){
		RightTurn();
	});
	$('#movement_controls').append(right_button);
	
	// position the map view div
	document.getElementById('map_view').style.position = 'absolute';
	document.getElementById('map_view').style.left = ((window.innerWidth / 2) - 302) + 'px';
	document.getElementById('map_view').style.display = 'none';
	document.getElementById('map_view').style.backgroundColor = '#FFF';
	
	// position the fire defense div
	document.getElementById('fire_defense').style.position = 'absolute';
	document.getElementById('fire_defense').style.left = ((window.innerWidth / 2) - 302) + 'px';
	document.getElementById('fire_defense').style.display = 'transparent';
	document.getElementById('fire_defense').style.backgroundColor = 'transparent';
	
	// position the inventory div
	document.getElementById('inventory').style.position = 'absolute';
	document.getElementById('inventory').style.display = 'block';
	document.getElementById('inventory').style.backgroundColor = '#111';
	document.getElementById('inventory').style.color = '#FFF';


	document.getElementById('inventory').style.left = ((window.innerWidth / 2) + 312) + 'px';
	document.getElementById('inventory').style.width = '170px';
	document.getElementById('inventory').style.top = '30px';
	document.getElementById('inventory').style.border = '1px solid transparent';
	document.getElementById('inventory').style.overflow = 'none';
	document.getElementById('inventory').innerHTML = '<span style="text-align: center; width: 100%; display: inline-block;">Inventory</span><hr /><select id="inventory_list" class="inventory_list"></select>';

	// position the USE button
	document.getElementById('use_button').style.left = ((window.innerWidth / 2) + 312) + 'px';
	document.getElementById('use_button').style.top = '430px';
	
	// position the DROP button
	document.getElementById('drop_button').style.left = ((window.innerWidth / 2) + 362) + 'px';
	document.getElementById('drop_button').style.top = '430px';
	
	// position the PICKUP button
	document.getElementById('pickup_button').style.left = ((window.innerWidth / 2) + 420) + 'px';
	document.getElementById('pickup_button').style.top = '430px';
	
	// position the SAVE button
	document.getElementById('save_button').style.position = 'absolute';
	document.getElementById('save_button').style.left = ((window.innerWidth / 2) - 500) + 'px';
	document.getElementById('save_button').style.top = '400px';
	
	// position the UPDATE button
	document.getElementById('update_button').style.position = 'absolute';
	document.getElementById('update_button').style.left = ((window.innerWidth / 2) - 410) + 'px';
	document.getElementById('update_button').style.top = '400px';
	
	// position the LOAD button
	document.getElementById('load_button').style.position = 'absolute';
	document.getElementById('load_button').style.left = ((window.innerWidth / 2) - 500) + 'px';
	document.getElementById('load_button').style.top = '425px';
	
	// check the local storage to see if we have a save game we can load
	if(localStorage.getItem("scarab_of_ra_save"))
		document.getElementById('load_button').disabled = '';
	
	// position the inventory description div
	document.getElementById('inventory_description').style.position = 'absolute';
	document.getElementById('inventory_description').style.left = ((window.innerWidth / 2) + 312) + 'px';
	document.getElementById('inventory_description').style.width = '200px';
	document.getElementById('inventory_description').style.display = 'block';
	document.getElementById('inventory_description').style.top = '250px';
	document.getElementById('inventory_description').style.border = '3px double black';
	
	// attack items div
	document.getElementById('attack_items').style.position = 'absolute';
	document.getElementById('attack_items').style.left = ((window.innerWidth / 2) + 312) + 'px';
	$('#attack_items').html('<span style="text-align: center; color: white; width: 100%; display: block;">Attack Items</span><hr /><div id="attack_icons"></div>');
	// setup the attack icons
	SetupAttackIcons();
	
	// status window
	document.getElementById('status_window').style.left = ((window.innerWidth / 2) - 502) + 'px';
	document.getElementById('status_window').style.width = '185px';
	document.getElementById('status_window').innerHTML = '<span style="text-align: left; width: 100%; display: inline-block;">Status</span><hr /><div id="status" class="status">Health: <div id="health" class="health"></div><br /><br />Hunger: <div id="hunger" class="hunger"></div><br /><br />Weight: <div id="weight" class="weight"></div><br /><br />Prestige: <div id="prestige_points" class="prestige_points"></div><br /><br />Education: <div id="education" class="prestige_points"></div><br /><br />Condition: <div id="health_status" class="prestige_points"></div></div>';
	
	// create a new health bar
	HealthBar = new ProgressBar(document.getElementById('health'));
	HealthBar.percentage = roundNumber((health / 100), 2);
	HealthBar.update();
	
	// create a new hunger bar
	HungerBar = new ProgressBar(document.getElementById('hunger'));
	HungerBar.percentage = roundNumber((hunger / MAX_HUNGER), 2);
	HungerBar.invert_color = true;
	HungerBar.update();
	
	// create a new weight bar
	WeightBar = new ProgressBar(document.getElementById('weight'));	
	WeightBar.percentage = WeightPercentage();
	WeightBar.invert_color = true;
	WeightBar.update();
	
	// set the prestige points
	document.getElementById('prestige_points').innerHTML = points;
	
	// set the education level
	document.getElementById('education').innerHTML = GetEducation();
	
	// set the health status
	document.getElementById('health_status').innerHTML = health_status;
	
	// set the mouse-over event handler for the settings panel
	$("#open_settings").click(function(){
		$(this).toggleClass("open_settings_open");
		
		// toggle the settings_panel bool
		settings_panel = !settings_panel;
		
		if($(this).attr('class').indexOf('open_settings_open') < 0)
		{
			$(this).html('&uarr;');
			$("#settings_panel").html('');
		}
		else
		{
			$(this).html('&darr;');
			FillSettings();
		}
		$("#settings_panel").toggleClass("settings_panel_expanded");
	});	
	
	// setup a double-click for any item
	document.getElementById('inventory_list').ondblclick = function(){
		// call the "use" function for this object
		users_inventory[this.selectedIndex].use();
		// update the weight!
		WeightBar.percentage = WeightPercentage();
		WeightBar.update();
	};
	
	document.getElementById('inventory_list').onclick = function(){
		UpdateDescription();
	};
	
}

// is the settings dialog open?
var settings_panel = false;

// This function is called whenever the user presses a movement key.
// It simply updates the description of the selected item in their inventory
// (helpful for watching the oil level in your lamp)
function UpdateDescription()
{
	// first get the selected index
	var index = document.getElementById('inventory_list').selectedIndex;
	
	// if it's -1, clear the description
	if(index >= 0)
		AddMessage(users_inventory[index].getDescription());
}


// Draws the movement box
// It contains a title "Movement"
// and the following 10 buttons:
//  Look left, look behind, Look right
//  Turn left, move forward, turn right
//  Null Button, turn around, backup, Pick Up
function Movement()
{
    
}


// This function sets up the "News" window.
// It has a title and a scrolling DIV of news
function News()
{
    
}

// This function sets up the compass on the screen below the main view-port
function Compass()
{
    // setup a paper to draw compass stuff on
    compass_paper = Raphael(document.getElementById('compass'), 80, 80);
    
    // show the background (static) of the compass
    compass_paper.image(COMPASS_IMAGE.src, 0, 0, 80, 80);
    
    // Call to update the compass's pointer thingy
    UpdateCompass();
}



function FurtherSetup()
{
	document.getElementById('view').innerHTML = '';
	
	
    Compass();
    
    
	
   // Setup items for this level
   SetupItems();
   
   // Setup NPCs
   SetupNPCs();
   
   // update the inventory list
   UpdateInventoryList();
	
	LoadMaze();
	
	// setup a bank (if it decides to itself...)
	// we do this AFTER the maze is generated since it depends on cell information
	// for the maze...
    SetupBank();
	
	StartMaze();
}

function Clear()
{
	// clear out all of the divs to setup for a new maze
	document.getElementById('compass').innerHTML = '';
	document.getElementById('needle').innerHTML = '';
	compass_paper = null;
	
	NEEDLE = null;
	ANGLE = 90;
	
	scarab_activated = false;
	
	map_filled = false;
	
	wet_map = false;
	
	document.getElementById('view').innerHTML = '';
	ResetView();
	
	// reset the level's item list
	level_items = new Array();
	
	// reset the level's trap list
	traps = [];
	
	// current locations
	Current_Location = new Array(ENTRANCE_X, ENTRANCE_Y);

	// set direction
	// DIRECTIONS:
	//  0: North
	//  1: East
	//  2: South
	//  3: West
	Current_Direction = 1;

	// main canvas to draw in
	paper = null;
	
	// clear the messages
	ResetMessages();
}

function NextLevel()
{
	// check if they've won
	if(PlayerWins())
	{
		return;
	}
	
	// clear everything first
	Clear();
	
	// Reset the maze values (including the exit's location AFTER our width/height are updated!!)
	ResetValues();
	
	// increase our maze's dimensions
	WIDTH++;
	HEIGHT++;
	
	// increase our level number
	current_level++;
	
	AddMessage("The door slowly creaks open...and slams itself shut behind you!");
	
	FurtherSetup();
}

function LoadImages()
{	
	// setup the DIV boxes
	SetupDivs();
	
	document.getElementById('view').innerHTML = '<br><br><div style="text-align: center;">Loading...<br><img src="images/ajax-loader.gif"></div>';
	
	$.ajax({
		url: "#",
		success: function(){
			// compass
			COMPASS_IMAGE = new Image; 
			COMPASS_IMAGE.src = "images/compass.png";
			
			COMPASS_NEEDLE = new Image;
			COMPASS_NEEDLE.src = "images/compass_needle.png";
			
			// no light
			NO_LIGHT = new Image;
			NO_LIGHT.src = 'images/no_light.png';
			
			// the distance image
			DISTANT_FOG = new Image();
			DISTANT_FOG.src = "images/distance.png";
			
			// doors (entrance)
			ENTRANCE_DOOR = new Image();
			ENTRANCE_DOOR.src = "images/entrance_door_space.png";
			ENTRANCE_LEFT = new Image();
			ENTRANCE_LEFT.src = "images/entrance_door_left_space.png";
			ENTRANCE_RIGHT = new Image();
			ENTRANCE_RIGHT.src = "images/entrance_door_right_space.png";
			
			// doors (exit)
			EXIT_DOOR = new Image();
			EXIT_DOOR.src = "images/exit_door_space.png";
			EXIT_LEFT = new Image();
			EXIT_LEFT.src = "images/exit_door_left_space.png";
			EXIT_RIGHT = new Image();
			EXIT_RIGHT.src = "images/exit_door_right_space.png";
			
			// Items
			SCARAB_IMAGE = new Image();
			SCARAB_IMAGE.src = 'images/scarab.png';
			
			STAFF_IMAGE = new Image();
			STAFF_IMAGE.src = 'images/staff_space.png';
			
			CROWN_IMAGE = new Image();
			CROWN_IMAGE.src = 'images/crown_space.png';
			
			ANTI_IMAGE = new Image();
			ANTI_IMAGE.src = 'images/antipoison_space.png';
			
			FOOD_IMAGE = new Image(); 
			FOOD_IMAGE.src = 'images/objects/food.png';
			
			KEY_IMAGE = new Image(); 
			KEY_IMAGE.src = 'images/objects/key.png';
			
			LAMP_IMAGE = new Image(); 
			LAMP_IMAGE.src = 'images/objects/lamp.png';
			
			OIL_IMAGE = new Image(); 
			OIL_IMAGE.src = 'images/objects/oil_can.png';
			
			GOLD_IMAGE = new Image();
			GOLD_IMAGE.src = 'images/gold_space.png';
			
			POLE_IMAGE = new Image();
			POLE_IMAGE.src = 'images/pole_space.png';
			
			DGUN_IMAGE = new Image();
			DGUN_IMAGE.src = 'images/dartgun_space.png';
			
			DARTS_IMAGE = new Image();
			DARTS_IMAGE.src = 'images/darts_space.png';
			
			SPRAY_IMAGE = new Image();
			SPRAY_IMAGE.src = 'images/bugspray_space.png';
			
			FAK_IMAGE = new Image();
			FAK_IMAGE.src = 'images/firstaidkit_space.png';
			
			// Traps
			TRAP_IMAGE = new Image();
			TRAP_IMAGE.src = 'images/trap_set.png';
			
			TRAP_SPRUNG_IMAGE = new Image();
			TRAP_SPRUNG_IMAGE.src = 'images/trap_sprung.png';
			
			GOLD_TRAP_IMAGE = new Image();
			GOLD_TRAP_IMAGE.src = 'images/gold_hole.png';
			
			// now do all of the hieroglyphics (bank of ra...)
			LoadHieroglyphicImages();
			
			// now do all of the NPC images...
			LoadNPCImages();
			
			InitDefaultItems();
			
			
			AddMessage("Welcome to the Great Pyramid of RA!");
			
			FurtherSetup();
		},
	error: function(){
			document.getElementById('view').innerHTML = 'Oh no!  For some reason, we could not load all of the images required for game play.<br>Please check your internet connection, and refresh the page.';
		}
	});
}

/***********************************************************************
 * Checks to see if the player has all three of the ancient relics of
 * Ra: 
 * 	- at least one scarab
 * 	- the crown of Ra
 * 	- the staff of Ra
 * 
 * If they have, then they win the game!
 * If not, return false...
 * ********************************************************************/
function PlayerWins()
{
	// run through the inventory checking for each item
	var scarab = false, staff = false, crown = false;
	for(var i = 0; i < users_inventory.length; i++)
	{
		switch(users_inventory[i].name)
		{
			case SCARAB_NAME:
				scarab = true;
				break;
			case STAFF_NAME:
				staff = true;
				break;
			case CROWN_NAME:
				crown = true;
				break;
		}
	}
	
	// if they have all three, return true!
	if(scarab && staff && crown)
	{
	    // set the map to white
	    document.getElementById('map_view').innerHTML = '';
	    document.getElementById('map_view').style.display = 'block';
		
		alert("The blinding sun comes shining through the cracks of the door...");
		// clear everything first
	    Clear();
	    
	    // now show their stats
	    var HTML = '<div style="text-align: center"><br /><br /><span style="font-size: x-large; font-family: Arial;">Winner!</span><hr style="width: 80%;" />';
	    
	    HTML += '<div style="width: 80%; margin-left: auto; margin-right: auto;">';
	    
	    // show their points and education
	    HTML += 'You have made it through the Great Pyramid of Ra!  You emerged from the pyramid with your '+GetEducation()+' and '+points+' prestige points.';
	    
		// show details
		HTML += '<br /><br />You traversed through '+current_level+' levels of the Great Pyramid holding ';	
		if(users_inventory.length == 0)
			HTML += 'nothing!';
		for(var i = 0; i < users_inventory.length; i++)
		{
			HTML += users_inventory[i].getFind();
			
			if(i < users_inventory.length - 1)
				HTML += ', ';
			else
				HTML += '!';
			if(i == users_inventory.length - 2)
				HTML += 'and ';
		}
		
		HTML += '<br /><br /><img src="'+CROWN_IMAGE.src+'" />';
	    
	    HTML += '</div>';
	    
	    
	    HTML += '</div>';
	    
	    document.getElementById('view').innerHTML = HTML;

	    $(".map_view").toggleClass("map_view_reveal");	    
		return true;
	}
	return false;
}


/***********************************************************************
 * Called when the player loses the game.
 * ********************************************************************/
function GameOver()
{	
	// clear everything first
	Clear();
	
	// now show their stats
	var HTML = '<div style="text-align: center"><br /><br /><span style="font-size: x-large; font-family: Arial;">Game Over!</span><hr style="width: 80%;" />';
	
	HTML += '<div style="width: 80%; margin-left: auto; margin-right: auto;">';
	
	// show their points and education
	HTML += 'You have died in the Great Pyramid of Ra!  You are laid to rest with your '+GetEducation()+' and '+points+' prestige points.';
	
	// show details
	HTML += '<br /><br />You perished in the '+GetLevelEnglish(current_level)+' level of the Great Pyramid holding ';
	if(users_inventory.length == 0)
		HTML += 'nothing!';
	for(var i = 0; i < users_inventory.length; i++)
	{
		HTML += users_inventory[i].getFind();
		
		if(i < users_inventory.length - 1)
			HTML += ', ';
		else
			HTML += '!';
		if(i == users_inventory.length - 2)
			HTML += 'and ';
	}
	
	HTML += '<br /><br /><img src="'+CROWN_IMAGE.src+'" />';
	
	HTML += '</div>';
	
	
	HTML += '</div>';
	
	document.getElementById('view').innerHTML = HTML;	    
	
	$(".map_view").toggleClass("map_view_reveal");
}

function GetLevelEnglish(number)
{
	if(number >= 10 && number <= 19)
		return number + 'th';
		
	number = String(number);
	switch(number[number.length -1])
	{
		case '1':
			return number + 'st';
			break;
		case '2':
			return number + 'nd';
			break;
		case '3':
			return number + 'rd';
			break;
		case '4':
			return number + 'rth';
			break;
		default:
			return number + 'th';
	}
}

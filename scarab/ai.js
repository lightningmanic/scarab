/***********************************************************************
 * AI.js
 * David Pettifor, Dec 2012
 * This file defines a general NPC character with built-in AI.
 * It includes an NPC class which contains:
 * 	- Image
 * 	- Name
 * 	- Current location
 * 	- Brain (function which determines movement)
 * 	- Attack action (defined in characters.js)
 * ********************************************************************/
 
function NPC()
{
	 // setup a "blank slate" Non-Playable-Character (NPC)
	 this.images = new Array();
	 
	 // setup a matching map for the image
	 this.maps = new Array();
	 
	 // name of the character
	 this.name = '';
	 
	 // current location of the NPC in the maze
	 this.location_x = 0;
	 this.location_y = 0;
	 
	 // function linking to specific character's attack function
	 this.attack;
	 
	 // chances that the NPC will attack
	 this.attack_rate = 1;
	 
	 // some NPC's may hold items...
	 this.held_item = '';
	 
	 // some NPC's may do things while away from the player...
	 this.movement_action;
	 
	 // this is a boolean that is set to true when the character is drawn,
	 // and false otherwise
	 this.seeme = false;
	 
	 // this is a function that will change based on how far the user is from
	 // the character, and which character is drawn.
	 // if the user clicks relatively close to the NPC, it will return true
	 this.hitme;
	 
	 // this is a function that will be called when the user successfully hits
	 // the target with one of their defense items.
	 // depending on the item and the target, the effects will vary
	 this.hit;
	 
	 // current count of how many steps they have taken
	 // this cannot exceed the game speed
	 // attacking counts as a step
	 this.step_count = 0;
	 
	 // this is set when the player has performed some action that
	 // will disable the NPC (dart gun, net, etc)
	 this.disabled = true;
	 
	 // this is set when the NPC is asleep (some chance upon creation, or hit by dart gun)
	 // note: only certain NPCs can be asleep (cobra, monkey, lioness, bat)
	 this.sleeping = false;
	 
	 // this holds the chance of the NPC waking up when the user steps on them.
	 // It can be different for each NPC, but defaults to 40% at a walking speed of 5.
	 // This, of course, is adjusted for a lower chance of waking up the slower the user walks.
	 this.waking_chance = 0.4;
	 
	 this.getWakingChance = function(){
		 // find the difference between 5 and their speed
		 var dif = 5 - speed;
		 // multiply that by 5 (%)
		 dif = dif * 5;
		 // subtract from the waking chance
		 var chance = (this.waking_chance * 100) - dif;
		 
		 // return this chance!
		 return (chance / 100);
		 };
	 
	 // this is a generic function called for both items and NPCs
	 // it allows for custom text when the player lands on the same space
	 // as an NPC
	 this.getFind;
	 
	 // setup the movement function
	 this.move = function()
	 {
		 // first check to see if we've exceeded our step count
		 if(this.step_count >= speed || this.disabled || this.sleeping)
			return;
		 
		 // otherwise we want to increase our step count (doesn't matter if we do action or move)
		 this.step_count++;
		 
		 // perform movement action
		 this.movement_action();
		 
		 // we first want to see if any of our neighbors are the player themselves.
		 var my_neighbors = GetNeighborMovable(this.location_x, this.location_y);
		 
		 // search through looking to see if it matches the player's location
		 for(var i = 0; i < my_neighbors.length; i++)
		 {
			if(my_neighbors[i][0] == Current_Location[0] && my_neighbors[i][1] == Current_Location[1])
			{
					// time to decide whether or not we attack!
					if(Math.random() <= this.attack_rate)
					{
						// then we attack and return!
						this.step_count = speed;
						this.attack();
						
						return;
					}
			}
		 }
		 
		 // othwerwise, randomize our available neighbors
		 var neighbors = ShuffleNeighbors(my_neighbors);
		 
		 // run through the list - no NPC can be on the same location
		 // as another NPC!
		 for(var i = 0; i < neighbors.length; i++)
		 {
			 if(NPC_On(neighbors[i][0], neighbors[i][1]) == false)
			 {
				 // then we update our current location!
				 this.location_x = neighbors[0][0];
				 this.location_y = neighbors[0][1];
				 
				 this.seeme = false;
			 }
		 }
		 // if we never updated our location, then our NPC is stuck! :/
	 }
}

// collection of NPC's
var NPC_list = new Array();

// returns a string representing an NPC - used for saving NPCs in a
// save game.
function GetNPCSave(npc)
{
	// when parsing, split using the ","
	// results:
	// [0] = name
	// [1] = location_x
	// [2] = location_y
	// [3] = attack rate
	// [4] = disabled
	// [5] = sleeping
	// [6] = held item (if any)
	
	// construct a string representing everything about this fellow
	var save_string = '';
	
	// save the name (much of the npc can be constructed from this)
	save_string += npc.name + ',';
	
	// save the location
	save_string += npc.location_x + ',' + npc.location_y + ',';
	
	// since the attack rate can depend on actions taken by the user,
	// save that as well
	save_string += npc.attack_rate + ',';
	
	// save the disabled and sleeping statuses
	save_string += npc.disabled + ',' + npc.sleeping + ',';
	
	// finally, save the held item, if any!
	save_string += SaveItem(npc.held_item);
	
	// give our string back!
	return save_string;
}

// Called when the user wants to load a game.  This loads the list of NPCs
// from the saved game (as a string) into the current game.
function LoadNPCs(npc_list)
{
	// first clear our NPC list
	NPC_list = new Array();
	
	// run through our new npc_list, loading them up!
	var list = npc_list.split('~');
	
	for(var i = 0; i < list.length - 1; i++)
	{
		var npc = list[i].split(',');
		
		switch(npc[0])
		{
			case 'cobra':
				HatchCobra();
				break;
			case 'scorpion':
				HatchScorpion();
				break;
			case 'spider':
				HatchSpider();
				break;
			case 'bat':
				SummonBat();
				break;
			case 'lioness':
				SummonLioness();
				break;
			case 'monkey':
				SummonMonkey();
				break;
			case 'mummy':
				SummonMummy();
				break;
		}
		
		// update the new NPCs location
		NPC_list[i].location_x = parseInt(npc[1]);
		NPC_list[i].location_y = parseInt(npc[2]);
		
		// make sure the attack rate is set
		NPC_list[i].attack_rate = parseFloat(npc[3]);
		
		// update the disabled/sleeping
		if(npc[4] == "false")
			NPC_list[i].disabled = false;
		else
			NPC_list[i].disabled = true;
			
		if(npc[5] == "false")
			NPC_list[i].sleeping = false;
		else
			NPC_list[i].sleeping = true;
		
		// held item
		NPC_list[i].held_item = LoadItem(npc[6]);
	}
}

// resets all step counts for all NPC's
// this should be called every time a player moves forward or backward
function ResetSteps()
{
	// run through the NPC list and reset their step counts
	for(var i = 0; i < NPC_list.length; i++)
		NPC_list[i].step_count = 0;
}

// This function controls the interval of each NPC.
// It contains ONE interval with ONE "UpdateView()" function
// It runs through each NPC, allowing them to move as they wish, and then updates the view once they are all completed
// This keeps the browser from having too many intervals running at the same time (could potentially bog it down)
var NPC_interval;
function MoveNPCs()
{
	NPC_interval = self.setInterval(
		function(){
			// within this function, loop through each NPC character and call their "Move" function
			for(var i = 0; i < NPC_list.length; i++)
			{
				NPC_list[i].move();
			}
			// once they have all moved, update the view
			UpdateView();
			// draw darkness, if we're out of oil or do not have a lamp
			if(Darkness())
				paper.image(NO_LIGHT.src, 0, 0, 604, 420);
		}, 1000
	);
}


// this function sets up NPC's for the level
function SetupNPCs()
{
	// first stop the interval (if it's going)
	self.clearInterval(NPC_interval);
	
	// next, clear the NPC list
	NPC_list = new Array();
	
	// based on the current level you're on, the chances of each NPC changes
	// first, how many NPC's should we do?
	// This can be anywhere from 0 to (current level - 2)
	// This means that you will never come across an NPC in the first two levels (with the exception of a mummy!)
	var NPC_count = Math.floor(Math.random()*current_level) - 2;
	
	if(NPC_count <= 0)
		NPC_count = 0;
		
	// now set some up!
	for(var i = 0; i < NPC_count; i++)
		GiveMeRandomNPC();
		
	// if we have the scarab of RA, we have a chance of summoning a mummy!
	for(var i = 0; i < users_inventory.length; i++)
	{
		if(users_inventory[i].name == SCARAB_NAME)
		{
			// do we summon a mummy?
			if(Math.random() <= 0.4)
				SummonMummy();
			break;
		}
	}
	
	// once these are all setup, we can start their action!
	MoveNPCs();
}

// function that actually generates a random NPC, consequently adding them to the NPC_list
function GiveMeRandomNPC()
{
	// here's our list of NPCs:
	var possible_npcs = new Array('monkey', 'scorpion', 'cobra', 'bat', 'lioness', 'spider');
	
	// select a random one!
	switch(possible_npcs[Math.floor(Math.random() * possible_npcs.length)])
	{
		case 'monkey':
			SummonMonkey();
			break;
		case 'scorpion':
			HatchScorpion();
			break;
		case 'cobra':
			HatchCobra();
			break;
		case 'bat':
			SummonBat();
			break;
		case 'lioness':
			SummonLioness();
			break;
		case 'spider':
			HatchSpider();
			break;
		}
}

// This function is called when the character needs to be drawn
function DrawNPC(character, distance)
{
	var map_index = null;

	switch(distance)
	{
		case 1:
			map_index = 0;
			break;
		case 2:
			map_index = 1;
			break;
		case 3:
			map_index = 2;
			break;
		case 4:
			map_index = 3;
			break;
		case 5:
			map_index = 4;
			break;
	}
	
	if(character.sleeping)
		map_index += 5;
	
	var map = character.maps[map_index];
	
	paper.image(character.image[map_index].src, 0, 0, 604, 420);
	
	// Setup the image map!
	if(character.sleeping && character.name != 'mummy' && character.name != 'scorpion' && character.name != 'spider')
		ActivateCharacterMap(map, distance);
	if(!character.sleeping)
		ActivateCharacterMap(map, distance);
		
	character.seeme = true;
}

// Quick function to check if an NPC is on the location passed in
function NPC_On(x, y)
{
		// run through the list of NPCs and check to see if any is on this location
		for(var i = 0; i < NPC_list.length; i++)
		{
			if(NPC_list[i].location_x == x && NPC_list[i].location_y == y)
				return true;
		}
		return false;
}

// returns the distance of the NPC from the player
function NPC_Distance(character)
{
	var distance = 0;
		 
	 if(Current_Direction == 1 || Current_Direction == 3)
	 {
		 if(Current_Location[0] >= character.location_x)
			distance = Current_Location[0] - character.location_x;
		else
			distance = character.location_x - Current_Location[0];
	 }
	 else
	 {
		 if(Current_Location[1] >= character.location_y)
			distance = Current_Location[1] - character.location_y;
		else
			distance = character.location_y - Current_Location[1];
	 }
	 
	 return distance;
}

/***********************************************************************
 * This function is used when we need to find the heaviest item
 *   for a specific location.  We use this so we can draw that object
 * 	 on the view port.
 **********************************************************************/
function GetNPCAt(x,y)
{
	// run through our list of NPCs, looking for an NPC at the location
	// passed in.
	var location_of_npc = -1;
	for(var i = 0; i < NPC_list.length; i++)
	{
		if(NPC_list[i].location_x == x && NPC_list[i].location_y == y)
		{
			location_of_npc = i;
			break;
		}
	}
	
	// if we have a location of an NPC,
	// then return that object
	if(location_of_npc >= 0)
		return NPC_list[location_of_npc];
	else
		return null;
}


/***********************************************************************
 * This function is called when a NPC is being displayed.  The passed
 * in variable is an "area" DOM object with pre-defined polygon coords
 * which represent an outline of the displayed image.
 * This creates a map overlay on the viewport, with the map given as
 * an active clickable area.
 * ********************************************************************/
function ActivateCharacterMap(map, distance)
{	
	// update our coords according to which area to use
	switch(distance)
	{
		case 1:
			$(DEFENSE_AREA_1).attr('coords', map.coords);
			break;
		case 2:
			$(DEFENSE_AREA_2).attr('coords', map.coords);
			break;
		case 3:
			$(DEFENSE_AREA_3).attr('coords', map.coords);
			break;
		case 4:
			$(DEFENSE_AREA_4).attr('coords', map.coords);
			break;
		case 5:
			$(DEFENSE_AREA_5).attr('coords', map.coords);
			break;
	}
}

var save_game_dialog_open=false;

var remove_save=false;

var last_save_name="";

/***********************************************************************
 * SaveGameDialog()
 * Opens a dialog to save a new game in.
 * ********************************************************************/
function SaveGameDialog()
{
	// create a new div
	var save_as=document.createElement("div");

	// set the class type
	save_as.setAttribute("class","save_as");

	save_as.id="save_as_dialog";
	
	// fill in various inputs (name, save button, etc)
	save_as.innerHTML='<div style="text-align: center; top: 20px; position: relative;">Save Game<br /><br /><span class="save_as_name">Save As: <input type="text" id="save_name"></span><br><br><button type="button" id="save_game_button" onclick="SaveGameFromDialog();">Save</button><button type="button" onclick="javascript: document.body.removeChild(document.getElementById(\'save_as_dialog\')); save_game_dialog_open = false;">Cancel</button></div>';

	// show this new dialog
	document.body.appendChild(save_as);

	// if the user presses "enter", call the save game function
	$("#save_name").keyup(function(event){
		if(event.keyCode==13)
		{
			$("#save_game_button").click();
		}
	});

	// make sure it's in focus!
	$("#save_name").focus();
	
	save_game_dialog_open=true
}

/***********************************************************************
 * SaveGameFromDialog()
 * Simply calls the "SaveGame" function, passing in the name of the
 * new game save, and letting it know it's a new save (not an update)
 * ********************************************************************/
function SaveGameFromDialog()
{
	SaveGame("sorsave_"+document.getElementById("save_name").value,false)
}


/***********************************************************************
 * SaveGame(name, update)
 * Saves all information needed to properly represent a game as a string
 * into localStorage.  The localStorage key is the name of the save 
 * (after appended to "sorsave_").  If "update" is true, it looks for
 * the name in localStorage and replaces it.  Otherwise it creates a
 * new entry.
 * ********************************************************************/
function SaveGame(name,update)
{
	// name of the saved game...
	var save_name=name;
	var save_content="";
	
	// if that name already exists in our localStorage...
	if(localStorage.getItem(save_name)!=null)
	{
		// and we're not updating (meaning we're saving a new entry)
		// make sure they want to overwright that saved game!
		if(!update&&!confirm('The save "'+document.getElementById("save_name").value+'" already exists.\n\nOverwrite?'))
		{
			// if they don't, just return.
			return;
		}
	}
	
	// begin to assemble the saved game information.
	// When split upon "^" characters, the saved content will look
	// something like this:
	// [0]: maze width
	// [1]: maze height
	// [2]: maze cell information
	// [3]: level items (items still on the floor)
	// [4]: current level number
	// [5]: game status (game over?)
	// [6]: health value
	// [7]: hunger value
	// [8]: current location in the maze (x-coord)
	// [9]: current location in the maze (y-coord)
	// [10]: current direction (N/S/E/W)
	// [11]: user items (items in the inventory)
	// [12]: has the staff been created?
	// [13]: has the crown been created?
	// [14]: how many points do they have?
	// [15]: how much weight can they carry?
	// [16]: what is the hunger-per-step gain?
	// [17]: is the scarab activated?
	// [18]: is the staff activated?
	// [19]: are they poisoned?
	// [20]: trap information (all traps on the level)
	// [21]: which defense item (if any) is active?
	// [22]: bank (if any) location and wall info [x, y, direction]
	// [23]: speed
	// [24]: NPCs
	
	// Maze information (height/width/cells)
	save_content+=WIDTH+"^"+HEIGHT+"^";
	for(var i=0; i<WIDTH; i++)
	{
		for(var j=0; j<HEIGHT; j++)
		{
			save_content+=Maze[i][j][0]+","+Maze[i][j][1]+","+Maze[i][j][2]+","+Maze[i][j][3]+","+Maze[i][j][4]+"_";
		}
	}
	
	save_content+="^";
	
	// store level items
	for(var i=0; i<level_items.length; i++)
	{
		save_content+=SaveItem(level_items[i])+",";
	}
	
	// store current leve, game status, health, hunger, location/direction
	save_content+="^"+current_level+"^"+game_over+"^"+health+"^"+hunger+"^"+Current_Location[0]+"^"+Current_Location[1]+"^"+Current_Direction+"^";

	// store users inventory
	for(var i=0; i<users_inventory.length; i++)
	{
		save_content+=SaveItem(users_inventory[i])+","
	}
	
	// ancient artifacts info/points/hunger/weight/health
	save_content+="^"+STAFF_CREATED+"^"+CROWN_CREATED;
	save_content+="^"+points;
	save_content+="^"+MAX_WEIGHT+"^"+hunger_per_step;
	save_content+="^"+scarab_activated+"^"+staff_activated;
	save_content+="^"+health_status+"^";

	// store trap information
	for(var i=0; i<traps.length; i++)
	{
		save_content+=SaveTrap(traps[i])+","
	}
	
	// store which defense icon is active
	save_content += '^'+defense_active;
	
	// store the bank information
	save_content += '^';
	if(location_of_bank != null)
		save_content += location_of_bank[0]+','+location_of_bank[1]+','+bank_wall;
		
	// store speed
	save_content += '^' + speed + '^';
	
	// store the list of NPCs
	for(var i = 0; i < NPC_list.length; i++)
	{
		save_content += GetNPCSave(NPC_list[i]) + '~';
	}
	
	// save this item into the localStorage
	localStorage.setItem(save_name,save_content);
	
	// if we saved a new game, show "Game Saved!"
	if(!update)
	{
		document.body.removeChild(document.getElementById("save_as_dialog"));
		document.getElementById("inventory_description").innerHTML="Game Saved!";
	}
	// otherwise show what we saved it as
	else
	{
		document.getElementById("inventory_description").innerHTML='Saved as "'+last_save_name.substring(8)+'".';
	}
	
	// we're done saving the game, so allow the user to update this game now
	save_game_dialog_open=false;
	last_save_name=save_name;
	document.getElementById("update_button").disabled="";
}

/***********************************************************************
 * UpdateLastSave
 * Simply calls "SaveGame()" passing in the name of the last saved/
 * updated game, and lets the function know we're updating an existing
 * game, and not creating a new entry.
 * ********************************************************************/
function UpdateLastSave()
{
	SaveGame(last_save_name,true)
}

/***********************************************************************
 * SaveItem(item)
 * Simple function which takes in an item and returns a string
 * that represents that item well enough to store it for a saved game.
 * ********************************************************************/
function SaveItem(item)
{
	// if we don't know what the item is, just return an empty string...
	if(item==undefined)
	{
		return"";
	}

	// otherwise return:
	// active, amount, location_x, location_y, name, and weight
	return item.active+"|"+item.amount+"|"+item.location_x+"|"+item.location_y+"|"+item.name+"|"+item.weight
}

/***********************************************************************
 * LoadGameDialog
 * Displays a dialog on the screen to load a game from.
 * Contains a list of games generated by "GameList()".
 * 
 * Each game is clickable to load, and has a "delete" button with it.
 * ********************************************************************/
function LoadGameDialog()
{
	remove_save=false;
	
	// create the dialog
	var save_as=document.createElement("div");
	save_as.setAttribute("class","load_game");
	save_as.id="load_game_dialog";
	
	// content will hold the game list
	var content='<div style="text-align: center; top: 20px; position: relative;">Load Game</div><br /><br /><div class="load_game_div" id="load_list">';
	
	// get the game list
	content+=GameList();
	
	// add a "Cancel" button
	content+='</div><button type="button" onclick="javascript: document.body.removeChild(document.getElementById(\'load_game_dialog\')); save_game_dialog_open = false;">Cancel</button></div>';
	save_as.innerHTML=content;
	
	// display the dialog
	document.body.appendChild(save_as);
	
	// signal that the save game dialog is now open (so keystrokes won't keep moving the character in the background)
	save_game_dialog_open=true
}

/***********************************************************************
 * GameList
 * Returns a list of saved games.
 * Saved games (in localStorage) always start with: "sorsave_"
 * 	(Scarab Of Ra SAVE)
 * ********************************************************************/
function GameList()
{
	var list="";
	
	// run through the localStorage, looking for any key whose name
	// starts with "sorsave_"...
	for(var i=0; i<localStorage.length; i++)
	{
		if(localStorage.key(i).indexOf("sorsave_")==0)
		{
			// if we found one, get the game info and create a GUI object
			// for the user to select (including a title with info).
			var info=localStorage.getItem(localStorage.key(i)).split("^");
			list+='<div class="loadable_game" id="loadable_save_'+i+'" onclick="LoadGame('+i+');"';
			list+=' title="Level: '+(parseInt(info[0])-2)+", Health: "+info[6]+", Hunger: "+info[7];
			list+="\nInventory: ";
			
			// assemble the information with a list of inventory from the save...
			var inventory=String(info[11]).split(",");
			for(var j=0; j<(inventory.length-1); j++)
			{
				list+=inventory[j].split("|")[4];
				if(j!=inventory.length-2)
				{
					list+=", ";
				}
			}
			// add a delete button...
			list+='">'+localStorage.key(i).substring(8)+'</div><div class="del_saved_game" onclick="DeleteSave('+i+');">Del</div>';
		}
	}
	return list;
}

/***********************************************************************
 * LoadGame
 * Takes in an index (of localStorage) and grabs all of the game info
 * for that save.  It then goes through and:
 * - 
 * ********************************************************************/
function LoadGame(index)
{
	// remove the "load game" dialog...
	document.body.removeChild(document.getElementById("load_game_dialog"));
	save_game_dialog_open=false;
	
	// look up that game to make sure it still exists...
	if(localStorage.key(index)==null)
	{
		alert("Failed to load saved game - could not find the game save in your local storage.  NOTE: deleting/clearing your browser's cookies will remove saved games!");
		return;
	}
	
	// get the saved game
	saved_game = localStorage.getItem(localStorage.key(index)).split("^");
	
	// load the dimensions
	WIDTH=parseInt(saved_game[0]);
	HEIGHT=parseInt(saved_game[1]);
	
	// reset some globals...
	ResetValues();
	Maze_HTML="";
	Maze_HTML_Answer="";
	
	/********************** LOAD MAZE *******************************/
	// create a new maze with the parameters we have
	Maze=new Array(WIDTH);
	
	// grab the saved maze attributes
	var saved_maze=saved_game[2].split("_");
	
	// for each cell saved, set up the current maze to reflect these
	// (outer loop)
	for(var i=0,z=0; i<WIDTH; i++)
	{
		// create new column (for each row)
		Maze[i]=new Array(HEIGHT);
		// (inner loop)
		for(var j=0; j<HEIGHT; j++,z++)
		{
			// each cell is a new array of 5
			Maze[i][j]=new Array(5);
			var cell=saved_maze[z].split(",");
			Maze[i][j][0]=parseInt(cell[0]);
			Maze[i][j][1]=parseInt(cell[1]);
			Maze[i][j][2]=parseInt(cell[2]);
			Maze[i][j][3]=parseInt(cell[3]);
			Maze[i][j][4]=cell[4]
		}
	}
	
	/*********************** LOAD ITEMS ******************************/
	// reset the level items
	level_items=new Array();
	
	// get the saved items
	saved_items=saved_game[3].split(",");
	
	// for each item we saved, add them to the level
	for(var i=0; i<saved_items.length-1; i++)
		level_items.push(LoadItem(saved_items[i]));
	
	/********************** LOAD LEVEL INFO **************************/
	// which level are we on?
	current_level=parseInt(saved_game[4]);
	
	// is the game already over? (no cheating!!)
	if(saved_game[5]=="true")
		game_over=true;
	else
		game_over=false;
	
	/********************** LOAD PLAYER INFO *************************/
	// get their saved health/hunger
	health=parseFloat(saved_game[6]);
	hunger=parseFloat(saved_game[7]);
	
	// Setup their current location and direction
	Current_Location[0]=parseInt(saved_game[8]);
	Current_Location[1]=parseInt(saved_game[9]);
	Current_Direction=parseInt(saved_game[10]);
	
	// load their inventory
	users_inventory=new Array();
	saved_items=saved_game[11].split(",");
	
	// for each item which was in their inventory, let's give it back
	// to them!
	for(var i=0; i<saved_items.length-1; i++)
		users_inventory.push(LoadItem(saved_items[i]));
	
	// has the staff already been created?
	STAFF_CREATED=false;
	if(saved_game[12]=="true")
		STAFF_CREATED=true;
	
	// what about the crown?
	CROWN_CREATED=false;
	if(saved_game[13]=="true")
		CROWN_CREATED=true;
	
	// how many points have they received so far?
	points=parseInt(saved_game[14]);
	document.getElementById("prestige_points").innerHTML=points;
	document.getElementById("education").innerHTML=GetEducation();
	
	// update weight and hunger
	MAX_WEIGHT=parseInt(saved_game[15]);
	hunger_per_step=roundNumber(parseFloat(saved_game[16]),2);
	
	// is the scarab currently active?
	scarab_activated=false;
	if(saved_game[17]=="true")
		scarab_activated=true;
	
	// is the staff currently active?
	staff_activated=false;
	if(saved_game[18]=="true")
		staff_activated=true
	
	// update their health...
	health_status=saved_game[19];
	UpdateHealthStatus();
	
	/*********************** LOAD TRAPS ******************************/
	traps=new Array();
	var traplist=saved_game[20].split(",");
	
	// for each type of trap, load it into the level!
	for(var i=0; i<traplist.length-1; i++)
		LoadTrap(traplist[i].split("|"));
	
	// which direction are they pointing?
	switch(Current_Direction)
	{
		case 0:
			ANGLE=0;
			break;
		case 1:
			ANGLE=90;
			break;
		case 2:
			ANGLE=180;
			break;
		case 3:
			ANGLE=-90;
			break
	}
	
	/******************** LOAD ACTIVE DEFENSE ************************/
	// for backwards compatability, only try to load this setting
	// if it exists!
	if(saved_game.length >= 22)
	{
		defense_active = saved_game[21];
	}
	
	/********************* LOAD BANK INFO ****************************/
	// for backwards compatability, only try to load this setting
	// if it exists!
	if(saved_game.length >= 23)
	{
		var bank = saved_game[22].split(',');
		location_of_bank = new Array();
		location_of_bank.push(bank[0]);
		location_of_bank.push(bank[1]);
		bank_wall = bank[2];
	}
	
	/******************** LOAD GAME SPEED ****************************/
	// only if it exists! (backwards compatability)
	if(saved_game.length >= 24)
		speed = parseInt(saved_game[23]);
		
	/******************** LOAD NPCs **********************************/
	// only if it exists! (backwards compatability)
	if(saved_game.length >= 25)
	{
		LoadNPCs(saved_game[24]);
	}
	
	// update all the fancy GUI stuffs....
	UpdateView();
	if(Darkness())
	{
		paper.image(NO_LIGHT.src,0,0,604,420)
	}
	UpdateInventoryList();
	HealthBar.percentage=roundNumber((health/100),2);
	HealthBar.update();
	HungerBar.percentage=roundNumber((hunger/MAX_HUNGER),2);
	HungerBar.update();
	WeightBar.percentage=WeightPercentage();
	WeightBar.update();
	
	UpdateDefenseIcons();
	
	// the last game we loaded/saved is THIS one!
	last_save_name=localStorage.key(index);
	
	// allow them to update it!
	document.getElementById("update_button").disabled=""
}

/***********************************************************************
 * LoadItem(item_info)
 * Takes in a string representing an item (usually from the localStorage)
 * and returns back the corresponding Item object.
 * ********************************************************************/
function LoadItem(item_info)
{
	// item_info:
	// [0]: active
	// [1]: amount
	// [2]: location_x
	// [3]: location_y
	// [4]: item name
	// [5]: weight
	
	// split the item into a list
	var item=item_info.split("|");
	
	// adjust the string booleans to actual boolean
	if(item[0]=="true")
		item[0]=true;
	else
		item[0]=false;
	
	// adjust all measurements into floats (from strings)
	item[1]=parseFloat(item[1]);
	item[2]=parseFloat(item[2]);
	item[3]=parseFloat(item[3]);
	item[5]=parseFloat(item[5]);
	
	// based on the name of the item, call the appropriate item creation function
	switch(item[4])
	{
		case STAFF_NAME:
			return Staff_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case CROWN_NAME:
			return Crown_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case SCARAB_NAME:
			return Scarab_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case KEY_NAME:
			return Key_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case LAMP_NAME:
			return Lamp_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case OIL_NAME:
			return Oil_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case FOOD_NAME:
			return Food_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case ANTI_NAME:
			return Anti_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case FAK_NAME:
			return FAK_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case GOLD_NAME:
			return Gold_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case POLE_NAME:
			return Pole_Item(item[0],item[1],item[2],item[3],item[5]);
			break;
		case DGUN_NAME:
			return DartGun_Item(item[0], item[1], item[2], item[3], item[5]);
			break;
		case DARTS_NAME:
			return Darts_Item(item[0], item[1], item[2], item[3], item[5]);
			break;
		case SPRAY_NAME:
			return BugSpray_Item(item[0], item[1], item[2], item[3], item[5]);
			break;
	}
}

/***********************************************************************
 * Called when the user wants to delete a saved game.
 * It confirms they really want to do that, then removes that item
 * from the localStorage.
 * ********************************************************************/
function DeleteSave(index)
{
	if(confirm('Really delete the saved game "'+localStorage.key(index).substring(8)+'"?'))
	{
		localStorage.removeItem(localStorage.key(index));
		document.getElementById("load_list").innerHTML=GameList()
	}
}

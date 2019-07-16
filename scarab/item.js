/***********************************************************************
 * Object.js
 * David Pettifor
 * July 17, 2012
 * 
 * This file contains the class "item" which represents an item found
 *  in-game.  Each item has:
 * 		- Original Location ([x,y] in map where found)
 * 		- Weight
 * 		- Image
 * 		- Name
 * 		- Brief description
 * 		- Use action (function)
 * 		- Throw action (function)
 **********************************************************************/
 
 function Item()
 {
	 // display name of the item
	 this.name = '';
	 
	 // where in the map did we find this item?
	 this.location_x = 0;
	 this.location_y = 0;
	 
	 // how much weight do we have?
	 this.weight = 0;
	 
	 // what does the item look like?
	 this.image = null;
	 
	 // should the image be drawn tall or as a small item on the floor?
	 this.tall = false;
	 
	 // tell us about this item...
	 this.description = '';
	 
	 // extra info (for gold, darts, food, etc)
	 this.amount = 0;
	 
	 // do we drop the whole thing or parts of it?
	 this.drop_whole = false;
	 
	 // what increments do we drop in?
	 this.drop_step = 1;
	 
	 // more extra info (if an item is active, such as lamp and other protective services)
	 this.active = false;
	 
	 // action when used
	 this.use = null;
	 
	 // action when thrown
	 this.toss = null;
	 
	 // string retreval for description
	 this.getDescription = null;
	 
	 // string retreval for when we found something
	 this.getFind = null;
	 
	 // function for updating weight of an item
	 this.updateWeight = null;
 }

/***********************************************************************
 * This is a list of items located in the level itself.
 * It should be reset on every level
 * ********************************************************************/
var level_items = new Array();


/***********************************************************************
 * This function is called at the start of a GAME (not level!)
 * It sets up some default items (such as a lamp, oil, and food).
 **********************************************************************/
function InitDefaultItems()
{
	// setup the lamp
	users_inventory.push(SetupLamp());

	// give the user some food
	var food = SetupFood();
	food.amount = 8;
	users_inventory.push(food);
	
	// give the user some oil
	var oil = SetupOil();
	oil.amount = 8;
	users_inventory.push(oil);
	
	UpdateInventoryList();
}


/***********************************************************************
 * This function is called once per level.
 * It places some mandentory items throughout the maze (key) and
 * chooses some other random objects and places them throughout the maze.
***********************************************************************/
function SetupItems()
{
	// first place the mandentory items
	level_items.push(SetupKey());
	
	for(var i = 1; i <= current_level; i++)
	{
		// do we add any oil (and how many) to this level?
		if((Math.floor(Math.random()*20)+1) <= current_level)
		{
				// setup an oil can someplace
				level_items.push(SetupOil());
		}
		
		// do we add any gold (and how many) to this level?
		if((Math.floor(Math.random()*20)+1) <= current_level)
		{
				// setup some gold someplace
				level_items.push(SetupGold());
		}
		
		// do a separate chance for food
		if((Math.floor(Math.random()*40)+1) <= current_level)
		{
				// setup some food in some place
				level_items.push(SetupFood());
		}
		
		// poles
		if((Math.floor(Math.random()*25)+1) <= current_level)
		{
				// setup some food in some place
				level_items.push(SetupPole());
		}
		
		// first aid kits
		if((Math.floor(Math.random()*20)+1) <= current_level)
		{
				// setup some food in some place
				level_items.push(SetupFAK());
		}
		
		// anti poison
		if((Math.floor(Math.random()*25)+1) <= current_level)
		{
				// setup some food in some place
				level_items.push(SetupAnti());
		}
		
		// darts
		if((Math.floor(Math.random()*20)+1) <= current_level)
		{
				// setup some food in some place
				level_items.push(SetupDarts());
		}
		
		// dart gun
		if(Math.floor(Math.random()*30)+1 == 1)
		{
				// setup some food in some place
				level_items.push(SetupDartGun());
		}
		
		// bug spray
		if(Math.floor(Math.random()*25)+1 == 1)
		{
				// setup some food in some place
				level_items.push(SetupBugSpray());
		}
		
		// traps!
		if(Math.floor(Math.random()*8)+1 == 1)
		{
			// create a random trap
			GenerateRandomTrap();
		}
	}
	
	// should we generate a scarab here? (1/10 chances)
	if((Math.floor(Math.random()*10)+1) == 1)
	{
		level_items.push(SetupScarab());
	}

	// if we haven't already, should we generate the Staff of Ra?
	if(STAFF_CREATED == false && current_level >= 2 && (Math.floor(Math.random()*20)+1) == 1)
	{
		STAFF_CREATED = true;
		level_items.push(SetupStaff());
	}
		
	// if we haven't already, should we generate the Crown of Ra?
	if(CROWN_CREATED == false && current_level >= 2 && (Math.floor(Math.random()*20)+1) == 1)
	{
		CROWN_CREATED = true;
		level_items.push(SetupCrown());
	}

}

/***********************************************************************
 * This function is used when we need to find the heaviest item
 *   for a specific location.  We use this so we can draw that object
 * 	 on the view port.
 **********************************************************************/
function GetHeaviestItemAt(x,y)
{
	// run through our list of items, looking for the heaviest at
	// the specified location
	var location_of_heaviest = -1;
	var heaviest_weight = 0;
	for(var i = 0; i < level_items.length; i++)
	{
		if(level_items[i].location_x == x && level_items[i].location_y == y && level_items[i].weight >= heaviest_weight)
		{
			location_of_heaviest = i;
			heaviest_weight = level_items[i].weight;
		}
	}
	
	// if we have a location of the heaviest object (we always should)
	// then return that object
	if(location_of_heaviest >= 0)
		return level_items[location_of_heaviest];
	else
		return null;
}

/***********************************************************************
 * This function returns a list of items that are at our current
 * location.
 **********************************************************************/
function GetItemsHere(include_traps)
{
	// run through our list of items and check if we have any at our
	// current location
	var list = new Array();
	for(var i = 0; i < level_items.length; i++)
	{
		if(level_items[i].location_x == Current_Location[0] && level_items[i].location_y == Current_Location[1])
			list.push(level_items[i]);
	}
	// also check for NPCs!
	for(var i = 0; i < NPC_list.length; i++)
	{
		if(NPC_list[i].location_x == Current_Location[0] && NPC_list[i].location_y == Current_Location[1])
			list.push(NPC_list[i]);
	}
	
	// lastly, check for traps!
	if(include_traps)
	{
		for(var i = 0; i < traps.length; i++)
		{
			if(traps[i].location_x == Current_Location[0] && traps[i].location_y == Current_Location[1])
				list.push(traps[i]);
		}
	}
	return list;
}

/***********************************************************************
 * This function returns a list of items that are at our current
 * location.
 **********************************************************************/
function ItemsAt(x,y)
{
	// run through our list of items and check if we have any at our
	// current location
	var list = new Array();
	for(var i = 0; i < level_items.length; i++)
	{
		if(level_items[i].location_x == x && level_items[i].location_y == y)
			return true;
	}
	return false;
}

/***********************************************************************
 * This function is called whenever we need to draw an item on the 
 * screen.  We give the item object, and the distance to draw it at.
 **********************************************************************/
function DrawItem(item, distance)
{
	// check to see if this item is actually a character
	if(item instanceof NPC)
	{
		DrawNPC(item, distance);
		return;
	}
	// based on the distance, draw the image
	switch(distance)
	{
			case 1:
				if(item.tall)
					paper.image(item.image.src, 60, 0, 474, 366);
				else
					paper.image(item.image.src, 64, 224, 475, 121);
				break;
			case 2:
				if(item.tall)
					paper.image(item.image.src, 187, 58, 225, 176);
				else
					paper.image(item.image.src, 183, 184, 238, 60);
				break;
			case 3:
				if(item.tall)
					paper.image(item.image.src, 260, 101, 85, 75);
				else
					paper.image(item.image.src, 243, 155, 118, 29);
				break;
			case 4:
				if(item.tall)
					paper.image(item.image.src, 281, 117, 44, 36);
				else
					paper.image(item.image.src, 275, 143, 54, 11);
				break;
			case 5:
				if(item.tall)
					paper.image(item.image.src, 287, 123, 31, 18);
				else
					paper.image(item.image.src, 286, 136, 30, 6);
				break;
	}
}

/***********************************************************************
 * This function is called when the user finds an item and clicks the
 * "Pickup" button.  It first checks to see how many items are in our
 * current location.  If it's only one, it simply adds that item
 * to our current inventory.  If it's more than one, it displays a list
 * of items to be picked up.
 **********************************************************************/
 var pickup_items_dialog_open = false;
 
function PickupItem()
{
	// get the item list
	var item_list_total = GetItemsHere(false);
	var item_list = new Array();
	
	// remove any NPCs
	for(var i = 0; i < item_list_total.length; i++)
	{
		if(item_list_total[i] instanceof NPC)
			continue;
		item_list.push(item_list_total[i]);
	}
	
	// do nothing if there's nothing to pickup
	if(item_list.length == 0)
		return;
	
	// check to see how many items we have at this location
	if(item_list.length == 1)
	{
		AddItem(item_list[0]);
		// check for items below our feet
		var item_list = GetItemsHere(false);
		// make sure the pickup button is disabled...for now
		document.getElementById('pickup_button').disabled = 'disabled';
		if(item_list.length > 0)
		{
			var itemlist = 'You found ';
			for(var i = 0; i < item_list.length; i++)
			{
				if(i == item_list.length - 1 && i != 0)
					itemlist += 'and '+ item_list[i].getFind();
				else
					if(item_list.length > 1)
						itemlist += item_list[i].getFind() + ', ';
					else
						itemlist += item_list[i].getFind();
			}
			itemlist += '!';
			// show this list of items
			//document.getElementById('inventory_description').innerHTML = itemlist;
			AddMessage(itemlist);
			
			// enable the pickup button!
			document.getElementById('pickup_button').disabled = '';
		}
		else
		{
			// if there are no more items here, check if there's a trap that needs to be set off!
			for(var i = 0; i < traps.length; i++)
			{
				if(traps[i].location_x == Current_Location[0] && traps[i].location_y == Current_Location[1] && traps[i].sprung == false)
					traps[i].land();
			}
		}
		return;
	}
	
	// if we found more than one item, show a list of items to be picked
	// up, and let the user decide what should be picked up
	// create a div to show
	var pickup = document.createElement('div');
	pickup.setAttribute('class', 'pickup_dialog');
	pickup.id = 'pickup_dialog';
	
	// content to display
	var content = '<div style="margin-top: 10px; text-align: center;">Pickup what?<br /><br />';
	
	// loop through the item list and create check boxes in a list form
	content += '<div style="display: block; width: 60%; margin-left: auto; margin-right: auto; height: 75px; overflow: auto; border: 1px solid black; font-size: small; text-align: left; padding-left: 5px;">';
	
	for(var i = 0; i < item_list.length; i++)
	{
		if(item_list[i] instanceof NPC)
			continue;
		content += '<label><input type="checkbox" checked="checked" id="pickup_'+i+'" name="pickup_item" style="vertical-align: middle;"> '+item_list[i].getFind()+'</input><br />';
	}
	
	content += '</div><br />';
	content += '<button type="button" onclick="PickupItems();">Pickup</button><button type="button" onclick="ClosePickupDialog();">Close</button></div>';
	
	// add the content to the DIV
	pickup.innerHTML = content;
	
	// add this div to the body
	document.body.appendChild(pickup);
	
	// show that the pickup items dialog is open
	pickup_items_dialog_open = true;
}

/***********************************************************************
 * This function is called when we're either done picking up items, or
 * the user doesn't want to pick up any items.  It removes the
 * "pickup_dialog" DIV from the body, and sets "pickup_items_dialog_open"
 * to false.
 * ********************************************************************/
function ClosePickupDialog()
{
	// remove the DIV
	document.body.removeChild(document.getElementById('pickup_dialog'));
	
	// tell the system we're done with this dialog
	pickup_items_dialog_open = false;
}

/***********************************************************************
 * This function is called when the user wants to pick up multiple items
 * found (called by the "Pickup" button in the "pickup dialog").
 * It runs through the elements named "pickup_item" and picks up
 * any item checked.
 **********************************************************************/
function PickupItems()
{
	// get the item list
	var item_list = GetItemsHere();
	
	// run through each item that's checked and pick it up!
	for(var i = 0; i < document.getElementsByName('pickup_item').length; i++)
	{
		if(document.getElementsByName('pickup_item')[i].checked)
		{
			AddItem(item_list[document.getElementsByName('pickup_item')[i].id.split('_')[1]]);
		}
	}
	
	// Close the dialog
	ClosePickupDialog();
	
	// check for items below our feet
	var item_list = GetItemsHere();
	// make sure the pickup button is disabled...for now
	document.getElementById('pickup_button').disabled = 'disabled';
	if(item_list.length > 0)
	{
		var itemlist = 'You found ';
		for(var i = 0; i < item_list.length; i++)
		{
			if(i == item_list.length - 1 && i != 0)
				itemlist += 'and '+ item_list[i].getFind();
			else
				if(item_list.length > 1)
					itemlist += item_list[i].getFind() + ', ';
				else
					itemlist += item_list[i].getFind();
		}
		itemlist += '!';
		// show this list of items
		//document.getElementById('inventory_description').innerHTML = itemlist;
		AddMessage(itemlist);
		
		// enable the pickup button!
		document.getElementById('pickup_button').disabled = '';
	}
	else
	{
		// if there are no more items here, check if there's a trap that needs to be set off!
		for(var i = 0; i < traps.length; i++)
		{
			if(traps[i].location_x == Current_Location[0] && traps[i].location_y == Current_Location[1] && traps[i].sprung == false)
				traps[i].land();
		}
	}
}

/***********************************************************************
 * This function is called when the user wants to pick up the item
 *  that they just came across.
 * It removes that item from the level's item list and adds it to their
 *  inventory list.  It them calls to update the inventory display.
 **********************************************************************/
function AddItem(item)
{
	// run through the level items list and remove it from that list,
	// adding it to the user's inventory
	loop1: for(var i = 0; i < level_items.length; i++)
	{
		if(level_items[i] == item)
		{
			// add this item to the user's inventory list (add amounts if we already have one!)
			var found = false;
			loop2: for(var j = 0; j < users_inventory.length; j++)
			{
				if(users_inventory[j].name == item.name)
				{
					found = true;
					// if it's a dart gun, fill our current gun with remaning darts and pickup just the darts
					if(users_inventory[j].name == DGUN_NAME)
					{
						// how many darts do we have in the gun?
						var darts_needed = 4 - users_inventory[j].amount;
						// are we already full?
						if(darts_needed == 0)
						{
							var darts = SetupDarts();
							darts.amount = item.amount;
							// find if we have any darts already in our inventory
							var found_darts = false;
							for(var z = 0; z < users_inventory.length; z++)
							{
								if(users_inventory[z].name == DARTS_NAME)
								{
									users_inventory[z].amount += item.amount;
									found_darts = true;
								}
							}
							if(!found_darts)
								users_inventory.push(darts);
						}
						
						// if we need less than what we found, add what we need
						// then add the rest as "darts"
						if(darts_needed < item.amount && darts_needed != 0)
						{
							users_inventory[j].amount = users_inventory[j].amount + darts_needed;
							item.amount = item.amount - darts_needed;
							var darts = SetupDarts();
							darts.amount = item.amount;
							// find if we have any darts already in our inventory
							var found_darts = false;
							for(var z = 0; z < users_inventory.length; z++)
							{
								if(users_inventory[z].name == DARTS_NAME)
								{
									users_inventory[z].amount = item.amount;
									found = true;
								}
							}
							if(!found_darts)
								users_inventory.push(darts);
							
						}
						// if we need at least all darts that we found, just add it
						if(darts_needed >= item.amount)
						{
							users_inventory[j].amount += item.amount;
						}
						users_inventory[j].weight = roundNumber(roundNumber(item.weight, 2) + roundNumber(users_inventory[j].weight, 2), 2);
						
					}
					else
					{
						users_inventory[j].amount = roundNumber(roundNumber(item.amount, 2) + roundNumber(users_inventory[j].amount, 2), 2);
						// we also need to update the weight
						users_inventory[j].weight = roundNumber(roundNumber(item.weight, 2) + roundNumber(users_inventory[j].weight, 2), 2);
						
						// remove this item from the level_items array
						level_items.splice(i, 1);
					}
					break loop2;
				}
			}
			
			if(!found)
				users_inventory.push(item);
			
			// remove this item from the level_items array
			level_items.splice(i, 1);
		}
		
	}
	// Add points!
	AddPoints('Pickup', item);
	
	// update any defense item icons
	UpdateDefenseIcons();
	
	// update the inventory list
	UpdateInventoryList();
	
	// update the weight!
	WeightBar.percentage = WeightPercentage();
	WeightBar.update();
	
	// make sure our weight isn't too heavy!
	if(WeightBar.percentage >= 1)
	{
		alert("You are over-encumbered!  You cannot move with so much weight on your shoulders...");
	}
}

/***********************************************************************
 * Called when the user adds or removes an item from the inventory list
 * The main purpose is to refresh the displayed list of inventory items
 * ********************************************************************/
function UpdateInventoryList()
{
	// reset the contents of the list's options
	document.getElementById('inventory_list').innerHTML = '';
	//document.getElementById('inventory_description').innerHTML = '';
	
	// run through the user's inventory list and add each item
	// to the inventory list DIV
	for(var i = 0; i < users_inventory.length; i++)
	{
		document.getElementById('inventory_list').innerHTML += '<OPTION value="'+i+'">'+users_inventory[i].name+'</OPTION>';
	}
}

/***********************************************************************
 * Called when the "Use" button is clicked.
 * If more than one item is selected, it does nothing.
 * If only one item is selected, it calls that item's .use() function.
 * ********************************************************************/
function UseSelectedItem()
{
	// check to see how many items are selected
	var selected_item = -1;
	
	// run through the list of items
	for(var i = 0; i < document.getElementById('inventory_list').options.length; i++)
	{
		if(document.getElementById('inventory_list').options[i].selected)
		{
			if(selected_item != -1)
			{
				alert("You can only use one item at a time.");
				return;
			}
			selected_item = i;
		}
	}
	
	// make sure we have a selected item
	if(selected_item == -1)
		return;
		
	// otherwise, call this item's use function!
	users_inventory[selected_item].use();
}


/***********************************************************************
 * Called when the "Drop" button is clicked.
 * Show the "how many?" dialog
 * ********************************************************************/
function DropDialog()
{
	// first check to see what is selected
	var index_of_selected = -1;
	for(var i = 0; i < document.getElementById('inventory_list').options.length; i++)
	 {
		 if(document.getElementById('inventory_list').options[i].selected)
		 {
			if(index_of_selected >= 0)
			{
				alert("Please only select one item to drop.");
				return;
			}
			 index_of_selected = i;
		 }
	 }
	 
	// make sure we have something selected
	if(index_of_selected < 0)
		return;

	// if we need to drop the entire item, don't bother displaying the DIV
	if(users_inventory[index_of_selected].drop_whole)
	{
		DropItem(index_of_selected, 1);
		return;
	}
	
	// get the max of our range
	var maximum = users_inventory[index_of_selected].amount;
	
	// create a div to show
	var drop_dialog = document.createElement('div');
	drop_dialog.setAttribute('class', 'drop_dialog');
	drop_dialog.id = 'drop_dialog';
	
	// content to display
	var content = '<div style="margin-top: 10px; text-align: center;">How much?<br /><br /><span id="display_quantity" style="font-size: small; display: block; padding-bottom: 5px;">0</span><div id="quantity" class="quantity_slider"></div><br><button type="button" onclick="DropItem('+index_of_selected+', parseFloat(document.getElementById(\'display_quantity\').innerHTML));">Drop</button><button type="button" onclick="document.body.removeChild(document.getElementById(\'drop_dialog\'));">Close</button></div>';
	
	// add the content to the DIV
	drop_dialog.innerHTML = content;
	
	// add this div to the body
	document.body.appendChild(drop_dialog);
	
	// setup the slider
	$("#quantity").slider({
		max: maximum,
		step: users_inventory[index_of_selected].drop_step,
		animate: true,
		slide: function(event, ui){
			document.getElementById('display_quantity').innerHTML = ui.value;
		}
		});
}

/***********************************************************************
 * Called when the "Drop" button is clicked.
 * If more than one item is selected, it drops them all.
 * ********************************************************************/
 function DropItem(index, amount)
 {
	 // first convert to float
	 amount = parseFloat(amount);
	 
	 // if the amount is zero, do nothing but close the window
	 if(amount == 0)
	 {
		 if(document.getElementById('drop_dialog'))
			document.body.removeChild(document.getElementById('drop_dialog'));
			
		return
	 }
	 
	 // first check to see if this item is a drop_whole item
	 if(users_inventory[index].drop_whole || amount == users_inventory[index].amount)
	 {
			 // get this item
			 var drop_item = users_inventory[index];
			 
			 // set it to inactive (no matter what it is!)
			 drop_item.active = false;
			 
			 // if this item is a lamp, darken the screen!
			 if(drop_item.name == LAMP_NAME)
			 {
				 if(Darkness())
					paper.image(NO_LIGHT.src, 0, 0, 604, 420);
			 }
			 
			 			 
			// adjust their point value
			AddPoints("Drop", drop_item);
			 
			 // set its location to HERE
			 drop_item.location_x = Current_Location[0];
			 drop_item.location_y = Current_Location[1];
			 
			 // add this item to the level's item list
			 level_items.push(drop_item);
			 
			 // delete this item from the users_inventory list
			 users_inventory.splice(index, 1);

	}
	else
	{
		// otherwise, drop just the amount specified by making
		// a copy of the item...
		var item = CopyItem(users_inventory[index]);
		
		// setting this new item's coordinates to where the user is
		item.location_x = Current_Location[0];
		item.location_y = Current_Location[1];
		
		// set the new item's amount to what we're subtracting
		item.amount = roundNumber(parseFloat(amount), 2);
		item.updateWeight();
		
		// subtract this amount from the user's inventory item
		users_inventory[index].amount = roundNumber((roundNumber(users_inventory[index].amount,2) - roundNumber(amount,2)), 2);
		users_inventory[index].updateWeight();
		
		// and finally, add this new item to the level item list
		level_items.push(item);
		
		// adjust their point value
		AddPoints("Drop", item);
	}
	
	// if it exists, close our displayed "how much?" dialog
	if(document.getElementById('drop_dialog'))
		document.body.removeChild(document.getElementById('drop_dialog'));

	 // update the displayed inventory list
	 UpdateInventoryList();
	 
	 // update any defense item icons
	UpdateDefenseIcons();
	 
	 // update the weight!
	WeightBar.percentage = WeightPercentage();
	WeightBar.update();
	
 }


/***********************************************************************
 * Called when we need to compute the percentage of weight we have.
 * ********************************************************************/
 function WeightPercentage()
 {
	 // sum up the weights of what we have
	 var weight = 0;
	 for(var i = 0; i < users_inventory.length; i++)
		weight = roundNumber((roundNumber(weight, 2) + roundNumber(users_inventory[i].weight, 2)), 2);
	 
	 // return the percentage of weight we have
	 return roundNumber((parseFloat(weight) / parseFloat(MAX_WEIGHT)), 2);
 }
 
 /***********************************************************************
 * Used for rounding decimal places.
 * ********************************************************************/
 function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

 /**********************************************************************
 * Used to get a perfect DEEP copy of an item.
 * ********************************************************************/
function CopyItem(item1)
{
	var item2 = new Item();
	item2.name = item1.name;
	item2.location_x = item1.location_x;
	item2.location_y = item1.location_y;
	item2.weight = item1.weight;
	item2.amount = item1.amount;
	item2.image = item1.image;
	item2.description = item1.description;
	item2.drop_whoel = item1.drop_whole
	item2.active = item1.active;
	item2.use = item1.use;
	item2.toss = item1.toss;
	item2.getDescription = item1.getDescription;
	item2.getFind = item1.getFind;
	item2.updateWeight = item1.updateWeight;
	
	return item2;
}

/***********************************************************************
 * This function returns true if we do not have a lamp item or if our
 * lamp is not lit (no oil?)
 * ********************************************************************/
function Darkness()
{
	// if the staff has been activated, just return false
	if(staff_activated)
		return false;
	
	// first check to see if we have a lamp
	var lamp_location = -1;
	for(var i = 0; i < users_inventory.length; i++)
		if(users_inventory[i].name == LAMP_NAME)
			lamp_location = i;

			
	// if we don't have a lamp?
	if(lamp_location < 0)
		return true;
		
	// is our lamp already out of oil or inactive?
	if(users_inventory[lamp_location].amount <= 0 || users_inventory[lamp_location].active == false)
		return true;
		
	// otherwise, return false
	return false;
}

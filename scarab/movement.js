
// This function is called when any key is pressed on the keyboard
// It handles movements (arrow keys) and other special key commands
function KeyPress(event)
{	
	if(game_over)
		return;
		
	// if the pickup items dialog is open...and the key is the return key...
	if(pickup_items_dialog_open && event.keyCode == 13)
	{
		// call the pickup items function to pick up the selected items, and return
		PickupItems();
		return;
	}
	
	if(settings_panel)
	{
		AssignKey(event);
		return;
	}
		
	if(save_game_dialog_open || pickup_items_dialog_open)
		return;
		
	
	// Command Keys
	switch(event.keyCode)
	{
			case level_key:	// L
				// display the level number they are on
				alert("You are on level " + current_level);
				return false;
				break;
			case map:	// M
				// toggle the Map
				ToggleMap();
				return false;
				break;
			case use_item:	// U
				// call the "Use" onclick function
				UseSelectedItem();
				return false;
				break;
			case drop:	// D
				// call the "Drop" onclick function
				DropDialog();
				return false;
				break;
			case pickup:	// P
				// call the "Pickup" onclick function
				PickupItem();
				return false;
				break;
			//case 87:	// W
				// display the inner width and inner height
				//alert("Inner Width: " + window.innerWidth + "\nInner Height: " + window.innerHeight);
				//return false;
				//break;
	}
	
	// return if we're viewing the map (prevent accidental moving)
	if(document.getElementById('view_map_button').innerHTML == 'Close Map')
		return true;
	
	
	
	// Movement keys
	//	37: Left
	//	38: Up
	//	39: Right
	//	40: Down
	switch(event.keyCode)
	{
		case left:	// Turn Left
			LeftTurn();
			return false;
			break;
		case forward:	// Go Forward
			MoveForward();
			return false;
			break;
		case right:	// Turn Right
			RightTurn();
			return false;
			break;
		case backward:	// Take a step backwards
			MoveBackward();
			return false;
			break;
	}
	return true;
}


// This function is called when the "Forward" key is pressed
// It simply moves the user to the cell that they are facing by 1,
// depending on their current direction.
function MoveForward()
{
	// do nothing if we're at a wall
    if(WallAt(1))
    {
        return;
    }
    
    // do nothing if we weigh too much
    if(WeightBar.percentage >= 1)
		return;
    
    // update our location based on our direction
    switch(Current_Direction)
    {
        case 0:     // North
            Current_Location[1] -= 1;
            break;
        case 1:     // East
            Current_Location[0] += 1;
            break;
        case 2:     // South
            Current_Location[1] += 1;
            break;
        case 3:     // West
            Current_Location[0] -= 1;
            break;
    }
    
    // reset our NPC steps
    ResetSteps();
    
    // show we've visited this area
    Maze[Current_Location[0]][Current_Location[1]][4] = 'v';
    
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
    
    UpdateView();
    
	// draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
		
	// update the selected Item's description, if any
	//UpdateDescription();
        
    // check for items below our feet
    var item_list = GetItemsHere(false);
    
    // make sure the pickup button is disabled...for now
    document.getElementById('pickup_button').disabled = 'disabled';
	var itemlist = 'You found ';
	var found_items = 0;
	var npcs_found = 0;
    if(item_list.length > 0)
    {
		for(var i = 0; i < item_list.length; i++)
		{
				
			if(i == item_list.length - 1 && i != 0 && item_list[i] != undefined)
				itemlist += 'and '+ item_list[i].getFind();
			else
				if(item_list.length > 1)
					itemlist += item_list[i].getFind() + ', ';
				else
					itemlist += item_list[i].getFind();
			found_items++;
			
			if(NPC.prototype.isPrototypeOf(item_list[i]))
				npcs_found++;
		}
	}
	
	// get the list WITH traps
	item_list = GetItemsHere(true);
	var trap_in_list = false;
	if(item_list.length > 0)
	{
		for(var i = 0; i < item_list.length; i++)
		{
			if(Trap.prototype.isPrototypeOf(item_list[i]))
			{
				itemlist += ' resting on a loose tile on the floor...';
				trap_in_list = true;
				break;
			}
		}
	}
	
	if(!trap_in_list)
		itemlist += '!';
	
	// show this list of items
	if(found_items > 0)
		AddMessage(itemlist);
	
	// enable the pickup button if we have something other than an NPC!
	if(npcs_found != item_list.length)
		document.getElementById('pickup_button').disabled = '';
	
	// check for traps we've landed on
	if(traps.length > 0)
	{
		for(var i = 0; i < traps.length; i++)
		{
			if(traps[i].location_x == Current_Location[0] && traps[i].location_y == Current_Location[1] && GetItemsHere(false).length == 0)
				traps[i].land();
		}
	}

	// update our lamp's oil, if we have one
	UpdateLampOil();
	
	// update our hunger!
	UpdateHunger();
}

// This function is called when the "Backward" key is pressed
// It simply moves the user to the cell that they are facing away from by 1,
// depending on their current direction.
function MoveBackward()
{
    // check for a wall behind us
    if(WallAt(-1))
    {
        return;
    }
    
    // do nothing if we weigh too much
    if(WeightBar.percentage >= 1)
		return;
    
    // update our location based on our direction
    switch(Current_Direction)
    {
        case 0:     // North
            Current_Location[1] += 1;
            break;
        case 1:     // East
            Current_Location[0] -= 1;
            break;
        case 2:     // South
            Current_Location[1] -= 1;
            break;
        case 3:     // West
            Current_Location[0] += 1;
            break;
    }
    
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
    
    UpdateView();
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
    
    // update the selected Item's description, if any
	//UpdateDescription();
    
    // check for items below our feet
    var item_list = GetItemsHere(true);
    
    // make sure the pickup button is disabled...for now
    document.getElementById('pickup_button').disabled = 'disabled';
	var itemlist = 'You found ';
	var found_items = 0;
	var npcs_found = 0;
    if(item_list.length > 0)
    {
		for(var i = 0; i < item_list.length; i++)
		{
				
			if(i == item_list.length - 1 && i != 0 && item_list[i] != undefined)
				itemlist += 'and '+ item_list[i].getFind();
			else
				if(item_list.length > 1)
					itemlist += item_list[i].getFind() + ', ';
				else
					itemlist += item_list[i].getFind();
			found_items++;
			
			if(NPC.prototype.isPrototypeOf(item_list[i]))
				npcs_found++;
		}
	}
	
	// get the list WITH traps
	item_list = GetItemsHere(true);
	var trap_in_list = false;
	if(item_list.length > 0)
	{
		for(var i = 0; i < item_list.length; i++)
		{
			if(Trap.prototype.isPrototypeOf(item_list[i]))
			{
				itemlist += ' resting on a loose tile on the floor...';
				trap_in_list = true;
				break;
			}
		}
	}
	
	if(!trap_in_list)
		itemlist += '!';
	
	// show this list of items
	if(found_items > 0)
		AddMessage(itemlist);
	
	// enable the pickup button if we have something other than an NPC!
	if(npcs_found != item_list.length)
		document.getElementById('pickup_button').disabled = '';
	
	// check for traps we've landed on
	if(traps.length > 0)
	{
		for(var i = 0; i < traps.length; i++)
		{
			if(traps[i].location_x == Current_Location[0] && traps[i].location_y == Current_Location[1] && GetItemsHere(false).length == 0)
				traps[i].land();
		}
	}
	
	// update our lamp's oil, if we have one
	UpdateLampOil();
	
	// update our hunger!
	UpdateHunger();
}

// This function is called when the "Left" key is pressed
// It simply changes the user's direction counter-clockwise,
// and updates the current view
function LeftTurn()
{
	// do nothing if we weigh too much
    if(WeightBar.percentage >= 1)
		return;
	
    // update our direction based on our direction
    switch(Current_Direction)
    {
        case 0:     // North
            Current_Direction = 3;
            break;
        case 1:     // East
            Current_Direction = 0;
            break;
        case 2:     // South
            Current_Direction = 1;
            break;
        case 3:     // West
            Current_Direction = 2;
            break;
    }
    ANGLE = ANGLE - 90;
    
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
    
    UpdateView();
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
		
	// update the selected Item's description, if any
	//UpdateDescription();
	
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
		//AddMessage(itemlist);
		
		// enable the pickup button!
		document.getElementById('pickup_button').disabled = '';
	}
	
	// check for traps we've landed on
	/*if(traps.length > 0)
	{
		for(var i = 0; i < traps.length; i++)
		{
			if(traps[i].location_x == Current_Location[0] && traps[i].location_y == Current_Location[1])
				traps[i].land();
		}
	}*/
}


// This function is called when the "Right" key is pressed
// It simply changes the user's direction clockwise,
// and updates the current view
function RightTurn()
{
	// do nothing if we weigh too much
    if(WeightBar.percentage >= 1)
		return;
	
    // update our direction based on our direction
    switch(Current_Direction)
    {
        case 0:     // North
            Current_Direction = 1;
            break;
        case 1:     // East
            Current_Direction = 2;
            break;
        case 2:     // South
            Current_Direction = 3;
            break;
        case 3:     // West
            Current_Direction = 0;
            break;
    }
    ANGLE = ANGLE + 90;
    
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
    
    UpdateView();
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
		
	// update the selected Item's description, if any
	//UpdateDescription();
	
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
		//AddMessage(itemlist);
		
		// enable the pickup button!
		document.getElementById('pickup_button').disabled = '';
	}
	
	// check for traps we've landed on
	/*if(traps.length > 0)
	{
		for(var i = 0; i < traps.length; i++)
		{
			if(traps[i].location_x == Current_Location[0] && traps[i].location_y == Current_Location[1])
				traps[i].land();
		}
	}*/
}

// This function takes in either 1 or -1 (forward/backward respectively)
// If forward, it checks to see if there is a wall right in front of us
// (meaning if we take a step forward, will we run into a wall?)
// If backward, it checks the same (if we step backward, will we run into
// a wall?)
function WallAt(step)
{
	// check the next cell based on our current direction
	switch(Current_Direction)
	{
		case 0:		// North
			// check the 0 element of the maze of our current location
			if(step == 1)
			{
				if(Maze[Current_Location[0]][Current_Location[1]][0] == 1)
					return true;
				else
					return false;
			}
			else
			{
				if(Maze[Current_Location[0]][Current_Location[1]][2] == 1)
					return true;
				else
					return false;
			}
			break;
		case 1:		// East
			// check the 1 element of the maze of our current location
			if(step == 1)
			{
				if(Maze[Current_Location[0]][Current_Location[1]][1] == 1)
					return true;
				else
					return false;
			}
			else
			{
				if(Maze[Current_Location[0]][Current_Location[1]][3] == 1)
					return true;
				else
					return false;
			}
			break;
		case 2:		// South
			// check the 1 element of the maze of our current location
			if(step == 1)
			{
				if(Maze[Current_Location[0]][Current_Location[1]][2] == 1)
					return true;
				else
					return false;
			}
			else
			{
				if(Maze[Current_Location[0]][Current_Location[1]][0] == 1)
					return true;
				else
					return false;
			}
			break;
		case 3:		// West
			// check the 1 element of the maze of our current location
			if(step == 1)
			{
				if(Maze[Current_Location[0]][Current_Location[1]][3] == 1)
					return true;
				else
					return false;
			}
			else
			{
				if(Maze[Current_Location[0]][Current_Location[1]][1] == 1)
					return true;
				else
					return false;
			}
			break;
	}
	return true;
}


// This function simply lets the user know if they're at the end of the maze
function CheckFinish()
{
    if(Current_Location[0] == STARTING_X && Current_Location[1] == STARTING_Y)
    {
        return true;
    }
    return false;
}

// Runs through the maze and checks to see if any of the 5th elements are "n"
// If any are, it returns false.  If none are, it returns true.
function MapSeen()
{
	for(var i = 0; i < Maze.length; i++)
	{
		for(var j = 0; j < Maze[i].length; j++)
		{
			if(Maze[i][j][4] == 'n')
				return false;
		}
	}
	return true;
}

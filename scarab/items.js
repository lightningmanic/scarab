/***********************************************************************
 * 			ANCIENT ARTIFACTS
 * ********************************************************************/
//----------------- Scarab of RA ----------------//
var SCARAB_DESC = 'A small ancient artifact, this amulet appears to be a dung beetle surrounded by an amber-colored substance.  Though it is nearly 4000 years old, it strangly looks like it is resting rather than dead.';
var SCARAB_WEIGHT = 1.0;
var SCARAB_IMAGE;
var SCARAB_NAME = 'scarab of Ra';

function SetupScarab()
{
	// create a new scarab
	var scarab = new Item();
	scarab.name = SCARAB_NAME;
	scarab.weight = SCARAB_WEIGHT;
	scarab.description = SCARAB_DESC;
	scarab.amount = 1;
	scarab.drop_whole = true;
	
	// find a random location to place the scarab at
	scarab.location_x = Math.floor(Math.random()*WIDTH);
	scarab.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the scarab
	scarab.image = SCARAB_IMAGE;
	
	// add the actions
	scarab.use = function(){
		// if they have their Master's degree...
		if(GetEducation() == "Master's")
		{
			alert("With the knowledge and experience you've gained, you speak the translated words decyphered from near-by walls.  Your voice echoes, and the amber begins to crack!");
			alert("The beetle within bursts forth and disappears into the darkness...");
			
			// the scarab has been activated!
			scarab_activated = true;
			
			// is there a mummy in the level?
			KillMummy();
			
			// remove one scarab from the user's inventory (if there's more than one)
			if(this.amount > 1)
				this.amount = this.amount - 1;
			else
			{
				for(var i = 0; i < users_inventory.length; i++)
				{
					if(users_inventory[i] == this)
						users_inventory.splice(i, 1);
				}
			}
			
			// reset the scarab somewhere in this level
			SetupScarab();
			
			UpdateInventoryList();
			
			//document.getElementById('inventory_description').innerHTML = '';
			
			// update the weight!
			WeightBar.percentage = WeightPercentage();
			WeightBar.update();
			return;
		}
		
		// if they have their Ph.D....
		if(GetEducation() == "Ph.D.")
		{
			alert("Your continuous research has allowed you to refine the translations written on any wall you have seen thus far, so you speak these words and they echo throughout the halls you stand in...");
			alert("With a sudden burst the beetle within comes to life and disappears momentarily around the nearest corner.  Within moments it comes back to you and takes it's amulet shape once more.");
			scarab_activated = true;
			// is there a mummy in the level?
			KillMummy();
			return;
		}
		
		// everything else...
		// check if there's a mummy in front of us...
		for(var i = 0; i < 1; i++)
		{
			// find the mummy
			var mummy_location = -1;
			for(var j = 0; j < NPC_list.length; j++)
				if(NPC_list[j].name == 'mummy')
					mummy_location = j;
					
			if(mummy_location == -1)
				break;
				
			if(current_front == 0 && NPC_list[mummy_location].location_x == GetLocationFrom(1)[0] && NPC_list[mummy_location].location_y == GetLocationFrom(1)[1])
			{
				KillMummy();
				return;
			}
			
			if(one_front == 0 && NPC_list[mummy_location].location_x == GetLocationFrom(1)[0] && NPC_list[mummy_location].location_y == GetLocationFrom(1)[1])
			{
				KillMummy();
				return;
			}
			
			if(current_front == 1 || one_front == 1)
				break;
				
			if(two_front == 0 && NPC_list[mummy_location].location_x == GetLocationFrom(2)[0] && NPC_list[mummy_location].location_y == GetLocationFrom(2)[1])
			{
				KillMummy();
				return;
			}
			if(two_front == 1)
				break;
				
			if(three_front == 0 && NPC_list[mummy_location].location_x == GetLocationFrom(3)[0] && NPC_list[mummy_location].location_y == GetLocationFrom(3)[1])
			{
				KillMummy();
				return;
			}
			if(three_front == 1)
				break;
				
			if(four_front == 0 && NPC_list[mummy_location].location_x == GetLocationFrom(4)[0] && NPC_list[mummy_location].location_y == GetLocationFrom(4)[1])
			{
				KillMummy();
				return;
			}
			if(four_front == 1)
				break;
				
			if(five_front == 0 && NPC_list[mummy_location].location_x == GetLocationFrom(5)[0] && NPC_list[mummy_location].location_y == GetLocationFrom(5)[1])
			{
				KillMummy();
				return;
			}
			if(five_front == 1)
				break;
			
		}
		// if no mummy is in front of us...
		AddMessage("You observe the scarab closely - the dung beetle inside is shiny and colorful, and for a second, appeared to shift inside its amber tomb.  You're just not sure what to do with it, but you better keep it!");
	};
	
	// add the description get
	scarab.getDescription = function(){return this.description;};
	
	scarab.getFind = function(){
		if(this.amount == 1)
			return 'an ancient scarab';
		else
			return this.amount + ' ancient scarabs';
		};
	
	return scarab;
}

// This function is used when we need to load a scarab from a saved game.
// It calls the "SetupScarab()" function and sets all other attributes to
// those that were passed in.
// It then returns this object.
function Scarab_Item(active, amount, location_x, location_y, weight)
{
	// get a new scarab
	var scarab = SetupScarab();
	
	// set all passed in attributes
	scarab.active = active;
	scarab.amount = amount;
	scarab.location_x = location_x;
	scarab.location_y = location_y;
	scarab.weight = weight;
	
	return scarab;
}



//----------------- Staff of RA ----------------//
var STAFF_DESC = 'A tall staff made of gold, silver, and gems.  It has the symbol of the hawk on top, with the Sun in its eye.  The eye of the hawk sparkles magnificently pulling in any eyes that gaze at it.  However, the deep ruby-red eyes of the serpent warn you that this staff may hold a secret, deadly power.';
var STAFF_WEIGHT = 10.0;
var STAFF_IMAGE;
var STAFF_NAME = 'staff of Ra';

// has the staff been rendered?
var STAFF_CREATED = false;

function SetupStaff()
{
	// create a new staff
	var staff = new Item();
	staff.name = STAFF_NAME;
	staff.weight = STAFF_WEIGHT;
	staff.description = STAFF_DESC;
	staff.amount = 1;
	staff.drop_whole = true;
	
	// find a random location to place the staff at
	staff.location_x = Math.floor(Math.random()*WIDTH);
	staff.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the staff
	staff.image = STAFF_IMAGE;
	
	// this item IS tall!
	staff.tall = true;
	
	// add the actions
	staff.use = function(){
		// if they have a Ph.D....)
		if(GetEducation() == 'Ph.D.')
		{
			alert("Your experience has allowed you to discover the secrets of the staff and the power behind it.  You grasp the staff, and the warm feeling your hands felt before now makes you feel connected.");
			alert("With a thrust on the ground, the eye of the hawk begins to sparkle.  One more thrust and a light shines as bright as the sun, lighting up the halls around you brighter than your lamp!");
			staff_activated = true;
			
			UpdateView();
			return;
		}
		
		// if they have their Master's
		if(GetEducation() == 'Master\'s')
		{
			// cure any poison, if they are poisoned
			if(health_status == 'Poisoned')
			{
				health_status = 'Good';
				UpdateHealthStatus();
				alert("With your advanced research experience, you've discovered how to extract anti-venom from the serpent's fangs!  You are now cured of your poison!");
				return;
			}
			else
			{
				alert("It's a beautiful artifact full of potential power, but none that is useful at the time.");
				return;
			}
		}
		
		// if they have a Bachelor's, it actually burns out their lamp and spills some oil
		if(GetEducation() == 'Bachelor\'s')
		{
			alert("As you fiddle with this ancient artifact, the eyes of the serpent start to glow...and the sound of a distant hiss can be heard.");
			// find the lamp in the user's inventory
			var index = -1;
			for(var i = 0; i < users_inventory.length; i++)
				if(users_inventory[i].name == LAMP_NAME)
					index = i;
					
			if(i >= 0)
			{
				// blow out the lamp
				users_inventory[index].active = false;
				// remove a random amount of oil
				var oil_remove = Math.floor((Math.random()*8)+1);
				if(oil_remove >= users_inventory[index].amount)
					users_inventory[index].amount = 0;
				else
					users_inventory[index].amount = roundNumber((users_inventory[index].amount - oil_remove), 2);
					
				// update the weight
				users_inventory[index].updateWeight();
			
				 // draw darkness, if we're out of oil or do not have a lamp
				if(Darkness())
					paper.image(NO_LIGHT.src, 0, 0, 604, 420);
				alert("A sudden burst of wind swirls all around you!  In your frantic state, you managed to spill some oil out of your lamp...");
			}
			else
				alert("A sudden burst of wind swirls all around you, and the eyes of the serpent return to their lifeless state.");
				
			return;
			
		}
		
		// if they have their associates's, it stings them and does damage to health
		if(GetEducation() == 'Associate\'s')
		{
			alert("You begin to run your fingers across the two figures on the staff.  The hawk on top is smooth and cool to the touch.  You inspect the serpent and notice it's long fangs...");
			alert("As your finger reaches the tip of the serpent's fangs...OUCH!  Your finger now has a cut!  You also notice that a strange venom-looking liquid is dripping from the fangs...");
			health = health - 5;
			HealthBar.percentage = roundNumber((health / 100), 2);
			HealthBar.update();
			health_status = 'Poisoned';
			UpdateHealthStatus();
			
			// check our health
			if(health <= 0)
			{
				
				// set the map to black
				document.getElementById('map_view').style.backgroundColor = '#000';
				document.getElementById('map_view').innerHTML = '';
				document.getElementById('map_view').style.display = 'block';
				
				alert("You've died of your wounds!");
				game_over = true;
				GameOver();
				return;
			}
			
			return;
		}
		 
		AddMessage("As you grasp the staff, your hands begin tingling and the eyes of the serpent appear brighter.  The longer you hold it, the more drawn in you are to the serpent's eyes, and the hotter your hands feel.  Out of a sudden rush of fear, you snap out of the serpent's spell and let go!  Better keep it tucked away safe...");
	};
	
	// add the description get
	staff.getDescription = function(){return this.description;};
	
	staff.getFind = function(){return 'the staff of RA';};
	
	return staff;
}

// This function is used when we need to load a staff from a saved game.
// It calls the "SetupStaff()" function and sets all other attributes to
// those that were passed in.
// It then returns this object.
function Staff_Item(active, amount, location_x, location_y, weight)
{
	// grab a staff
	var staff = SetupStaff();
	
	staff.active = active;
	staff.amount = amount;
	staff.location_x = location_x;
	staff.location_y = location_y;
	staff.weight = weight;
	
	return staff;
}

//----------------- Crown of RA ----------------//
var CROWN_DESC = 'A heavy head-dress made of gold, it carries a serpent\'s head on the brow.';
var CROWN_WEIGHT = 15.0;
var CROWN_IMAGE;
var CROWN_NAME = 'crown of Ra';

// has the crown been rendered?
var CROWN_CREATED = false;


function SetupCrown()
{
	// create a new crown
	var crown = new Item();
	crown.name = CROWN_NAME;
	crown.weight = CROWN_WEIGHT;
	crown.description = CROWN_DESC;
	crown.amount = 1;
	crown.drop_whole = true;
	
	// find a random location to place the crown at
	crown.location_x = Math.floor(Math.random()*WIDTH);
	crown.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the crown
	crown.image = CROWN_IMAGE;
	
	// add the actions
	crown.use = function(){
		// if they have their Ph.D...
		if(GetEducation() == 'Ph.D.')
		{
			// check to see if there are any ancient artifacts on this level
			var index = -1;
			for(var i = 0; i < level_items.length; i++)
				if(level_items[i].name == SCARAB_NAME || level_items[i].name == CROWN_NAME || level_items[i].name == STAFF_NAME)
					index = i;
					
			// if the index is not -1...
			if(index >= 0)
			{
				alert("As you study the crown closely, you notice an odd twinkle in the serpant's eye...");
				alert("The closer you look, you begin to faintly make out a shape...one that possibly looks like the " + level_items[index].name + "...");
				return;
			}
			
			// otherwise....
			alert("It's a beautiful crown, quite heavy though and you wonder how uncomfortable it would make a person feel while wearing it...");
		}
		
		// if they have their master's...
		if(GetEducation() == 'Master\'s')
		{
			// check to see if there are any ancient artifacts on this level
			var index = -1;
			for(var i = 0; i < level_items.length; i++)
				if(level_items[i].name == SCARAB_NAME || level_items[i].name == CROWN_NAME || level_items[i].name == STAFF_NAME)
					index = i;
					
			// if the index is not -1...
			if(index >= 0)
			{
				alert("You study the crown closely and notice the eyes on the serpant's head have a faint glow about them...");
				return;
			}
			
			// otherwise....
			alert("It's a beautiful crown, quite heavy though and you wonder how uncomfortable it would make a person feel while wearing it...");
		}
		AddMessage("It seems too heavy when you try to put it on, and slips off awkwardly to the side.");
	};
	
	// add the description get
	crown.getDescription = function(){return this.description;};
	
	crown.getFind = function(){return 'the crown of RA'};
	
	return crown;
}

// This function is used when we need to load a crown from a saved game.
// It calls the "SetupCrown()" function and sets all other attributes to
// those that were passed in.
// It then returns this object.
function Crown_Item(active, amount, location_x, location_y, weight)
{
	// grab a crown
	var crown = SetupCrown();
	
	// assign our attributes
	crown.active = active;
	crown.amount = amount;
	crown.location_x = location_x;
	crown.location_y = location_y;
	crown.weight = weight;
	
	return crown;
}


/***********************************************************************
 * 						OTHER FOUND ITEMS
 **********************************************************************/
 

//------------ KEY ---------------//

//Details about the KEY object
var KEY_DESC = 'A skeleton-style key that appears rusty, yet has a hidden shimmer when held just right.';
var KEY_WEIGHT = 0.1;
var KEY_IMAGE;
var KEY_NAME = 'key';

function SetupKey()
{
	// create a new Key
	var key = new Item();
	key.name = KEY_NAME;
	key.weight = KEY_WEIGHT;
	key.description = KEY_DESC;
	key.amount = 1;
	key.drop_whole = true;
	
	// find a random location to place the key at
	key.location_x = Math.floor(Math.random()*WIDTH);
	key.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the key
	key.image = KEY_IMAGE;
	
	// add the key actions
	key.use = function(){
		// first check to make sure we're standing in front of the exit door
		if(!CheckFinish() || Current_Direction != 1)
		{
			//document.getElementById('inventory_description').innerHTML = 
			AddMessage("You feel around the walls, but find no key hole.");
			return;
		}
		
		
		// if we ARE there, let's open the door and start a new level!
		if(CheckFinish() && Current_Direction == 1)
		{		
			// remove the key object from the users_inventory
			for(var i = 0; i < users_inventory.length; i++)
			{
				if(users_inventory[i] == this)
					users_inventory.splice(i, 1);
			}
					
			// Add points
			AddPoints('Use', this);
			
			NextLevel();
			
			return;
		}
	};
	
	// add the description
	key.getDescription = function(){return this.description;};
	
	key.getFind = function(){return 'an old rusty key';};
	
	return key;
}

// This function is used when we need to load a key from a saved game.
// It calls the "SetupKey()" function and sets all other attributes to
// those that were passed in.
// It then returns this object.
function Key_Item(active, amount, location_x, location_y, weight)
{
	// grab a key
	var key = SetupKey();
	
	// assign our attributes
	key.active = active;
	key.amount = amount;
	key.location_x = location_x;
	key.location_y = location_y;
	key.weight = weight;
	
	return key;
}

//----------------- LAMP ------------------//

//Details about the Lamp object
var LAMP_DESC = 'An oil-burning lamp that looks kind of like a genie\'s home.';
var LAMP_WEIGHT = 2;
var LAMP_IMAGE;
var LAMP_NAME = 'lamp';
var NO_LIGHT;
var LAMP_MAX_OIL = 8.0;

// how many pints of oil will burn for every step we take?
var pints_per_step = 0.1;

// Generates a lamp object and returns it
function SetupLamp()
{
	// create a new lamp
	var lamp = new Item();
	lamp.name = LAMP_NAME;
	lamp.weight = LAMP_WEIGHT + (LAMP_MAX_OIL * OIL_WEIGHT);
	lamp.description = LAMP_DESC;
	lamp.amount = LAMP_MAX_OIL;
	lamp.active = true;
	lamp.drop_whole = true;
	
	// image of the lamp
	lamp.image = LAMP_IMAGE;
	
	// add the lamp actions
	lamp.use = function(){
		// first we need to check how much oil remains (stored in "amount")
		if(this.amount >= 1)
		{
			// light this puppy up!
			if(this.active)
			{
				AddMessage("Your lamp is already lit.  It contains " + this.amount + " pint(s) of oil.");
				return;
			}
			// set the active state of our lamp
			this.active = true;
			
			// Update the view!
			UpdateView();
			// draw darkness, if we're out of oil or do not have a lamp
			if(Darkness())
				paper.image(NO_LIGHT.src, 0, 0, 604, 420);
			
			AddPoints('Use', this);
		}
		else
		{
			AddMessage("You don't have any oil in your lamp!");
		}
	};
	
	// add the description
	lamp.getDescription = function(){
		if(this.amount == 1)
			return this.description + ' There is ' + this.amount + ' pint of oil left in your lamp.';
		else
			return this.description + ' There are ' + this.amount + ' pints of oil left in your lamp.';
	};
	
	lamp.getFind = function(){return 'an oil lamp';};
	
	lamp.updateWeight = Lamp_UpdateWeight;
	
	return lamp;
}

function UpdateLampOil()
{
	// get the lamp object from our inventory
	var lamp_location = -1;
	for(var i = 0; i < users_inventory.length; i++)
		if(users_inventory[i].name == LAMP_NAME)
			lamp_location = i;
			
	// if we don't have a lamp?
	if(lamp_location < 0)
		return;
		
	// is our lamp lit?
	if(!users_inventory[lamp_location].active)
		return;
		
	// is our lamp is already out of oil?
	if(roundNumber(users_inventory[lamp_location].amount, 2) <= 0.0)
	{
		users_inventory[lamp_location].amount = 0;
		return;
	}
		
	// otherwise, subtract our oil per step amount
	users_inventory[lamp_location].amount = roundNumber((roundNumber(users_inventory[lamp_location].amount, 2) - roundNumber(pints_per_step, 2)), 2);
	// also, since we've burned a little bit of oil, let's subtract that amount of weight
	users_inventory[lamp_location].weight = roundNumber((roundNumber(users_inventory[lamp_location].weight, 2) - roundNumber((pints_per_step * OIL_WEIGHT), 2)), 2);
	
	// update the weight!
	WeightBar.percentage = WeightPercentage();
	WeightBar.update();
	
	// check to see if we need to burn out the lamp
	if(roundNumber(users_inventory[lamp_location].amount, 2) <= 0)
		BurnOutLamp(users_inventory[lamp_location]);
}


// This function is called when the user runs out of oil for their lamp.
// It sets the status of our lamp to inactive and makes our screen harder to see
function BurnOutLamp(lamp_item)
{
	if(lamp_item.active)
	{
		lamp_item.active = false;
		//document.getElementById('inventory_description').innerHTML = 
		AddMessage("Oh no!  You've burned out all of your oil!");
		lamp_item.amount = 0;
		
		// update the screen!
		UpdateView();
		// draw darkness, if we're out of oil or do not have a lamp
		if(Darkness())
			paper.image(NO_LIGHT.src, 0, 0, 604, 420);
	}
}

// called when a pint of oil is burned.  must update weight of lamp!
function Lamp_UpdateWeight()
{
	this.weight = LAMP_WEIGHT + (this.amount * OIL_WEIGHT);
	// update the weight!
	WeightBar.percentage = WeightPercentage();
	WeightBar.update();
}

function Lamp_Item(active, amount, location_x, location_y, weight)
{
	// grab a lamp
	var lamp = SetupLamp();
	
	// set our attributes
	lamp.active = active;
	lamp.amount = amount;
	lamp.location_x = location_x;
	lamp.location_y = location_y;
	lamp.weight = weight;
	
	return lamp;
}

//------------ OIL ------------//

//Details about the oil object
var OIL_DESC = 'Used to burn in lamps.';
var OIL_WEIGHT = 0.2; //(per amount!)
var OIL_IMAGE; 
var OIL_NAME = 'can of oil';
var OIL_STEP = 0.1;

function SetupOil()
{
	// create a new can of oil
	var oil = new Item();
	oil.name = OIL_NAME;
	oil.description = OIL_DESC;
	oil.amount = Math.floor(Math.random()*9)+1;
	oil.weight = OIL_WEIGHT * oil.amount;
	
	// find a random location to place the can of oil at
	oil.location_x = Math.floor(Math.random()*WIDTH);
	oil.location_y = Math.floor(Math.random()*HEIGHT);
	
	// drop amount
	oil.drop_step = OIL_STEP;
	
	// image of the can
	oil.image = OIL_IMAGE;
	
	// add the can's actions
	oil.use = function(){
			// find our lamp item to add oil to
			var lamp_location = -1;
			for(var i = 0; i < users_inventory.length; i++)
				if(users_inventory[i].name == LAMP_NAME)
					lamp_location = i;

					
			// if we don't have a lamp?
			if(lamp_location < 0)
			{
				AddMessage("You don't have a lamp to put oil into!");
				return;
			}
			
			// use only what the lamp can hold!
			if(users_inventory[lamp_location].amount >= LAMP_MAX_OIL)
			{
				AddMessage("Your lamp is already full of oil.");
				return;
			}
			
			// how much more oil can we put in?
			var acceptable_amount = roundNumber((LAMP_MAX_OIL - users_inventory[lamp_location].amount), 2);
			
			// if we have less than (or equal to) this much oil, just add this oil and
			// remove the oil object
			if(this.amount <= acceptable_amount)
			{
				users_inventory[lamp_location].amount = roundNumber(roundNumber(users_inventory[lamp_location].amount, 2) + roundNumber(this.amount, 2), 2);
				users_inventory[lamp_location].weight = roundNumber(roundNumber(roundNumber(users_inventory[lamp_location].weight, 2) + (this.amount * OIL_WEIGHT), 2), 2);
				
				//document.getElementById('inventory_description').innerHTML = 
				AddMessage("Your lamp now holds " + users_inventory[lamp_location].amount + " pints of oil.");
				
				// remove the oil item from the users_inventory
				for(var i = 0; i < users_inventory.length; i++)
				{
					if(users_inventory[i] == this)
						users_inventory.splice(i, 1);
				}
				
				UpdateInventoryList();
				
				// update the weight!
				WeightBar.percentage = WeightPercentage();
				WeightBar.update();
				
				// Add points!
				AddPoints('Use', this);
				
				return;
			}
			
			// otherwise, subtract what oil we can use and leave the rest alone
			users_inventory[lamp_location].amount += roundNumber(acceptable_amount, 2);
			users_inventory[lamp_location].weight += roundNumber((acceptable_amount * OIL_WEIGHT), 2);
			this.amount = roundNumber((roundNumber(this.amount, 2) - roundNumber(acceptable_amount, 2)), 2);
			this.weight = roundNumber((roundNumber(this.weight, 2) - roundNumber((acceptable_amount * OIL_WEIGHT), 2)), 2);
			
			//document.getElementById('inventory_description').innerHTML = 
			AddMessage("Your lamp now holds " + users_inventory[lamp_location].amount + " pints of oil.");
			
			// update the weight!
			WeightBar.percentage = WeightPercentage();
			WeightBar.update();
			
			// Add points!
			AddPoints('Use', this);
	};
	
	oil.getFind = function(){return "a can containing " + this.amount + " pints of oil";};
	
	// add the description function
	oil.getDescription = function(){
			if(this.amount == 1)
				return this.description + ' You have '+this.amount+' pint of oil in this can.';
			else
				return this.description + ' You have '+this.amount + ' pints of oil in this can.';
	};
	
	// function to update weight
	oil.updateWeight = function(){this.weight = OIL_WEIGHT * this.amount;};
	
	return oil;
}

function Oil_Item(active, amount, location_x, location_y, weight)
{
	// grab some oil!
	var oil = SetupOil();
	
	// assign our attributes
	oil.active = active;
	oil.amount = amount;
	oil.location_x = location_x;
	oil.location_y = location_y;
	oil.weight = weight;
	
	return oil;
}

//------------------ FOOD -----------------//

//Details about the food object
var FOOD_DESC = 'Delicious assortments of bread, dried fruit, and honey.';
var FOOD_WEIGHT = 0.5; //(per amount!)
var FOOD_IMAGE; // = 'images/objects/food.png';
var FOOD_NAME = 'food';
// how much hunger does one bite of food take care of?
var FOOD_HUNGER = 10;

function SetupFood()
{
	// create a new food item
	var food = new Item();
	food.name = FOOD_NAME;
	food.description = FOOD_DESC;
	food.amount = Math.floor(Math.random()*4)+1;
	food.weight = FOOD_WEIGHT * food.amount;
	
	// find a random location to place the food at
	food.location_x = Math.floor(Math.random()*WIDTH);
	food.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the food
	food.image = FOOD_IMAGE;
	
	// add the food actions
	food.use = function(){
		// if we're already full, don't do anything
		if(hunger <= 0)
		{
			//document.getElementById('inventory_description').innerHTML = 
			AddMessage("You couldn't possibly eat another bite...");
			return;
		}
		
		// make sure that our food is worth while...
		if(hunger < FOOD_HUNGER)
		{
			//document.getElementById('inventory_description').innerHTML = 
			AddMessage("Better wait until you're a bit more hungry first...");
			return;
		}
		
		// otherwise, subtract from food one ounce (and one food weight from our weight)
		this.amount = roundNumber((roundNumber(this.amount, 2) - 1), 2);
		this.weight = roundNumber((roundNumber(this.weight, 2) - roundNumber(FOOD_WEIGHT,2)), 2);
		hunger = roundNumber((roundNumber(hunger, 2) - roundNumber(FOOD_HUNGER,2)), 2);
		
		// did we use the last of our food?
		if(this.amount <= 0)
		{
			// remove this item from the inventory list
			for(var i = 0; i < users_inventory.length; i++)
				if(users_inventory[i] == this)
					users_inventory.splice(i,1);
					
			// update our inventory
			UpdateInventoryList();
			
		}
		
		// make sure our hunger didn't go below zero!
		if(hunger <= 0)
			hunger = 0;
		
		// update the hunger bar
		HungerBar.percentage = roundNumber((hunger / MAX_HUNGER), 2);
		HungerBar.update();
		
		// Add points
		AddPoints('Use', this);
	};
	
	food.getFind = function(){return this.amount + " ounces of food";};
	
	// add the description function
	food.getDescription = function(){
		if(this.amount == 1)
			return this.description + ' You have '+this.amount + ' ounce of food.';
		else
			return this.description + ' You have '+this.amount + ' ounces of food.';
	};
	
	// update weight
	food.updateWeight = function(){this.weight = FOOD_WEIGHT * this.amount;};
	
	return food;
}


function Food_Item(active, amount, location_x, location_y, weight)
{
	// grab some food
	var food = SetupFood();
	
	// update our attributes
	food.active = active;
	food.amount = amount;
	food.location_x = location_x;
	food.location_y = location_y;
	food.weight = weight;
	
	return food;
}

/*************************** ANTI POISON ******************************/
//Details about the KEY object
var ANTI_DESC = 'An old-fashion cure for poison.';
var ANTI_WEIGHT = 1; //(per amount!)
var ANTI_IMAGE; 
var ANTI_NAME = 'anti-poison';

function SetupAnti()
{
	// create a new anti-poison bottle
	var anti = new Item();
	anti.name = ANTI_NAME;
	anti.description = ANTI_DESC;
	anti.amount = 1;
	anti.weight = ANTI_WEIGHT * anti.amount;
	
	// find a random location to place the anti poison at
	anti.location_x = Math.floor(Math.random()*WIDTH);
	anti.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the anti-poison
	anti.image = ANTI_IMAGE;
	
	// add the anti-poison actions
	anti.use = function(){
		// if we're not poisoned, do nothing
		if(health_status != 'Poisoned')
		{
			AddMessage("Just the smell of this stuff is too much to take...");
			return;
		}
		
		// otherwise, subtract from anti-poison one ounce (and one anti-poison weight from our weight)
		this.amount = roundNumber((roundNumber(this.amount, 2) - 1), 2);
		this.weight = roundNumber((roundNumber(this.weight, 2) - roundNumber(ANTI_WEIGHT,2)), 2);
		health_status = 'Good';
		UpdateHealthStatus();
		
		// did we use the last of our anti-poison??
		if(this.amount <= 0)
		{
			// remove this item from the inventory list
			for(var i = 0; i < users_inventory.length; i++)
				if(users_inventory[i] == this)
				{
					users_inventory.splice(i,1);
					
					// update our inventory
					UpdateInventoryList();
				}
		}
		
		// Add points
		AddPoints('Use', this);
	};
	
	anti.getFind = function(){return this.amount + " dose of anti-poison";};
	
	// add the description function
	anti.getDescription = function(){
		if(this.amount == 1)
			return this.description + ' You have '+this.amount + ' dose of anti-poison.';
		else
			return this.description + ' You have '+this.amount + ' doses of anti-poison.';	
	};
	
	// update weight
	anti.updateWeight = function(){this.weight = ANTI_WEIGHT * this.amount;};
	
	return anti;
}


function Anti_Item(active, amount, location_x, location_y, weight)
{
	// grab an anti-poison
	var anti = SetupAnti();
	
	// update our attributes
	anti.active = active;
	anti.amount = amount;
	anti.location_x = location_x;
	anti.locaiton_y = location_y;
	anti.weight = weight;
	
	return anti;
}

/********************** FIRST AID KIT *********************************/
//Details about the FIRST AID KIT object
var FAK_DESC = 'A kit filled with helpful first-aid items such as bandages, medicines, and creams.';
var FAK_WEIGHT = 1; //(per amount!)
var FAK_IMAGE; 
var FAK_NAME = 'first-aid kit';

function SetupFAK()
{
	// create a new first aid kit
	var fak = new Item();
	fak.name = FAK_NAME;
	fak.description = FAK_DESC;
	fak.amount = Math.floor(Math.random()*5)+1;
	fak.weight = FAK_WEIGHT * fak.amount;
	
	// find a random location to place the first aid kit at
	fak.location_x = Math.floor(Math.random()*WIDTH);
	fak.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the first aid kit
	fak.image = FAK_IMAGE;
	
	// add the first aid kit actions
	fak.use = function(){
		// if our health is full, do nothing
		if(health == 100)
		{
			AddMessage("You're already feeling great!");
			return;
		}
		
		// otherwise, subtract from first aid kit one ounce (and one first aid kit weight from our weight)
		this.amount = roundNumber((roundNumber(this.amount, 2) - 1), 2);
		this.weight = roundNumber((roundNumber(this.weight, 2) - roundNumber(FAK_WEIGHT,2)), 2);
		
		// update our health
		health = health + 5;
		HealthBar.percentage = roundNumber((health / 100), 2);
		HealthBar.update();
		
		// did we use the last of our first aid kit??
		if(this.amount <= 0)
		{
			// remove this item from the inventory list
			for(var i = 0; i < users_inventory.length; i++)
				if(users_inventory[i] == this)
					users_inventory.splice(i,1);
			alert("You've exhausted your first aid kit...");
			
			// update our inventory
			UpdateInventoryList();
		}
		
		
		// Add points
		AddPoints('Use', this);
		};
	
	fak.getFind = function(){return 'a first-aid kit'};
	
	// add the description function
	fak.getDescription = function(){
		if(this.amount == 1)
			return this.description + ' You have '+this.amount + ' treament.';
		else
			return this.description + ' You have '+this.amount + ' treatments.';
	};
	
	// update weight
	fak.updateWeight = function(){return this.weight = FAK_WEIGHT * this.amount;};
	
	// add the key to the item list!
	return fak;
}

function FAK_Item(active, amount, location_x, location_y, weight)
{
	// grab a fak
	var fak = SetupFAK();
	
	// update our attributes
	fak.active = active;
	fak.amount = amount;
	fak.location_x = location_x;
	fak.locaiton_y = location_y;
	fak.weight = weight;
	
	return fak;
}

/******************************* GOLD *********************************/
//Details about the gold object
var GOLD_DESC = 'Beautiful ancient egyptian gold pieces.';
var GOLD_WEIGHT = 0.1; //(per amount!)
var GOLD_IMAGE; 
var GOLD_NAME = 'gold';
var GOLD_POINTS = 1; //(prestige points added if the player wins - this is per amount)

function SetupGold()
{
	// create a new gold pile
	var gold = new Item();
	gold.name = GOLD_NAME;
	gold.description = GOLD_DESC;
	gold.amount = Math.floor(Math.random()*150)+1;
	gold.weight = GOLD_WEIGHT * gold.amount;
	
	// find a random location to place the gold at
	gold.location_x = Math.floor(Math.random()*WIDTH);
	gold.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the gold
	gold.image = GOLD_IMAGE;
	
	// add the gold actions
	gold.use = function(){
		// check to see if we're at the location of the gold bank!
		var index = -1;
		if(location_of_bank != null && location_of_bank[0] == Current_Location[0] && location_of_bank[1] == Current_Location[1] && bank_wall == Current_Direction)
		{
			// move all of their gold into the deposit!
			bank_gold += this.amount;
			
			AddPoints('Use', this);
			
			// remove their gold
			for(var j = 0; j < users_inventory.length; j++)
				if(users_inventory[j].name == this.name)
					users_inventory.splice(j, 1);
						
			// update their weight
			WeightBar.percentage = WeightPercentage();
			WeightBar.update();	
			
			UpdateInventoryList();
					
			return;
		}
		AddMessage('You could marvel at it\'s beauty all day long, but it has no real use here.');

	};
	
	gold.getFind = function(){
		if(this.amount == 1)
			return this.amount + " ounce of gold";
		else
			return this.amount + " ounces of gold";
	};
	
	// add the description function
	gold.getDescription = function(){
		if(this.amount == 1)
			return this.description + ' You have '+this.amount + ' ounce of gold.';
		else
			return this.description + ' You have '+this.amount + ' ounces of gold.';
	};
	
	// update weight
	gold.updateWeight = function(){this.weight = GOLD_WEIGHT * this.amount;};
	
	return gold;
}

function Gold_Item(active, amount, location_x, location_y, weight)
{
	// get some gold
	var gold = SetupGold();
	
	// update attributes
	gold.active = active;
	gold.amount = amount;
	gold.location_x = location_x;
	gold.location_y = location_y;
	gold.weight = weight;
	
	return gold;
}

// This function is called when the user tries to pickup some gold.
// It determines if the gold was sitting on a trap or not.  If so, it
// regenerates a new maze (keeping all items, user's location, and direction the same)
// just new level (and reset's the map).
// If this was not a trap, it simply returns.
function GoldTrap()
{
	// do we set off a trap?
	if(Math.floor(Math.random()*5) == 1)
	{
		alert("As you pick up the last coin, you notice a tile on the floor rise upward, and a loud rumble echoes through the halls...");
		LoadMaze();
		UpdateView();
		alert("In a flash, all of the walls around you shift into a new position!");
	}
	return;
}


//-----------------10-ft Pole ----------------//
var POLE_DESC = 'A 10 foot wooden pole, possibly left behind by the workers while building the Pyramid.';
var POLE_WEIGHT = 3;
var POLE_IMAGE;
var POLE_NAME = '10-foot pole';


function SetupPole()
{
	// create a new pole
	var pole = new Item();
	pole.name = POLE_NAME;
	pole.weight = POLE_WEIGHT;
	pole.description = POLE_DESC;
	pole.amount = 1;
	
	// find a random location to place the pole at
	pole.location_x = Math.floor(Math.random()*WIDTH);
	pole.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the pole
	pole.image = POLE_IMAGE;
	
	// add the actions
	pole.use = function(){
		// first check to see if the space we're facing has a trap
		// get the space in front of us
		var location_infront = GetLocationFrom(1);
		var trap = GetTrapAt(location_infront[0], location_infront[1]);
		if(trap != null && !trap.sprung)
		{
			// set off the trap
			trap.sprung = true;
			
			// display something different based on the name
			switch(trap.name)
			{
				case GOLD_DEPO_NAME:
					alert("As you fiddle with the pole and the strange hole, your pole accidentally slips out of your hands...");
					// if they drop their pole down this "strange hole"...
					// disable all traps (that haven't been sprung yet)
					// if there isn't one, then they just lose their pole... :X
					// so first, search through the list of traps, looking for the any that haven't been sprung yet
					var index = -1;
					for(var i = 0; i < traps.length; i++)
						if(traps[i].sprung == false)
							index = i;
							
					// if there are no traps to spring, they just lose their pole
					if(index == -1)
					{
						alert("Clumsy! You just lost your pole...");
						
					}
					else
					{
						alert("As the pole slips into the hole and disappears, you hear a series of gears rumble in the distance...");
						for(var i = 0; i < traps.length; i++)
							if(traps[i].sprung == false && traps[i].name != GOLD_DEPO_NAME)
							{
								traps[i].sprung = true;
								traps[i].image = TRAP_SPRUNG_IMAGE;
							}
					}
					// remove the pole
					for(var j = 0; j < users_inventory.length; j++)
						if(users_inventory[j].name == this.name)
						{
							if(this.amount == 1)
							{
								users_inventory.splice(j, 1);
								UpdateInventoryList();
							}
							else
							{
								this.amount = roundNumber(this.amount - 1, 2);
								this.weight = roundNumber(this.weight - POLE_WEIGHT, 2);
							}
							
						}
					break;
				case WATER_TRAP_NAME:
					alert("As you poke the tile in front of you, a burst of water comes rushing down out of a trap door in the ceiling!");
					// update the image
					trap.image = TRAP_SPRUNG_IMAGE;
					break;
				case DART_TRAP_NAME:
					alert("As you poke the tile in front of you...FWOP!  About a dozen darts come flying out of the wall next to the tile and pepper holes into your pole!  It is now too brittle to be useful...");
					// update the image
					trap.image = TRAP_SPRUNG_IMAGE;
					// remove the pole
					for(var j = 0; j < users_inventory.length; j++)
						if(users_inventory[j].name == this.name)
						{
							if(this.amount == 1)
							{
								users_inventory.splice(j, 1);
								UpdateInventoryList();
							}
							else
							{
								this.amount = roundNumber(this.amount - 1, 2);
								this.weight = roundNumber(this.weight - POLE_WEIGHT, 2);
							}
						}
					break;
				case SPEAR_TRAP_NAME:
					alert("As you poke the tile in front of you, a spear comes shooting out of a hidden hole and instantly retracts!");
					// update the image
					trap.image = TRAP_SPRUNG_IMAGE;
					break;
			}
		AddPoints('Use', this);
		}
		
		UpdateView();
		// draw darkness, if we're out of oil or do not have a lamp
		if(Darkness())
			paper.image(NO_LIGHT.src, 0, 0, 604, 420);

	};
	
	// add the description get
	pole.getDescription = function(){
		if(this.amount == 1)
			return this.description + ' You have ' + this.amount + ' pole.';
		else
			return this.description + ' You have ' + this.amount + ' poles.';
	};
	
	pole.getFind = function(){
		if(this.amount == 1)
			return 'a 10 foot pole';
		else
			return this.amount + ' 10 foot poles';
	};
	
	pole.updateWeight = function(){this.weight = this.amount * POLE_WEIGHT;};
	
	return pole;
}

function Pole_Item(active, amount, location_x, location_y, weight)
{
	// get a pole
	var pole = SetupPole();
	
	// update our attributes
	pole.active = active;
	pole.amount = amount;
	pole.location_x = location_x;
	pole.location_y = location_y;
	pole.weight = weight;
	
	return pole;
}

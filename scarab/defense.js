// which defensive item is activated?
var defense_active = '';

/***********************************************************************
 * 	LIST OF DEFENSE ITEMS:
 * 		- Dart Gun
 * 			- Darts
 * 		- Net
 * 		- Bullwhip
 * 		- Bugspray
 * ********************************************************************/
//----------------- DART GUN ----------------//
var DGUN_DESC = 'A spring-loaded rifle that fires out tranquilizer darts.';
var DGUN_WEIGHT = 5.0;
var DGUN_IMAGE;
var DGUN_NAME = 'dart gun';

function SetupDartGun()
{
	// create a new dart gun
	var dartgun = new Item();
	dartgun.name = DGUN_NAME;
	dartgun.weight = DGUN_WEIGHT;
	dartgun.description = DGUN_DESC;
	dartgun.amount = Math.floor(Math.random()*3)+1;
	dartgun.drop_whole = true;
	
	// find a random location to place the scarab at
	dartgun.location_x = Math.floor(Math.random()*WIDTH);
	dartgun.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the scarab
	dartgun.image = DGUN_IMAGE;
	
	
	// add the description get
	dartgun.getDescription = function(){ return this.description; };
	
	dartgun.getFind = function(){
			if(this.amount == 1)
				return 'a dart gun with '+this.amount+' dart loaded';
			else
				return 'a dart gun with '+this.amount+' darts loaded';
		};
		
	dartgun.updateWeight = function(){this.weight = this.amount * DGUN_WEIGHT;};
	
	return dartgun;
}

// This function is used when we need to load a dart gun from a saved game.
// It calls the "SetupDartGun()" function and sets all other attributes to
// those that were passed in.
// It then returns this object.
function DartGun_Item(active, amount, location_x, location_y, weight)
{
	// grab a dart gun
	var dartgun = SetupDartGun();
	
	// assign our attributes
	dartgun.active = active;
	dartgun.amount = amount;
	dartgun.location_x = location_x;
	dartgun.location_y = location_y;
	dartgun.weight = weight;
	
	return dartgun;
}

//----------------- DARTS ----------------//
var DARTS_DESC = 'Tranquilizer darts designed to put mammals to sleep.  Must be fired from a dart gun.';
var DARTS_WEIGHT = 0.2;
var DARTS_IMAGE;
var DARTS_NAME = 'darts';

function SetupDarts()
{
	// create a new dart gun
	var darts = new Item();
	darts.name = DARTS_NAME;
	darts.weight = DARTS_WEIGHT;
	darts.description = DARTS_DESC;
	darts.amount = Math.floor(Math.random()*4)+1;
	
	// find a random location to place the scarab at
	darts.location_x = Math.floor(Math.random()*WIDTH);
	darts.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the darts
	darts.image = DARTS_IMAGE;
	
	// when we use the darts, load our dart gun!
	darts.use = function(){
		// find the dart gun in our inventory
		for(var i = 0; i < users_inventory.length; i++)
		{
			if(users_inventory[i].name == DGUN_NAME)
			{
				// how many darts do we have in the gun?
				var darts_needed = 4 - users_inventory[i].amount;
				// are we already full?
				if(darts_needed == 0)
				{
					alert("Your dart gun is already full.");
					return;
				}
				if(darts_needed < this.amount)
				{
					users_inventory[i].amount += darts_needed;
					this.amount -= darts_needed;
					AddMessage(this.getDescription());
				}
				else
				{
					users_inventory[i].amount += this.amount;
					// remove these darts from the users inventory
					for(var j = 0; j < users_inventory.length; j++)
					{
						if(users_inventory[j] == this)
						{
							users_inventory.splice(j, 1);
							UpdateInventoryList();
							AddMessage(this.getDescription());
						}
					}
				}
				UpdateDefenseIcons();
				return;
			}
		}
		alert("You have no dart gun to load these darts into!");
	};
	
	
	// add the description get
	darts.getDescription = function(){ 
		if(this.amount == 1)
			return this.description + ' You have '+this.amount+' dart left.';
		else
			return this.description + ' You have '+this.amount+' darts left.';};
	
	darts.getFind = function(){
			if(this.amount == 1)
				return this.amount + ' dart';
			else
				return this.amount + ' darts';
		};
		
	darts.updateWeight = function(){this.weight = this.amount * DARTS_WEIGHT;};
	
	return darts;
}

// This function is used when we need to load a dart gun from a saved game.
// It calls the "SetupDartGun()" function and sets all other attributes to
// those that were passed in.
// It then returns this object.
function Darts_Item(active, amount, location_x, location_y, weight)
{
	// grab a dart gun
	var darts = SetupDarts();
	
	// assign our attributes
	darts.active = active;
	darts.amount = amount;
	darts.location_x = location_x;
	darts.location_y = location_y;
	darts.weight = weight;
	
	return darts;
}


//----------------- BUG SPRAY ----------------//
var SPRAY_DESC = 'A spray that reduces attacks from poisonous critters.';
var SPRAY_WEIGHT = 1.0;
var SPRAY_IMAGE;
var SPRAY_NAME = 'bug spray';

function SetupBugSpray()
{
	// create a new dart gun
	var spray = new Item();
	spray.name = SPRAY_NAME;
	spray.weight = SPRAY_WEIGHT;
	spray.description = SPRAY_DESC;
	spray.amount = Math.floor(Math.random()*3)+1;
	
	// find a random location to place the scarab at
	spray.location_x = Math.floor(Math.random()*WIDTH);
	spray.location_y = Math.floor(Math.random()*HEIGHT);
	
	// image of the scarab
	spray.image = SPRAY_IMAGE;
	
	
	// add the description get
	spray.getDescription = function(){ return this.description + ' It contains '+this.amount+' uses left.'; };
	
	spray.getFind = function(){
			if(this.amount == 1)
				return 'a bottle of bug spray with '+this.amount+' use';
			else
				return 'a bottle of bug spray with '+this.amount+' uses';
		};
		
	spray.updateWeight = function(){this.weight = this.amount * SPRAY_WEIGHT;};
	
	return spray;
}

// This function is used when we need to load a dart gun from a saved game.
// It calls the "SetupDartGun()" function and sets all other attributes to
// those that were passed in.
// It then returns this object.
function BugSpray_Item(active, amount, location_x, location_y, weight)
{
	// grab a dart gun
	var spray = SetupBugSpray();
	
	// assign our attributes
	spray.active = active;
	spray.amount = amount;
	spray.location_x = location_x;
	spray.location_y = location_y;
	spray.weight = weight;
	
	return spray;
}

/***********************************************************************
 * Attacking Functions - triggered when user clicks on screen
 * ********************************************************************/
 
 function ActiveDefense(distance)
 {
	 
	 // if we have no defense item activated, do nothing
	 if(defense_active == '')
		return;
		
	// make sure we have ammunition
	for(var i = 0; i < users_inventory.length; i++)
	{
		if(defense_active == users_inventory[i].name)
		{
			if(users_inventory[i].amount <= 0)
			{
				switch(defense_active)
				{
					case DGUN_NAME:
						alert("Your dart gun is empty!");
						break;
					case SPRAY_NAME:
						alert("You have no more bug spray!");
						break;
				}
				return;
			}
		}
	}
	
	// find the NPC who is "distance" away from us...this is the NPC
	// which was fired upon.
	var location_at = GetLocationFrom(distance);
	var npc = GetNPCAt(location_at[0], location_at[1]);
	
	// this npc is hit!
	npc.hit();
	
	// remove some amount
	for(var i = 0; i < users_inventory.length; i++)
	{
		if(users_inventory[i].name == defense_active)
		{
			switch(defense_active)
			{
				case DGUN_NAME:
					// remove a dart
					users_inventory[i].amount = users_inventory[i].amount - 1;
					break;
				case SPRAY_NAME:
					// decrease our spray amount
					users_inventory[i].amount = users_inventory[i].amount - 1;
					// if our amount is 0, remove this from our inventory 
					// and disable our defense_active
					if(users_inventory[i].amount <= 0)
					{
						users_inventory.splice(i, 1);
						defense_active = '';							
						AddMessage("You used the last of your bug spray...");
						UpdateInventoryList();
					}
					break;
					
			}
		}
	}
		
	UpdateDefenseIcons();
 }
 
 function MissDefense()
 {
	  // if we have no defense item activated, do nothing
	 if(defense_active == '')
		return;
		
	// make sure we have ammunition
	for(var i = 0; i < users_inventory.length; i++)
	{
		if(defense_active == users_inventory[i].name)
		{
			if(users_inventory[i].amount <= 0)
			{
				switch(defense_active)
				{
					case DGUN_NAME:
						alert("Your dart gun is empty!");
						break;
					case SPRAY_NAME:
						alert("You have no more bug spray!");
						break;
				}
				return;
			}
			else
			{
				alert("You missed!");
				switch(defense_active)
				{
					case DGUN_NAME:
						// remove a dart
						users_inventory[i].amount = users_inventory[i].amount - 1;
						break;
					case SPRAY_NAME:
						// decrease our spray amount
						users_inventory[i].amount = users_inventory[i].amount - 1;
						// if our amount is 0, remove this from our inventory 
						// and disable our defense_active
						if(users_inventory[i].amount <= 0)
						{
							users_inventory.splice(i, 1);
							defense_active = '';							
							AddMessage("You used the last of your bug spray...");
							UpdateInventoryList();
						}
						break;
				}
				UpdateDefenseIcons();
				return;
			}
		}
	}
 }
 
 // this function is the main aim-verification function
 // based on the NPCs currently in view, it determines whether or not
 // the user clicked on an NPC or not
 function HitNPC(click_x, click_y)
 {
	 // run through the list of NPCs and get their "hitable" areas
	 // we want to find the NPC that returns the lowest number that
	 // is NOT -1
	 var closest_hit_NPC = -1;
	 var closest_distance = 6;
	 for(var i = 0; i < NPC_list.length; i++)
	 {
		if(NPC_list[i].seeme)
		{
			var distance = NPC_list[i].hitme(click_x, click_y);
			if(distance != -1 && distance < closest_distance)
			{
				closest_hit_NPC = i;
				closest_distance = distance;
			}
		}
	 }
	 return closest_hit_NPC;
 }
 
 // This function is called when the user misses an NPC
 // Depending on which defense item is activated, it does different stuff (specific, i know)
 function MissedNPC()
 {
	 switch(defense_active)
	 {
		 case DGUN_NAME:
				// remove a dart from the the user's dart gun
				for(var i = 0; i < users_inventory.length; i++)
				{
					if(users_inventory[i].name == DGUN_NAME)
					{
						users_inventory[i].amount = users_inventory[i].amount - 1;
						break;
					}
				}
				// alert the user
				alert("The dart flies through the air and shatters on the far wall.  You missed!");
			break;
		case SPRAY_NAME:
			for(var i = 0; i < users_inventory.length; i++)
			{
				if(users_inventory[i].name == SPRAY_NAME)
				{
					// decrease our spray amount
					users_inventory[i].amount = users_inventory[i].amount - 1;
					// if our amount is 0, remove this from our inventory 
					// and disable our defense_active
					if(users_inventory[i].amount <= 0)
					{
						users_inventory.splice(i, 1);
						defense_active = '';
						AddMessage("You used the last of your bug spray...");
						UpdateInventoryList();
					}
				}
			}
			alert("A fine mist fills the air with a fog - you missed!");
			break;
	 }
 }
 
 // called when the page loads - this simply sets up the attack item icons on the screen
 function SetupAttackIcons()
 {
	 // setup the dart gun icon
	 var dgun_html = '<div id="dart_holder" title="Loaded Darts" class="dart_holder"><span id="dart4" class="dart"></span><br /><span id="dart3" class="dart"></span><br /><span id="dart2" class="dart"></span><br /><span id="dart1" class="dart"></span></div><img id="dartgun_icon" title="Dart Gun" class="dartgun_icon" src="images/icons/dartgun.png">';
	 // setup the bug spray icon
	 var spray_html = '<img id="spray_icon" title="Bug Spray" class="spray_icon" src="images/icons/spray.png">';
	 
	 
	 $('#attack_icons').html(dgun_html+spray_html);
	 $('#dartgun_icon').click(function(){
		 // first check to make sure we have a dart gun
		 for(var i = 0; i < users_inventory.length; i++)
		 {
			 if(users_inventory[i].name == DGUN_NAME)
			 {
				 // activate the dart gun!
				 defense_active = DGUN_NAME;
				 
				 UpdateDefenseIcons();
				 
				 return;
			 }
		 }
		 alert("You do not have a dart gun in your inventory!");
	 });
	 
	 $('#spray_icon').click(function(){
		 // first check to make sure we have a dart gun
		 for(var i = 0; i < users_inventory.length; i++)
		 {
			 if(users_inventory[i].name == SPRAY_NAME)
			 {
				 // activate the dart gun!
				 defense_active = SPRAY_NAME;
				 
				 UpdateDefenseIcons();
				 
				 return;
			 }
		 }
		 alert("You do not have any bug spray in your inventory!");
	 });
	 
	 UpdateDefenseIcons();
	 
 }
 
 function UpdateDefenseIcons()
 {
	 // run through and disable all icons
	 document.getElementById('dartgun_icon').src = 'images/icons/dartgun.png';
	 document.getElementById('dart4').style.backgroundColor = '#FFF';
	 document.getElementById('dart3').style.backgroundColor = '#FFF';
	 document.getElementById('dart2').style.backgroundColor = '#FFF';
	 document.getElementById('dart1').style.backgroundColor = '#FFF';
	 
	 document.getElementById('spray_icon').src = 'images/icons/spray.png';
	 
	 // run through the user's inventory
	 for(var i = 0; i < users_inventory.length; i++)
	 {
		 if(users_inventory[i].name == DGUN_NAME)
		 {
			 if(defense_active == DGUN_NAME)
				document.getElementById('dartgun_icon').src = 'images/icons/dartgun_active.png';
			else
				document.getElementById('dartgun_icon').src = 'images/icons/dartgun_found.png';
			
			
			// check to see how many darts we have
			switch(users_inventory[i].amount)
			{
					case 4:
						document.getElementById('dart4').style.backgroundColor = '#59B7FE';
					case 3:
						document.getElementById('dart3').style.backgroundColor = '#59B7FE';
					case 2:
						document.getElementById('dart2').style.backgroundColor = '#59B7FE';
					case 1:
						document.getElementById('dart1').style.backgroundColor = '#59B7FE';
			}
		}
		if(users_inventory[i].name == SPRAY_NAME)
		{
			if(defense_active == SPRAY_NAME)
				document.getElementById('spray_icon').src = 'images/icons/spray_active.png';
			else
				document.getElementById('spray_icon').src = 'images/icons/spray_found.png';
			
		}
	 }
 }

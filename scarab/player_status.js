// Current level the player is on
var current_level = 1;

var game_over = false;

// list of items the user is in possesion of
var users_inventory = new Array();

// Most weight the user can carry
var MAX_WEIGHT = 50;

// Player's current hunger level
var hunger = 0;

// Player's maximum hunger level before we start losing health?
var MAX_HUNGER = 100;

// How much hunger to we gain for every step?
var hunger_per_step = 0.5;

// How much health is taken away per step when starving?
var starving_per_step = 5;

// How much health is taken away per step when poisoned?
var poisoned_per_step = 1;

// player's current health level
var health = 100;

// player's current health status
var health_status = 'Good';

// player's 'prestige' points
var points = 0;

// has a scarab been activated for this level?
var scarab_activated = false;

// has the staff been activated?
var staff_activated = false;

// has the player filled the map for this level?
var map_filled = false;

// how much gold does the player have in the "Bank of RA"
var bank_gold = 0;

// map ruined? (water trap)
var wet_map = false;


// This function is called when ever we make a step
// it adds the "hunger_per_step" to our current hunger
// and checks if we've reached our max hunger level.
// if so, we decrease our health by a certain amount.
function UpdateHunger()
{
	// based on our game speed, adjust our hunger per step
	// 10 = hunger_per_step / 2
	// 1 = hunger_per_step * 2
	var hunger_gained;
	switch(speed)
	{
		case 1:
			hunger_gained = hunger_per_step * 2;
			break;
		case 2:
			hunger_gained = hunger_per_step * 1.8;
			break;
		case 3:
			hunger_gained = hunger_per_step * 1.6;
			break;
		case 4:
			hunger_gained = hunger_per_step * 1.3;
			break;
		case 5:
			hunger_gained = hunger_per_step * 1;
			break;
		case 6:
			hunger_gained = hunger_per_step * 0.9;
			break;
		case 7:
			hunger_gained = hunger_per_step * 0.7;
			break;
		case 8:
			hunger_gained = hunger_per_step * 0.5;
			break;
		case 9:
			hunger_gained = hunger_per_step * 0.3;
			break;
		case 10:
			hunger_gained = hunger_per_step * 0.2;
			break;
	}
	// use previous hunger to determine if we went over the threshold of hunger (are we getting close to starving?)
	var prev_hunger = hunger;
	
	// add some hunger (if we're not already at the top)
	if(hunger < MAX_HUNGER)
		hunger = roundNumber(roundNumber(hunger, 2) + roundNumber(hunger_gained, 2), 2);
	
	// update our hunger bar
	HungerBar.percentage = roundNumber((hunger / MAX_HUNGER), 2);
	HungerBar.update();
	
	// also, if we're poisoned, take away some health
	if(health_status == 'Poisoned')
	{
		// subtract from our health
		health = roundNumber(roundNumber(health, 2) - roundNumber(poisoned_per_step, 2), 2);
		// update the health bar
		HealthBar.percentage = roundNumber((health / 100), 2);
		HealthBar.update();
		
		// check our health
		if(health <= 0)
		{
			
			// set the map to white
			document.getElementById('map_view').style.backgroundColor = '#000';
			document.getElementById('map_view').style.display = 'block';
			
			alert("You've died of your wounds!");
			game_over = true;
			GameOver();
			return;
		}
	}
	
	// check if we're almost starving
	if(prev_hunger < 90 && hunger >= 90)
	{
		alert("You are very hungry - you'd better eat something soon.");
		return;
	}
	
	// check if we're starving
	if(hunger >= MAX_HUNGER)
	{
		
		// subtract from our health
		health = roundNumber(roundNumber(health, 2) - roundNumber(starving_per_step, 2), 2);
		// update the health bar
		HealthBar.percentage = roundNumber((health / 100), 2);
		HealthBar.update();
		
		// check our health
		if(health <= 0)
		{
			
			// set the map to black
			document.getElementById('map_view').style.display = 'block';
			document.getElementById('map_view').style.backgroundColor = '#000';
			document.getElementById('map_view').innerHTML = '';
			
			alert("You've died of starvation!");
			game_over = true;
			GameOver();
			return;
		}
	}
}

/***********************************************************************
 * The education level is based on the prestige points gathered
 * throughout the game.  Each level is defined by a range of levels:
 * 	0 - 499 => Undergraduate
 * 	500 - 999 => Associate's Degree
 * 	1000 - 1499 => Bachelor's Degree
 * 	1500 - 1999 => Master's Degree
 * 	2000+	=> Philosophical Doctorate (Ph.D.)
 * 
 * Each educational level has it's perks...
 * ********************************************************************/
function GetEducation()
{
	if(points < 2000)
		return 'Undergrad';
	if(points < 4000)
		return 'Associate\'s';
	if(points < 6000)
		return 'Bachelor\'s';
	if(points < 8000)
		return 'Master\'s';
	return 'Ph.D.';	
}

/***********************************************************************
 * This function determines how many prestige points are given for a
 * given task.  Picking up an item will give so many points (depending
 * on the item).  Using an item does the same, and so does moving to
 * the next level.
 * ********************************************************************/
function AddPoints(action, item)
{
	// get their previous education level
	var prev_edu = GetEducation();
	var prev_points = points;
		
	// if they found an item and picked it up...
	if(action == 'Pickup')
	{
		switch(item.name)
		{
			// if they find a key
			case KEY_NAME:
				points += 50;
				break;
			// if they find the crown or staff...
			case CROWN_NAME:
			case STAFF_NAME:
				points += 300;
				break;
			// if they find a scarab
			case SCARAB_NAME:
				points += 200;
				break;
			// anything else
			default:
				points += 20;
				break;
		}
	}
	
	// if they drop an item...
	if(action == 'Drop')
	{
		switch(item.name)
		{
			// if they drop the key:
			case KEY_NAME:
				points -= 50;
				break;
			// if they drop the crown or staff...
			case CROWN_NAME:
			case STAFF_NAME:
				points -= 300;
				break;
			// scarab?
			case SCARAB_NAME:
				points -= 200;
				break;
			// anything else
			default:
				points -= 20;
				break;
		}
	}
	
	// if they use an item...
	if(action == 'Use')
	{
		switch(item.name)
		{
			// use food or oil...
			case OIL_NAME:
			case FOOD_NAME:
				points += 10;
				break;
			// use anti-poison, first aid kit
			case ANTI_NAME:
			case FAK_NAME:
				points += 20;
				break;
			// re-light the lamp
			case LAMP_NAME:
				points += 30;
				break;
			// use a key (meaning they moved to the next level)
			case KEY_NAME:
				points += 150;
				break;
			// use a pole (meaning they disabled a trap)
			case POLE_NAME:
				points += 50;
				break;
			// deposits gold
			case GOLD_NAME:
				points += item.amount;
				break;
		}
	}
	
	// if they have filled out everything on their map...
	if(action == 'MapFull' && map_filled == false)
	{
		map_filled = true;
		points += 50;
	}
	
	// update the display of their points
	document.getElementById('prestige_points').innerHTML = points;
	document.getElementById('education').innerHTML = GetEducation();
	
	// check to see if they've increased their education
	if(prev_edu != GetEducation() && prev_points < points)
	{
		switch(GetEducation())
		{
			case "Associate's":
				alert("Congratulations!  Your experience has gained you an Associate's Degree in Archeology!  The back-breaking work you've completed thus far has made your back stronger and your metabolism as well.  Keep it up!");
				MAX_WEIGHT = MAX_WEIGHT + 20;
				hunger_per_step = 0.4;
				break;
			case "Bachelor's":
				alert("Congratulations!  More and more discoveries and experience has gained you a Bachelor's Degree in Archeology!  Not only are you more physically fit, but the hieroglyphics and clues left behind are starting to make more sense...");
				MAX_WEIGHT = MAX_WEIGHT + 25;
				hunger_per_step = 0.3;
				break;
			case "Master's":
				alert("Congratulations!  With constant navigation and time spent in the Pyramid of Ra, you have earned your Master's Degree in Archeology!  Your focus of study is clearly ancient artifacts, and you are quickly discovering some of their true meaning and abilities!");
				MAX_WEIGHT = MAX_WEIGHT + 30;
				hunger_per_step = 0.25;
				break;
			case "Ph.D.":
				alert("Congratulations!  Your continued studies and hard work has earned you a Ph.D. in Archeology!  As a Philisophical Doctor, you have discovered the deep secrets behind these ancient artifacts, and are now finally respected by all of your peers (if you can make it out to tell them about it!)");
				MAX_WEIGHT = MAX_WEIGHT + 40;
				hunger_per_step = 0.2;
				break;
		}
	}
}

/***********************************************************************
 * This function updates the "health_status" (or "Condition") based
 * on the current status of the player.
 * ********************************************************************/
function UpdateHealthStatus()
{
	// based on the status, update the color of text
	switch(health_status)
	{
		case 'Poisoned':
			document.getElementById('health_status').style.color = '#F00';
			break;
		case 'Good':
			document.getElementById('health_status').style.color = '#000';
			break;
	}
	
	document.getElementById('health_status').innerHTML = health_status;
	
}

/*****************************************************************
Function: Get_Color(double)
Author: David Pettifor
Date: July 29, 2009
Input: Double
Returns: Color (System.Drawing)
Purpose: Pass in a double-type value to retrieve a corresponding
color.  Value 0 starts at LimeGreen.  As the value approaches 7.5,
the color gradually changes to yellow.  From 7.5 to 9, the color
gradually changes to orange.  From 9 to 10, the color gradually
changes to red.  Colors are compiled using Red, Green, and Blue
values.  Because Green, Yellow, Orange and Red have no blue at 
all, "blue" always remains zero (0). Cap control is provided so
no color value can be outside of the desired range, nor lower
than zero/greater than 255.  Values range from 0-255. Possibility
of 16,581,375 colors, though because blue is omitted, colors
are reduced to 65,025 colors.  Calculations are based on the
following chart:

 Value  Returned
  In   |  Color  |   R  |  G  |  B  |
-------+---------+------+-----+-----|
   0   |LimeGreen|   0  | 200 |  0  |
-------+---------+------+-----+-----|
   ~   |    ~    |   +  |  +  |  x  |
-------+---------+------+-----+-----|
  7.5  | Yellow  |  210 | 255 |  0  |
-------+---------+------+-----+-----|
   ~   |    ~    |   +  |  -  |  x  |
-------+---------+------+-----+-----|
   9   | Orange  |  255 | 127 |  0  |
-------+---------+------+-----+-----|
   ~   |    ~    |   x  |  -  |  x  |
-------+---------+------+-----+-----|
  10   |   Red   |  255 |  0  |  0  |
-------+---------+------+-----+-----| 
****************************************************************/

function Get_Color(percentage)
{
	// adjust percentage for 0-10
	var value = roundNumber((roundNumber(percentage, 2) * 10), 2);
	
	//initiate values for red, green, and blue
	var red = 0;
	var green = 0;
	var blue = 0;

   
	//if the value passed in is at or lower than 7.5,
	//we adjust the green between 200 and 255;
	//red is adjusted between 0 and 210.
	if (value <= 7.5)
	{
		//calculate for green
		green = ((value * 7.33) + 200);
		if (green > 255)
			green = 255;
		if (green < 200)
			green = 200;

		//calculate for red
		red = (value * 28);
		if (red > 210)
			red = 210;
		if (red < 0)
			red = 0;

		//create a new color with our calculated values
		var temp = '#' + componentToHex(Math.floor(red)) + componentToHex(Math.floor(green)) + componentToHex(Math.floor(blue));
		//return our new color
		return temp;
	}

	//if the value is less than 9 (but greater than 7.5 for the "if"
	//statement filterd those out), we adjust the red between 210
	//and 255, and the green between 255 and roughly 127 (technically
	//127.5, but who's gonna notice?)
	if (value <= 9)
	{
		//calculate for red
		red = ((value - 7.5) * 30) + 210;
		if (red > 255)
			red = 255;
		if (red < 210)
			red = 210;

		//calulate for green
		green = (255 - ((value - 7.5) * 85));
		if (green > 255)
			green = 255;
		if (green < 127)
			green = 127;
	
		//create a new color with our calculated values
		var temp = '#' + componentToHex(Math.floor(red)) + componentToHex(Math.floor(green)) + componentToHex(Math.floor(blue));
		//return our new color
		return temp;
	}

	//if neither of the previous "if" statments ran, the value
	//passed in will be between 9 and 10. 
	//at this point, red must be 255, and we just need to
	//adjust the green (to go from orange to red)

	//set red to 255
	red = 255;
	
	//calculate for green
	green = (255 - ((value - 8) * 127));
	if (green > 127)
		green = 127;
	if (green < 0)
		green = 0;

	//create a new color with our calculated values
	var temp = '#' + componentToHex(Math.floor(red)) + componentToHex(Math.floor(green)) + componentToHex(Math.floor(blue));
	//return our new color
	return temp;

}


function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

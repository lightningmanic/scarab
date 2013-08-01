/***********************************************************************
 * Characters.js
 * David Pettifor, December 2012
 * This file contains a library of possible NPC characters
 * (non-playable-characters)
 * They are child classes of the parent "NPC" class found in "ai.js"
 * They define the following:
 * 	- Image associated with character
 * 	- Name of character ('monkey', 'cobra', etc)
 * 	- Attack function: function which is called when the NPC attacks
 * 		the player.  This can do damage to the player, steal items, etc
 * 	- Attack rate: what are the chances that the NPC will attack?
 * 		(default: 1)
 * ********************************************************************/
 
 //****************************** Cobra ******************************//
 function HatchCobra()
 {
	 // Main settings
	 var image = new Array(COBRA_IMG_1, COBRA_IMG_2, COBRA_IMG_3, COBRA_IMG_4, COBRA_IMG_5, COBRA_SLEEPING_IMG_1,  COBRA_SLEEPING_IMG_2,  COBRA_SLEEPING_IMG_3,  COBRA_SLEEPING_IMG_4,  COBRA_SLEEPING_IMG_5);
	 var name = 'cobra';
	 var maps = new Array(COBRA_MAP_1, COBRA_MAP_2, COBRA_MAP_3, COBRA_MAP_4, COBRA_MAP_5, COBRA_SLEEPING_MAP_1, COBRA_SLEEPING_MAP_2, COBRA_SLEEPING_MAP_3, COBRA_SLEEPING_MAP_4, COBRA_SLEEPING_MAP_5);
	 var attack_rate = 0.5;
	 
	 // create an NPC character
	 var npc = new NPC();
	 npc.image = image;
	 npc.name = name;
	 npc.maps = maps;
	 npc.attack_rate = attack_rate;
	 
	 // chances that it is asleep?
	 if(Math.random() <= 0.5)
		npc.sleeping = true;
	 
	 // cobra does nothing on the move...
	 npc.movement_action = function(){return;};
	 
	 // setup a random location in the maze
	 npc.location_x = Math.floor(Math.random()*WIDTH);
	 npc.location_y = Math.floor(Math.random()*HEIGHT);
	 
	 // create the attack function
	 npc.attack = function(){
		// drop their health a bit
		health=health-5;
		HealthBar.percentage=roundNumber((health/100),2);
		HealthBar.update();
		
		// poison the player
		health_status="Poisoned";
		UpdateHealthStatus();
		
		// alert them that the cobra has bitten them
		alert("The poisonous cobra has bitten you!");

		// are they dead yet?
		if(health<=0)
		{
			document.getElementById("map_view").style.backgroundColor="#000";
			document.getElementById("map_view").innerHTML="";
			document.getElementById("map_view").style.display="block";
			alert("You've died of your wounds!");
			game_over=true;
			GameOver();
		}
		 
	 };
	 
	 npc.getFind = function(){
		if(this.sleeping)
		{
			// do we wake up?
			if(Math.random() <= this.getWakingChance())
			{
				this.sleeping = false;
				alert("You woke up the cobra!");
				return 'a poisonous cobra';
			}
			else
				return 'a sleeping cobra';
		}
		else
			return 'a poisonous cobra'; 
	 };
	 
	 npc.hitme = function(x, y){ 
		 // based on the distance...
		 switch(NPC_Distance(this))
		 {
			 case 1:
				if(x >= 265 && x<= 343 && y >= 190 && y <= 370)
					return 1;
				break;
			case 2:
				if(x >= 294 && x<= 325 && y >= 180 && y <= 226)
					return 2;
				break;
			case 3:
				if(x >= 304 && x<= 315 && y >= 151 && y <= 170)
					return 3;
				break;
			case 4:
				if(x >= 300 && x<= 306 && y >= 142 && y <= 152)
					return 4;
				break;
			case 5:
				if(x >= 301 && x<= 306 && y >= 136 && y <= 142)
					return 5;
				break;
		 }
		 return -1;
	 };
	 
	 npc.hit = function(){
		 // depending on the item...
		 switch(defense_active)
		 {
			 case DGUN_NAME:
				var sleeping = ' ';
				if(this.sleeping)
					sleeping = ' sleeping ';
				alert("You hit the"+sleeping+"cobra!  ...but the dart doesn't seem to have affected it!");
				break;
			case SPRAY_NAME:
				alert("The cobra hisses loudly!  It certainly doesn't like that...");
				if(this.attack_rate <= 0)
					this.attack_rate = 0;
				else
					this.attack_rate = this.attack_rate - 0.1;
				this.sleeping = false;
				break;
		 }
	 };
	 
	 // finally, enable this NPC and return it
	 npc.disabled = false;
	 
	 // add this to our NPC list!
	 NPC_list.push(npc);
 }
 
 
  //**************************** Scorpion ****************************//
 function HatchScorpion()
 {
	 // Main settings
	 var image = new Array(SCORPION_IMG_1, SCORPION_IMG_2, SCORPION_IMG_3, SCORPION_IMG_4, SCORPION_IMG_5);
	 var name = 'scorpion';
	 var maps = new Array(SCORPION_MAP_1, SCORPION_MAP_2, SCORPION_MAP_3, SCORPION_MAP_4, SCORPION_MAP_5);
	 var attack_rate = 0.7;
	 
	 // create an NPC character
	 var npc = new NPC();
	 npc.image = image;
	 npc.name = name;
	 npc.maps = maps;
	 npc.attack_rate = attack_rate;
	 
	 // scorpion does nothing on the move...
	 npc.movement_action = function(){return;};
	 
	 npc.getFind = function(){
		return 'a scorpion'; 
	 };
	 
	 // setup a random location in the maze
	 npc.location_x = Math.floor(Math.random()*WIDTH);
	 npc.location_y = Math.floor(Math.random()*HEIGHT);
	 
	 // create the attack function
	 npc.attack = function(){
		// drop their health a bit
		health=health-3;
		HealthBar.percentage=roundNumber((health/100),2);
		HealthBar.update();
		
		// alert them that the cobra has bitten them
		alert("OUCH!! A scorpion stung you!");
		
		// randomize poisonous effect
		if(Math.random() <= 0.3)
		{
			// poison the player
			health_status="Poisoned";
			UpdateHealthStatus();
			alert("...boy that stings..");
		}
		
		// are they dead yet?
		if(health<=0)
		{
			document.getElementById("map_view").style.backgroundColor="#000";
			document.getElementById("map_view").innerHTML="";
			document.getElementById("map_view").style.display="block";
			alert("You've died of your wounds!");
			game_over=true;
			GameOver();
		}
		 
	 };
	 
	 npc.hitme = function(x, y){ 
		 // based on the distance...
		 switch(NPC_Distance(this))
		 {
			 case 1:
				if(x >= 291 && x<= 309 && y >= 305 && y <= 344)
					return 1;
				break;
			case 2:
				if(x >= 300 && x<= 306 && y >= 204 && y <= 216)
					return 2;
				break;
			case 3:
				if(x >= 305 && x<= 310 && y >= 163 && y <= 170)
					return 3;
				break;
			case 4:
				if(x >= 301 && x<= 303 && y >= 149 && y <= 152)
					return 4;
				break;
			case 5:
				if(x >= 300 && x<= 304 && y >= 139 && y <= 145)
					return 5;
				break;
		 }
		 return -1;
	 };
	 
	 npc.hit = function(){
		 // depending on the item...
		 switch(defense_active)
		 {
			 case DGUN_NAME:
				alert("The dart bounces right off the scorpion's hard body!");
				break;
			case SPRAY_NAME:
				alert("The scorpion's tail quivers...it doesn't appear to be aggressive anymore!");
				this.attack_rate = 0;
				break;
		 }
	 };
	 
	 // finally, enable this NPC and return it
	 npc.disabled = false;
	 
	 // add this to our NPC list!
	 NPC_list.push(npc);
 }
 
  //**************************** Monkey ****************************//
 function SummonMonkey()
 {
	 // Main settings
	 var image = new Array(MONKEY_IMG_1, MONKEY_IMG_2, MONKEY_IMG_3, MONKEY_IMG_4, MONKEY_IMG_5, MONKEY_SLEEPING_IMG_1,  MONKEY_SLEEPING_IMG_2,  MONKEY_SLEEPING_IMG_3,  MONKEY_SLEEPING_IMG_4,  MONKEY_SLEEPING_IMG_5);
	 var name = 'monkey';
	 var maps = new Array(MONKEY_MAP_1, MONKEY_MAP_2, MONKEY_MAP_3, MONKEY_MAP_4, MONKEY_MAP_5, MONKEY_SLEEPING_MAP_1, MONKEY_SLEEPING_MAP_2, MONKEY_SLEEPING_MAP_3, MONKEY_SLEEPING_MAP_4, MONKEY_SLEEPING_MAP_5);
	 var attack_rate = 0.7;
	 
	 // create an NPC character
	 var npc = new NPC();
	 npc.image = image;
	 npc.name = name;
	 npc.maps = maps;
	 npc.attack_rate = attack_rate;
	 
	 // chances that it is asleep?
	 if(Math.random() <= 0.5)
		npc.sleeping = true;
	 
	 // setup a random location in the maze
	 npc.location_x = Math.floor(Math.random()*WIDTH);
	 npc.location_y = Math.floor(Math.random()*HEIGHT);
	 
	 // when on the move, the monkey may drop the item it is holding!
	 npc.movement_action = function(){
		// if they are not holding an item, just return
		if(this.held_item == '')
			return;
			
		// otherwise, find the chances that it will drop the item
		if(Math.random() <= 0.1)
		{
			// set the item's location to our current location
			this.held_item.location_x = this.location_x;
			this.held_item.location_y = this.location_y;
			
			// add it to the level_items list
			level_items.push(this.held_item);

			// remove it from our NPC
			this.held_item = '';
			
		}
	 };
	 
	 npc.getFind = function(){
		 if(this.sleeping)
		 {
			// do we wake up?
			if(Math.random() <= this.getWakingChance())
			{
				this.sleeping = false;
				alert("You woke up the monkey!");
				if(this.held_item != '')
					return 'a monkey carying '+this.held_item.getFind();
			}
			else
			{
				if(this.held_item != '')
					return 'a sleeping monkey holding '+this.held_item.getFind();
				else
					return 'a sleeping monkey';
			}
		}
		else
		{
			var text = 'a monkey'; 
			if(this.held_item != '')
				text += ' carying '+this.held_item.getFind();
			return text;
		}
	 };
	 
	 npc.hitme = function(x, y){ 
		 // based on the distance...
		 switch(NPC_Distance(this))
		 {
			 case 1:
				if(x >= 238 && x<= 361 && y >= 220 && y <= 288)
					return 1;
				break;
			case 2:
				if(x >= 279 && x<= 339 && y >= 171 && y <= 201)
					return 2;
				break;
			case 3:
				if(x >= 294 && x<= 320 && y >= 152 && y <= 163)
					return 3;
				break;
			case 4:
				if(x >= 296 && x<= 311 && y >= 138 && y <= 149)
					return 4;
				break;
			case 5:
				if(x >= 300 && x<= 306 && y >= 135 && y <= 138)
					return 5;
				break;
		 }
		 return -1;
	 };
	 
	 npc.hit = function(){
		 // depending on the item...
		 switch(defense_active)
		 {
			 case DGUN_NAME:
				if(this.sleeping)
					alert("You hit the sleeping monkey!  It's not very effective, though...");
				else
				{
					var holding = 'It quickly falls asleep...';
					if(this.held_item != '')
					{
						holding = 'It drops '+this.held_item.getFind()+' and quickly falls asleep...';
						this.held_item.location_x = this.location_x;
						this.held_item.location_y = this.location_y;
						level_items.push(this.held_item);
						this.held_item = '';
					}
					alert("You hit the monkey!  "+holding);
				}
				this.sleeping = true;
				break;
			case SPRAY_NAME:
				if(this.sleeping)
				{
					alert("You woke up the monkey!");
					this.sleeping = false;
				}
				this.attack_rate = this.attack_rate + 0.1;
				if(this.attack_rate >= 1)
					this.attack_rate = 1;
				alert("The monkey screams in a raging fit!");
				this.attack();
				break;
				
		 }
	 };
	 
	 // create the attack function
	 npc.attack = function(){
		// the monkey will randomly steal from the user!
		// we don't steal anything if the monkey already has an item
		if(this.held_item != '')
			return;
		
		// if the user has nothing in their inventory...
		if(users_inventory.length == 0)
		{
			alert("The monkey slaps you across the face!");
			return;
		}
		
		// otherwise, find a random item from their inventory list
		var random_index = Math.floor((Math.random()*users_inventory.length));
		
		// give this to the monkey!
		this.held_item = users_inventory[random_index];
		
		// set this item to inactive
		this.held_item.active = false;
		
		// remove this item from the users inventory
		users_inventory.splice(random_index, 1);
		
		UpdateInventoryList();
		
		UpdateDefenseIcons();
		
		// update the weight!
		WeightBar.percentage = WeightPercentage();
		WeightBar.update();
		
		// alert the user that their item has been stolen
		alert("The monkey stole your " + this.held_item.name+"!");
		
	 };
	 
	 // finally, enable this NPC and return it
	 npc.disabled = false;
	 
	 // add this to our NPC list!
	 NPC_list.push(npc);
 }
 
 //**************************** Lioness ******************************//
 function SummonLioness()
 {
	 // Main settings
	 var image = new Array(LIONESS_IMG_1, LIONESS_IMG_2, LIONESS_IMG_3, LIONESS_IMG_4, LIONESS_IMG_5, LIONESS_SLEEPING_IMG_1,  LIONESS_SLEEPING_IMG_2,  LIONESS_SLEEPING_IMG_3,  LIONESS_SLEEPING_IMG_4,  LIONESS_SLEEPING_IMG_5);
	 var maps = new Array(LIONESS_MAP_1, LIONESS_MAP_2, LIONESS_MAP_3, LIONESS_MAP_4, LIONESS_MAP_5, LIONESS_SLEEPING_MAP_1, LIONESS_SLEEPING_MAP_2, LIONESS_SLEEPING_MAP_3, LIONESS_SLEEPING_MAP_4, LIONESS_SLEEPING_MAP_5);
	 var name = 'lioness';
	 var attack_rate = 0.5;
	 
	 // create an NPC character
	 var npc = new NPC();
	 npc.image = image;
	 npc.name = name;
	 npc.maps = maps;
	 npc.attack_rate = attack_rate;
	 
	 // chances that it is asleep?
	 if(Math.random() <= 0.5)
		npc.sleeping = true;
	 
	 // setup a random location in the maze
	 npc.location_x = Math.floor(Math.random()*WIDTH);
	 npc.location_y = Math.floor(Math.random()*HEIGHT);
	 
	 // the lioness does nothing as she walks...
	 npc.movement_action = function(){
		return;
	 };
	 
	 npc.getFind = function(){
		 if(this.sleeping)
		 {
			// do we wake up?
			if(Math.random() <= this.getWakingChance())
			{
				this.sleeping = false;
				alert("You woke up the lioness!");
				return 'a lioness';
			}
			else
				return 'a sleeping lioness';
		}
		else
			return 'a lioness'; 
	 };
	 
	 npc.hitme = function(x, y){ 
		 // based on the distance...
		 switch(NPC_Distance(this))
		 {
			 case 1:
				if(x >= 168 && x<= 423 && y >= 162 && y <= 280)
					return 1;
				break;
			case 2:
				if(x >= 241 && x<= 348 && y >= 152 && y <= 202)
					return 2;
				break;
			case 3:
				if(x >= 276 && x<= 325 && y >= 141 && y <= 163)
					return 3;
				break;
			case 4:
				if(x >= 288 && x<= 313 && y >= 140 && y <= 149)
					return 4;
				break;
			case 5:
				if(x >= 294 && x<= 309 && y >= 134 && y <= 140)
					return 5;
				break;
		 }
		 return -1;
	 };
	 
	 npc.hit = function(){
		 // depending on the item...
		 switch(defense_active)
		 {
			 case DGUN_NAME:
				if(this.sleeping)
					alert("You hit the sleeping lioness!  It's not very effective, though...");
				else
					alert("You hit the lioness!  She is starting to look quite sleepy...");
				this.sleeping = true;
				break;
			case SPRAY_NAME:
				if(this.sleeping)
					alert("The lioness twitches its tail.  Doesn't seem to bother it too much...");
				else
					alert("THe lioness sneezes - it has no effect!");
				break;
		 }
	 };
	 
	 // create the attack function
	 npc.attack = function(){
		// drop their health quite a bit
		health=health-10;
		HealthBar.percentage=roundNumber((health/100),2);
		HealthBar.update();
		
		// alert them that the lioness has mauled them
		alert("The lioness has mauled you!");

		// are they dead yet?
		if(health<=0)
		{
			document.getElementById("map_view").style.backgroundColor="#000";
			document.getElementById("map_view").innerHTML="";
			document.getElementById("map_view").style.display="block";
			alert("You've died of your wounds!");
			game_over=true;
			GameOver();
		}
	 };
	 
	 // finally, enable this NPC and return it
	 npc.disabled = false;
	 
	 // add this to our NPC list!
	 NPC_list.push(npc);
 }
 
 //****************************** Bat ********************************//
 var bat_flash = 0;
 function SummonBat()
 {
	 // Main settings
	 var image = new Array(BAT_IMG_1, BAT_IMG_2, BAT_IMG_3, BAT_IMG_4, BAT_IMG_5, BAT_SLEEPING_IMG_1,  BAT_SLEEPING_IMG_2,  BAT_SLEEPING_IMG_3,  BAT_SLEEPING_IMG_4,  BAT_SLEEPING_IMG_5);
	 var name = 'bat';
	 var maps = new Array(BAT_MAP_1, BAT_MAP_2, BAT_MAP_3, BAT_MAP_4, BAT_MAP_5, BAT_SLEEPING_MAP_1, BAT_SLEEPING_MAP_2, BAT_SLEEPING_MAP_3, BAT_SLEEPING_MAP_4, BAT_SLEEPING_MAP_5);
	 var attack_rate = 0.3;
	 
	 // create an NPC character
	 var npc = new NPC();
	 npc.image = image;
	 npc.name = name;
	 npc.maps = maps;
	 npc.attack_rate = attack_rate;
	 
	 // chances that it is asleep?
	 if(Math.random() <= 0.5)
		npc.sleeping = true;
	 
	 // setup a random location in the maze
	 npc.location_x = Math.floor(Math.random()*WIDTH);
	 npc.location_y = Math.floor(Math.random()*HEIGHT);
	 
	 // the bat does nothing as it flies...
	 npc.movement_action = function(){
		return;
	 };
	 
	 npc.getFind = function(){
		 if(this.sleeping)
		 {
			// do we wake up?
			if(Math.random() <= this.getWakingChance())
			{
				this.sleeping = false;
				alert("You woke up the bat!");
				return 'a bat';
			}
			else
				return 'a sleeping bat';
		}
		else
			return 'a bat'; 
	 };
	 
	 npc.hitme = function(x, y){ 
		 // based on the distance...
		 switch(NPC_Distance(this))
		 {
			 case 1:
				if(x >= 198 && x<= 339 && y >= 11 && y <= 120)
					return 1;
				break;
			case 2:
				if(x >= 278 && x<= 334 && y >= 79 && y <= 119)
					return 2;
				break;
			case 3:
				if(x >= 286 && x<= 313 && y >= 115 && y <= 123)
					return 3;
				break;
			case 4:
				if(x >= 300 && x<= 314 && y >= 122 && y <= 131)
					return 4;
				break;
			case 5:
				if(x >= 296 && x<= 300 && y >= 128 && y <= 134)
					return 5;
				break;
		 }
		 return -1;
	 };
	 
	 npc.hit = function(){
		 // depending on the item...
		 switch(defense_active)
		 {
			 case DGUN_NAME:
				// are we already asleep?
				if(this.sleeping)
					alert("You hit the sleeping bat!  Doesn't do much good...");
				else
					alert("You hit the bat!  It finds a place to perch and drifts into a deep sleep...");
				this.sleeping = true;
				break;
			case SPRAY_NAME:
				if(this.sleeping)
					alert("You woke up the bat!");
				alert("The cloud of spray surrounds the bat and frightens it!");
				this.attack_rate = this.attack_rate - 0.1;
				break;
		 }
	 };
	 
	 // create the attack function
	 npc.attack = function(){
		 // start an interval to flash black
		 var t = self.setInterval(
		function(){
			// if bat_flash is past the count, we stop this interval
			if(bat_flash >= 8)
			{
				UpdateView();
				// draw darkness, if we're out of oil or do not have a lamp
				if(Darkness())
					paper.image(NO_LIGHT.src, 0, 0, 604, 420);
					
				bat_flash = 0;
				self.clearInterval(t);
				
				// just simply annoying...
				alert("A bat is fluttering around your head...");
			}
			// if bat_flash is true, we set to black
			if(bat_flash % 2 != 0)
			{
				paper.rect(0, 0, 604, 420).attr({fill: "black"});
			}
			else
			{
				UpdateView();
				// draw darkness, if we're out of oil or do not have a lamp
				if(Darkness())
					paper.image(NO_LIGHT.src, 0, 0, 604, 420);
			}
			bat_flash++;
		}, 75);
	 };
	 
	 // finally, enable this NPC and return it
	 npc.disabled = false;
	 
	 // add this to our NPC list!
	 NPC_list.push(npc);
 }
 
 //***************************** Mummy *******************************//
 function SummonMummy()
 {
	 // Main settings
	 var image = new Array(MUMMY_IMG_1, MUMMY_IMG_2, MUMMY_IMG_3, MUMMY_IMG_4, MUMMY_IMG_5, MUMMY_SLEEPING_IMG_1,  MUMMY_SLEEPING_IMG_2,  MUMMY_SLEEPING_IMG_3,  MUMMY_SLEEPING_IMG_4,  MUMMY_SLEEPING_IMG_5);
	 var name = 'mummy';
	 var maps = new Array(MUMMY_MAP_1, MUMMY_MAP_2, MUMMY_MAP_3, MUMMY_MAP_4, MUMMY_MAP_5);
	 var attack_rate = 0.9;
	 
	 // create an NPC character
	 var npc = new NPC();
	 npc.image = image;
	 npc.name = name;
	 npc.maps = maps;
	 npc.attack_rate = attack_rate;
	 
	 // setup a random location in the maze
	 npc.location_x = Math.floor(Math.random()*WIDTH);
	 npc.location_y = Math.floor(Math.random()*HEIGHT);
	 
	 npc.getFind = function(){
		 // if disabled...
		 if(this.disabled)
		 {
			 // we renew the player's health!
			health = 100;
			health_status = 'Good';
			HealthBar.percentage = roundNumber((health / 100), 2);
			HealthBar.update();
			UpdateHealthStatus();
			alert("The wrappings of the mummy hold incredible healing powers - your health is fully restored!");
			return 'mummy wrappings';
		 }
		 else
		 {
			 return 'a mummy';
		 }
	 };
	 
	 // the mummy may drop gold as it walks!
	 npc.movement_action = function(){
		// chances of it dropping some gold?
		if(Math.random() <= 0.2)
		{
			// create some gold!
			// random amount
			var amount = Math.floor((Math.random()*5)+1);
			var gold = Gold_Item(false, amount, this.location_x, this.location_y, (GOLD_WEIGHT*amount));
			
			// add this to our level items!
			level_items.push(gold);
		}
	 };
	 
	 npc.hitme = function(x, y){ 
		 // based on the distance...
		 switch(NPC_Distance(this))
		 {
			 case 1:
				if(x >= 257 && x<= 362 && y >= 46 && y <= 382)
					return 1;
				break;
			case 2:
				if(x >= 284 && x<= 327 && y >= 93 && y <= 228)
					return 2;
				break;
			case 3:
				if(x >= 301 && x<= 319 && y >= 121 && y <= 178)
					return 3;
				break;
			case 4:
				if(x >= 299 && x<= 307 && y >= 125 && y <= 152)
					return 4;
				break;
			case 5:
				if(x >= 301 && x<= 304 && y >= 130 && y <= 141)
					return 5;
				break;
		 }
		 return -1;
	 };
	 
	 npc.hit = function(){
		 // depending on the item...
		 switch(defense_active)
		 {
			 case DGUN_NAME:
				alert("The dart pierced the mummy's wrappings and disappears!  It has no effect...");
				break;
			case SPRAY_NAME:
				alert("The spray soaks into the mummy's wrappings.  It has no effect!");
				break;
		 }
	 };
	 
	 // create the attack function
	 npc.attack = function(){
		// if the user has the crown of RA, the mummy gives the user a random item and vanishes
		// so search for the crown of ra in the user's inventory
		var crown_found = false;
		for(var i = 0; i < users_inventory.length; i++)
		{
			if(users_inventory[i].name == CROWN_NAME)
				crown_found = true;
		} 
		
		// if we have the crown, get a random item from the level
		if(crown_found)
		{
			// check to see if there are any more items left on the level
			if(level_items.length == 0)
			{
				alert("As the mummy slowly exhales, its wrappings unravel and fall to the floor.  The mummy is no more.");
				// remove thyself from the list of NPC's!
				for(var i = 0; i < NPC_list.length; i++)
				{
					if(this == NPC_list[i])
					{
						// first stop the mummy from doing anything else
						self.clearTimeout(this.active);
						// then remove the mummy from the list of NPCs
						NPC_list.splice(i, 1);
					}
				}
				return;
			}
			
			if(confirm("The mummy comes bearing a gift.  Do you wish to receive?"))
			{
				// get a random item from the level
				var item = GetRandomItem();
				
				// add it to the user's item list
				AddItem(item);
				
				UpdateView();
				// draw darkness, if we're out of oil or do not have a lamp
				if(Darkness())
					paper.image(NO_LIGHT.src, 0, 0, 604, 420);
				
				// notify the user!
				alert("You just received "+item.getFind()+" from the mummy!");
				
				// check to see if this was the last item on the level
				if(level_items.length == 0)
				{
					alert("As the mummy hand you your gift, its wrappings unravel and fall to the floor.  The mummy is no more.");
					// remove thyself from the list of NPC's!
					for(var i = 0; i < NPC_list.length; i++)
					{
						if(this == NPC_list[i])
						{
							// first stop the mummy from doing anything else
							self.clearTimeout(this.active);
							// then remove the mummy from the list of NPCs
							NPC_list.splice(i, 1);
						}
					}
				}
			}
			
			return;
		}
		
		// drop their health a lot
		health=health-30;
		HealthBar.percentage=roundNumber((health/100),2);
		HealthBar.update();
		
		// alert them that the mummy has zapped them!
		alert("You feel a horribly painful shock pulse through your body!");

		// are they dead yet?
		if(health<=0)
		{
			document.getElementById("map_view").style.backgroundColor="#000";
			document.getElementById("map_view").innerHTML="";
			document.getElementById("map_view").style.display="block";
			alert("You've died of your wounds!");
			game_over=true;
			GameOver();
		}
	 };
	 
	 // finally, enable this NPC and return it
	 npc.disabled = false;
	 
	 // add this to our NPC list!
	 NPC_list.push(npc);
 }
 
 // This function is called when the user has either their masters or PhD
 // and they use the scarab of RA.  If there is a mummy in the level, it is disabled
 // and can no longer do any harm
 function KillMummy()
 {
	 // find a mummy
	 for(var i = 0; i < NPC_list.length; i++)
	 {
		 if(NPC_list[i].name == 'mummy')
		 {
			 // disable the mummy
			 NPC_list[i].disabled = true;
			 NPC_list[i].sleeping = true;
			 
			 // alert the user
			 alert("You hear a low moan echo through the walls...");
		 }
	 }
 }
 
 
 //****************************** Spider *****************************//
 function HatchSpider()
 {
	 // Main settings
	 var image = new Array(SPIDER_IMG_1, SPIDER_IMG_2, SPIDER_IMG_3, SPIDER_IMG_4, SPIDER_IMG_5);
	 var name = 'spider';
	 var maps = new Array(SPIDER_MAP_1, SPIDER_MAP_2, SPIDER_MAP_3, SPIDER_MAP_4, SPIDER_MAP_5);
	 var attack_rate = 0.3;
	 
	 // create an NPC character
	 var npc = new NPC();
	 npc.image = image;
	 npc.name = name;
	 npc.maps = maps;
	 npc.attack_rate = attack_rate;
	 
	 // spider does nothing on the move...
	 npc.movement_action = function(){return;};
	 
	 // setup a random location in the maze
	 npc.location_x = Math.floor(Math.random()*WIDTH);
	 npc.location_y = Math.floor(Math.random()*HEIGHT);
	 
	 npc.getFind = function(){
		return 'a spider'; 
	 };
	 
	 npc.hitme = function(x, y){ 
		 // based on the distance...
		 switch(NPC_Distance(this))
		 {
			 case 1:
				if(x >= 297 && x<= 322 && y >= 296 && y <= 326)
					return 1;
				break;
			case 2:
				if(x >= 299 && x<= 311 && y >= 204 && y <= 216)
					return 2;
				break;
			case 3:
				if(x >= 302 && x<= 309 && y >= 162 && y <= 171)
					return 3;
				break;
			case 4:
				if(x >= 300 && x<= 305 && y >= 148 && y <= 153)
					return 4;
				break;
			case 5:
				if(x >= 301 && x<= 304 && y >= 140 && y <= 141)
					return 5;
				break;
		 }
		 return -1;
	 };
	 
	 npc.hit = function(){
		 // depending on the item...
		 switch(defense_active)
		 {
			 case DGUN_NAME:
				alert("Nice shot!  But the dart has no effect on the spider...");
				break;
			case SPRAY_NAME:
				alert("The spray soaks the spider - it seems pretty harmless now!");
				this.attack_rate = 0;
				break;
		 }
	 };
	 
	 // create the attack function
	 npc.attack = function(){
		// alert them that the spider has bitten them
		alert("Ow!  A spider just bit you!");
		
		// randomize poisonous effect
		if(Math.random() <= 0.3)
		{
			// poison the player
			health_status="Poisoned";
			UpdateHealthStatus();
			alert("...boy that stings...");
		}
		else
		{
			alert("...it's just a tad itchy...");
		}		 
	 };
	 
	 // finally, enable this NPC and return it
	 npc.disabled = false;
	 
	 // add this to our NPC list!
	 NPC_list.push(npc);
 }
 
 
 // This function is called when the mummy finds a user with the Crown of RA
 // It runs through the list of level items and offers it up to the user
 function GetRandomItem()
 {
	 // removes a random item from level_items and returns it
	 // generate a random index
	 var random_index = Math.floor(Math.random()*level_items.length);
	 
	 // get the item
	 var item = level_items[random_index];
	 
	 // return the item
	 return item;
 }

var traps=new Array();

function Trap()
{
	this.name="";
	this.location_x=0;
	this.location_y=0;
	this.sprung=false;
	this.land=null;
	this.image=null
	this.getFind;
}
var TRAP_IMAGE;
var TRAP_SPRUNG_IMAGE;

function GetTrapAt(x,y)
{
	var location_of_trap=-1;
	for(var i=0;i<traps.length;i++)
	{
		if(traps[i].location_x==x && traps[i].location_y==y)
		{
			location_of_trap=i
		}
	}
	
	if(location_of_trap>=0)
	{
		return traps[location_of_trap];
	}
	else
		return null
}

function SaveTrap(trap_object)
{
	return trap_object.name+"|"+trap_object.location_x+"|"+trap_object.location_y+"|"+trap_object.sprung
}

function LoadTrap(trap_as_string)
{
	var name=trap_as_string[0];
	var locationx=trap_as_string[1];
	var locationy=trap_as_string[2];
	var sprung=trap_as_string[3];
	var trap=new Trap();
	trap.name=name;
	trap.location_x=parseInt(locationx);
	trap.location_y=parseInt(locationy);
	if(sprung=="true")
		trap.sprung=true;
	
	if(name==GOLD_DEPO_NAME)
		trap.image=GOLD_TRAP_IMAGE;
	else
	{
		if(trap.sprung)
		{
			trap.image=TRAP_SPRUNG_IMAGE;
		}
		else
		{
			trap.image=TRAP_IMAGE
		}
	}
	
	switch(name)
	{
		case GOLD_DEPO_NAME:
			trap.land=LandOnGoldDeposit;
			trap.getFind = function(){ return 'a hole in the floor';};
			break;
		case DART_TRAP_NAME:
			trap.land=LandOnDartTrap;
			trap.getFind = function(){ return 'a dart trap';};
			break;
		case SPEAR_TRAP_NAME:
			trap.land=LandOnSpearTrap;
			trap.getFind = function(){ return 'a spear trap';};
			break;
		case WATER_TRAP_NAME:
			trap.land=LandOnWaterTrap;
			trap.getFind = function(){ return 'a water trap';};
			break;
	}
	
	traps.push(trap)
}

function GenerateRandomTrap()
{
	var trap_num=Math.floor(Math.random()*3);
	switch(trap_num)
	{
		case 0:
			SetupWaterTrap();
			break;
		case 1:
			SetupSpearTrap();
			break;
		case 2:
			SetupDartTrap();
			break;
	}
}

var GOLD_DEPO_NAME="gold deposit";
var GOLD_TRAP_IMAGE;
function SetupGoldDeposit()
{
	var gold=new Trap();
	gold.name=GOLD_DEPO_NAME;
	gold.location_x=Math.floor(Math.random()*WIDTH);
	gold.location_y=Math.floor(Math.random()*HEIGHT);
	
	while(GetTrapAt(gold.location_x,gold.location_y)!=null)
	{
		gold.location_x=Math.floor(Math.random()*WIDTH);
		gold.location_y=Math.floor(Math.random()*HEIGHT);
	}
	
	gold.land=LandOnGoldDeposit;
	gold.image=GOLD_TRAP_IMAGE;
	gold.getFind = function(){ return 'a hole in the floor';};
	sprung=true;
	traps.push(gold)
}

function LandOnGoldDeposit()
{
	AddMessage("There's a strange hole in the floor...");
}

var WATER_TRAP_NAME="water trap";
function SetupWaterTrap()
{
	var water=new Trap();
	water.name=WATER_TRAP_NAME;
	water.location_x=Math.floor(Math.random()*WIDTH);
	water.location_y=Math.floor(Math.random()*HEIGHT);
	
	while(GetTrapAt(water.location_x,water.location_y)!=null)
	{
		water.location_x=Math.floor(Math.random()*WIDTH);
		water.location_y=Math.floor(Math.random()*HEIGHT);
	}
	
	water.getFind = function(){ return 'a water trap';};
	water.land=LandOnWaterTrap;
	water.image=TRAP_IMAGE;
	traps.push(water)
}

function LandOnWaterTrap()
{
	if(!this.sprung)
	{
		alert("You feel the floor shift down...");
		wet_map=true;
		this.sprung=true;
		var index=-1;
		for(var i=0;i<users_inventory.length;i++)
		{
			if(users_inventory[i].name==LAMP_NAME)
			{
				index=i;
			}
		}
		
		if(i>=0)
		{
			users_inventory[index].active=false;
			if(Darkness())
			{
				paper.image(NO_LIGHT.src,0,0,604,420);
			}
		}
		
		this.image=TRAP_SPRUNG_IMAGE;
		alert("A wave of water rushes over you!  Your map is soaked and unreadable...")
	}
	else
	{
		AddMessage("You found a sprung water trap.");
	}
}

var DART_TRAP_NAME="poison dart";
function SetupDartTrap()
{
	var dart=new Trap();
	dart.name=DART_TRAP_NAME;
	dart.location_x=Math.floor(Math.random()*WIDTH);
	dart.location_y=Math.floor(Math.random()*HEIGHT);
	while(GetTrapAt(dart.location_x,dart.location_y)!=null)
	{
		dart.location_x=Math.floor(Math.random()*WIDTH);
		dart.location_y=Math.floor(Math.random()*HEIGHT);
	}
	dart.land=LandOnDartTrap;
	dart.image=TRAP_IMAGE;
	dart.getFind = function(){ return 'a dart trap';};
	traps.push(dart)
}

function LandOnDartTrap(){
	if(!this.sprung)
	{
		alert("You feel the floor shift down...");
		alert("Ouch!!\nYou've been hit by poisonous darts!");
		health=health-5;
		HealthBar.percentage=roundNumber((health/100),2);
		HealthBar.update();
		health_status="Poisoned";
		UpdateHealthStatus();
		
		if(health<=0){
			document.getElementById("map_view").style.backgroundColor="#000";
			document.getElementById("map_view").innerHTML="";
			document.getElementById("map_view").style.display="block";
			alert("You've died of your wounds!");
			game_over=true;
			GameOver();
			return;
		}
		this.sprung=true;
		this.image=TRAP_SPRUNG_IMAGE
	}
	else{
		AddMessage("You found a sprung dart trap.");
	}
}

var SPEAR_TRAP_NAME="spear trap";
function SetupSpearTrap()
{
	var spear=new Trap();
	spear.name=SPEAR_TRAP_NAME;
	spear.location_x=Math.floor(Math.random()*WIDTH);
	spear.location_y=Math.floor(Math.random()*HEIGHT);
	
	while(GetTrapAt(spear.location_x,spear.location_y)!=null)
	{
		spear.location_x=Math.floor(Math.random()*WIDTH);
		spear.location_y=Math.floor(Math.random()*HEIGHT);
	}
	
	spear.land=LandOnSpearTrap;
	spear.image=TRAP_IMAGE;
	spear.getFind = function(){ return 'a spear trap';};
	traps.push(spear)
}

function LandOnSpearTrap()
{
	if(!this.sprung)
	{
		alert("You feel the floor shift down...");
		alert("Ouch!!\nYou've been poked by a spear!");
		health=health-15;
		HealthBar.percentage=roundNumber((health/100),2);
		HealthBar.update();
		
		if(health<=0)
		{
			document.getElementById("map_view").style.backgroundColor="#000";
			document.getElementById("map_view").innerHTML="";
			document.getElementById("map_view").style.display="block";
			alert("You've died of your wounds!");
			game_over=true;
			GameOver();
			return;
		}
		
		this.sprung=true;
		this.image=TRAP_SPRUNG_IMAGE;
	}
	else
	{
		AddMessage("You found a sprung spear trap.");
	}
};

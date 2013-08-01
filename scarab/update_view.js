var DISTANT_FOG; // = 'images/distance.png';


// wall information //
// current location
var current_left;
var current_front;
var current_right;
var current_left_forward;
var current_right_forward;
var current_to_one_right=false;
var current_to_one_left=false;

// one step infront of us
var one_left;
var one_front;
var one_right;
var one_left_forward;
var one_right_forward;
var one_to_two_right=false;
var one_to_two_left=false;

// two steps in front of us
var two_left;
var two_front;
var two_right;
var two_left_forward;
var two_right_forward;
var two_to_three_right=false;
var two_to_three_left=false;

// three steps in front of us
var three_left;
var three_front;
var three_right;
var three_left_forward;
var three_right_forward;
var three_to_four_right=false;
var three_to_four_left=false;

// four steps in front of us
var four_left;
var four_front;
var four_right;
var four_left_forward;
var four_right_forward;
var four_to_five_right=false;
var four_to_five_left=false;

// five steps in front of us
var five_left;
var five_front;
var five_right;
var five_left_forward;
var five_right_forward;

// can we see the entrance/exit?  if so, their distances
// will be set here
var entrance_distance=-1;
var exit_distance=-1;


// simply reset our view by settnig everything to NULL or FALSe
function ResetView()
{
	current_left=null;
	current_front=null;
	current_right=null;
	current_left_forward=null;
	current_right_forward=null;
	current_to_one_right=false;
	current_to_one_left=false;
	one_left=null;
	one_front=null;
	one_right=null;
	one_left_forward=null;
	one_right_forward=null;
	one_to_two_right=false;
	one_to_two_left=false;
	two_left=null;
	two_front=null;
	two_right=null;
	two_left_forward=null;
	two_right_forward=null;
	two_to_three_right=false;
	two_to_three_left=false;
	three_left=null;
	three_front=null;
	three_right=null;
	three_left_forward=null;
	three_right_forward=null;
	three_to_four_right=false;
	three_to_four_left=false;
	four_left=null;
	four_front=null;
	four_right=null;
	four_left_forward=null;
	four_right_forward=null;
	four_to_five_right=false;
	four_to_five_left=false;
	five_left=null;
	five_front=null;
	five_right=null;
	five_left_forward=null
	five_right_forward=null;
	entrance_distance=-1;
	exit_distance=-1;
}

// Main "UpdateView()" function.
// This function determines which walls are visible and their distances from 
// where we stand.  It also finds the heaviest object at each visible location,
// plus any current NPCs that might be standing in a visible location, and draws them.
function UpdateView()
{
	// clear the view
	paper.clear();
	
	// load all of our wall information from where we stand
	GetWallInformation();
	
	// update the compass if needed
	UpdateCompass();
	
	// update our door information
	UpdateDoors();
	
	// clear the closest NPC
	CLOSEST_NPC = null;
	
	// make sure our "defense" layer is active
	$('#fire_defense').append(DEFENSE_IMG);
	$('#fire_defense').append(DEFENSE_MAP);
	
	// clear all coords
	$(DEFENSE_AREA_1).attr('coords', '');
	$(DEFENSE_AREA_2).attr('coords', '');
	$(DEFENSE_AREA_3).attr('coords', '');
	$(DEFENSE_AREA_4).attr('coords', '');
	$(DEFENSE_AREA_5).attr('coords', '');
	
	
	/********* START AT LOCATION 0 *************/
	
	// draw all of our walls around us
	if(current_left==1)
		DrawLeftWall(0,0,one_left,current_front,1,false);
	
	if(current_front==1)
		DrawFrontWall(0,current_left,current_right,current_left_forward,current_right_forward,false,false);
		
	if(current_right==1)
		DrawRightWall(0,0,one_right,current_front,1,false);
	
	
	// if we have a wall in front of us, we're done!
	if(current_front==1)
	{
		if(location_of_bank != null && location_of_bank[0] == Current_Location[0] && location_of_bank[1] == Current_Location[1])
			DisplayBankImage(0);
		return;
	}
	
	if(location_of_bank != null && location_of_bank[0] == Current_Location[0] && location_of_bank[1] == Current_Location[1])
			DisplayBankImage(0);
		
	// do we connect the walls?
	if(current_right==0&&one_right==0)
	{
		DrawRightEdge(0,false);
		current_to_one_right=true;
	}
	
	if(current_left==0&&one_left==0)
	{
		DrawLeftEdge(0,false);
		current_to_one_left=true;
	}
	
	// next location!
	if(one_left==1)
		DrawLeftWall(1,current_left,two_left,one_front,one_left_forward,current_to_one_left);
		
	if(one_front==1)
		DrawFrontWall(1,one_left,one_right,one_left_forward,one_right_forward,current_to_one_right,current_to_one_left);
		
	if(one_right==1)
		DrawRightWall(1,current_right,two_right,one_front,one_right_forward,current_to_one_right);
	
	var location_at = GetLocationFrom(1);
	if(location_of_bank != null && location_of_bank[0] == location_at[0] && location_of_bank[1] == location_at[1])
				DisplayBankImage(1);
	
	// if we have a wall between space 1 and 2, draw items we need and return.
	if(one_front==1)
	{
		for(var i=1;i<2;i++)
		{
			var location_at=GetLocationFrom(i);
			
			var trap=GetTrapAt(location_at[0],location_at[1]);
			
			var npc = GetNPCAt(location_at[0], location_at[1]);
			
			var heaviest_item=GetHeaviestItemAt(location_at[0],location_at[1]);
			
			if(trap!=null && heaviest_item == null)
				DrawItem(trap,i);
				
			
			if(heaviest_item!=null)
				DrawItem(heaviest_item,i);
				
			if(npc != null)
				DrawItem(npc, i);
				
			if(Maze[location_at[0]][location_at[1]][4]!="v")
				Maze[location_at[0]][location_at[1]][4]="l";
				
			if(MapSeen())
				AddPoints("MapFull",null);
		}
		return;
	}
	
	if(one_right==0&&two_right==0)
	{
		DrawRightEdge(1,current_to_one_right);
		one_to_two_right=true;
	}
	
	if(one_left==0&&two_left==0)
	{
		DrawLeftEdge(1,current_to_one_left);
		one_to_two_left=true;
	}
	
	if(two_left==1)
		DrawLeftWall(2,one_left,three_left,two_front,two_left_forward,current_to_one_left);
		
	if(two_front==1)
		DrawFrontWall(2,two_left,two_right,two_left_forward,two_right_forward,one_to_two_right,one_to_two_left);
		
	if(two_right==1)
		DrawRightWall(2,one_right,three_right,two_front,two_right_forward,current_to_one_right);
	
	var location_at = GetLocationFrom(2);
	if(location_of_bank != null && location_of_bank[0] == location_at[0] && location_of_bank[1] == location_at[1])
				DisplayBankImage(2);
	
	if(two_front==1)
	{
		for(var i=2;i>=1;i--)
		{
			var location_at=GetLocationFrom(i);
			
			
			var trap=GetTrapAt(location_at[0],location_at[1]);
			var npc = GetNPCAt(location_at[0], location_at[1]);
			
			var heaviest_item=GetHeaviestItemAt(location_at[0],location_at[1]);
			
			if(trap!=null && heaviest_item == null)
				DrawItem(trap,i);
				
			
			if(heaviest_item!=null)
				DrawItem(heaviest_item,i);
				
			if(npc != null)
				DrawItem(npc, i);
				
			if(Maze[location_at[0]][location_at[1]][4]!="v")
				Maze[location_at[0]][location_at[1]][4]="l";
			
			if(MapSeen())
				AddPoints("MapFull",null);
		}
		return;
	}
	
	if(two_right==0&&three_right==0)
	{
		DrawRightEdge(2,one_to_two_right);
		two_to_three_right=true;
	}
	
	if(two_left==0&&three_left==0)
	{
		DrawLeftEdge(2,one_to_two_left);
		two_to_three_left=true;
	}
	
	if(three_left==1)
		DrawLeftWall(3,two_left,four_left,three_front,three_left_forward,one_to_two_left);
		
	if(three_front==1)
		DrawFrontWall(3,three_left,three_right,three_left_forward,three_right_forward,two_to_three_right,two_to_three_left);
		
	if(three_right==1)
		DrawRightWall(3,two_right,four_right,three_front,three_right_forward,one_to_two_right);
	
	var location_at = GetLocationFrom(3);
	if(location_of_bank != null && location_of_bank[0] == location_at[0] && location_of_bank[1] == location_at[1])
				DisplayBankImage(3);
	
	if(three_front==1)
	{
		for(var i=3;i>=1;i--)
		{
			var location_at=GetLocationFrom(i);
			
			var trap=GetTrapAt(location_at[0],location_at[1]);
			var npc = GetNPCAt(location_at[0], location_at[1]);
			
			var heaviest_item=GetHeaviestItemAt(location_at[0],location_at[1]);
			
			if(trap!=null && heaviest_item == null)
				DrawItem(trap,i);
				
			
			if(heaviest_item!=null)
				DrawItem(heaviest_item,i);
				
			if(npc != null)
				DrawItem(npc, i);
				
			if(Maze[location_at[0]][location_at[1]][4]!="v")
				Maze[location_at[0]][location_at[1]][4]="l";
				
			if(MapSeen())
				AddPoints("MapFull",null);
		}
		return;
	}
	
	if(three_right==0&&four_right==0)
	{
		DrawRightEdge(3,two_to_three_right);
		three_to_four_right=true;
	}
	
	if(three_left==0&&four_left==0)
	{
		DrawLeftEdge(3,two_to_three_left);
		three_to_four_left=true;
	}
	
	if(four_left==1)
		DrawLeftWall(4,three_left,five_left,four_front,four_left_forward,two_to_three_left);
		
	if(four_front==1)
		DrawFrontWall(4,four_left,four_right,four_left_forward,four_right_forward,three_to_four_right,three_to_four_left);
		
	if(four_right==1)
		DrawRightWall(4,three_right,five_right,four_front,four_right_forward,two_to_three_right);
	
	var location_at = GetLocationFrom(4);
	if(location_of_bank != null && location_of_bank[0] == location_at[0] && location_of_bank[1] == location_at[1])
				DisplayBankImage(4);
	
	if(four_front==1)
	{
		for(var i=4;i>=1;i--)
		{
			var location_at=GetLocationFrom(i);
			
			var trap=GetTrapAt(location_at[0],location_at[1]);
			var npc = GetNPCAt(location_at[0], location_at[1]);
			
			var heaviest_item=GetHeaviestItemAt(location_at[0],location_at[1]);
			
			if(trap!=null && heaviest_item == null)
				DrawItem(trap,i);
				
			
			if(heaviest_item!=null)
				DrawItem(heaviest_item,i);
				
			if(npc != null)
				DrawItem(npc, i);
				
			if(Maze[location_at[0]][location_at[1]][4]!="v")
				Maze[location_at[0]][location_at[1]][4]="l";
				
			if(MapSeen())
				AddPoints("MapFull",null);
		}
		return;
	}
	
	if(four_right==0&&five_right==0)
	{
		DrawRightEdge(4,three_to_four_right);
		four_to_five_right=true;
	}
	
	if(four_left==0&&five_left==0)
	{
		DrawLeftEdge(4,three_to_four_left);
		four_to_five_left=true;
	}
	
	if(five_left==1)
		DrawLeftWall(5,four_left,1,five_front,five_left_forward,three_to_four_left);
	
	if(five_front==1)
		DrawFrontWall(5,five_left,five_right,five_left_forward,five_right_forward,four_to_five_right,four_to_five_left);
		
	if(five_right==1)
		DrawRightWall(5,four_right,1,five_front,five_right_forward,three_to_four_right);
	
	var location_at = GetLocationFrom(5);
	if(location_of_bank != null && location_of_bank[0] == location_at[0] && location_of_bank[1] == location_at[1])
				DisplayBankImage(5);
	
	if(five_front==1)
	{
		for(var i=5;i>=1;i--)
		{
			var location_at=GetLocationFrom(i);
			
			var trap=GetTrapAt(location_at[0],location_at[1]);
			var npc = GetNPCAt(location_at[0], location_at[1]);
			
			var heaviest_item=GetHeaviestItemAt(location_at[0],location_at[1]);
			
			if(trap!=null && heaviest_item == null)
				DrawItem(trap,i);
				
			
			if(heaviest_item!=null)
				DrawItem(heaviest_item,i);
				
			if(npc != null)
				DrawItem(npc, i);
			
			if(Maze[location_at[0]][location_at[1]][4]!="v")
				Maze[location_at[0]][location_at[1]][4]="l";
				
			if(MapSeen())
				AddPoints("MapFull",null);
		}
		return;
	}
	
	for(var i=5;i>=1;i--)
	{
		var location_at=GetLocationFrom(i);
		var heaviest_item=GetHeaviestItemAt(location_at[0],location_at[1]);
		var trap=GetTrapAt(location_at[0],location_at[1]);
		var npc = GetNPCAt(location_at[0], location_at[1]);
			
		var heaviest_item=GetHeaviestItemAt(location_at[0],location_at[1]);
		
		if(trap!=null && heaviest_item == null)
			DrawItem(trap,i);
			
		
		if(heaviest_item!=null)
			DrawItem(heaviest_item,i);
			
		if(npc != null)
			DrawItem(npc, i);
			
		if(Maze[location_at[0]][location_at[1]][4]!="v")
			Maze[location_at[0]][location_at[1]][4]="l";
			
		if(MapSeen())
			AddPoints("MapFull",null);
	}
	
	DrawDistantFrontWall(five_left,five_right,four_left_forward,four_right_forward,four_to_five_right,four_to_five_left);
	
	paper.image(DISTANT_FOG.src,TL5[0],TL5[1],18,11)
}

function GetWallInformation()
{
	current_left=GetLeftWall(0);
	current_front=GetFrontWall(0);
	current_right=GetRightWall(0);
	current_left_forward=GetFrontLeftWall(0);
	current_right_forward=GetFrontRightWall(0);
	one_left=GetLeftWall(1);
	one_front=GetFrontWall(1);
	one_right=GetRightWall(1);
	one_left_forward=GetFrontLeftWall(1);
	one_right_forward=GetFrontRightWall(1);
	two_left=GetLeftWall(2);
	two_front=GetFrontWall(2);
	two_right=GetRightWall(2);
	two_left_forward=GetFrontLeftWall(2);
	two_right_forward=GetFrontRightWall(2);
	three_left=GetLeftWall(3);
	three_front=GetFrontWall(3);
	three_right=GetRightWall(3);
	three_left_forward=GetFrontLeftWall(3);
	three_right_forward=GetFrontRightWall(3);
	four_left=GetLeftWall(4);
	four_front=GetFrontWall(4);
	four_right=GetRightWall(4);
	four_left_forward=GetFrontLeftWall(4);
	four_right_forward=GetFrontRightWall(4);
	five_left=GetLeftWall(5);
	five_front=GetFrontWall(5);
	five_right=GetRightWall(5);
	five_left_forward=GetFrontLeftWall(5);
	five_right_forward=GetFrontRightWall(5);
	current_to_one_left=false;
	current_to_one_right=false;
	one_to_two_left=false;
	one_to_two_right=false;
	two_to_three_left=false;
	two_to_three_right=false;
	three_to_four_left=false;
	three_to_four_right=false;
	four_to_five_right=false;
	four_to_five_left=false;
}

function UpdateCompass()
{
	if(NEEDLE==null)
		NEEDLE=compass_paper.image(COMPASS_NEEDLE.src,34,14,14,55);
	
	NEEDLE.animate({transform:"r"+ANGLE},500,"<>");
}

function UpdateDoors()
{
	if(FindEntrance(Current_Location[0],Current_Location[1],Current_Direction,0))
		DrawEntrance();
		
	if(FindExit(Current_Location[0],Current_Location[1],Current_Direction,0))
		DrawExit();
}

function FindEntrance(x,y,direction,depth)
{
	if(depth>=6)
		return false;
	
	switch(direction)
	{
		case 0:
			if((ENTER==3||ENTER==0||ENTER==1)&&ENTRANCE_X==x&&ENTRANCE_Y==y)
			{
				entrance_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindEntrance(x,(y-1),direction,(depth+1));
				else
					return false;
			}
			break;
		case 1:
			if((ENTER==0||ENTER==1||ENTER==2)&&ENTRANCE_X==x&&ENTRANCE_Y==y)
			{
				entrance_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindEntrance((x+1),y,direction,(depth+1));
				else
					return false;
			}
			break;
		case 2:
			if((ENTER==1||ENTER==2||ENTER==3)&&ENTRANCE_X==x&&ENTRANCE_Y==y)
			{
				entrance_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindEntrance(x,(y+1),direction,(depth+1));
				else
					return false;
			}
			break;
		case 3:
			if((ENTER==2||ENTER==3||ENTER==0)&&ENTRANCE_X==x&&ENTRANCE_Y==y)
			{
				entrance_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindEntrance((x-1),y,direction,(depth+1));
				else
					return false;
			}
			break;
	}
}

function FindExit(x,y,direction,depth)
{
	if(depth>=6)
		return false;
	
	switch(direction)
	{
		case 0:
			if((EXIT==3||EXIT==0||EXIT==1)&&STARTING_X==x&&STARTING_Y==y)
			{
				exit_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindExit(x,(y-1),direction,(depth+1));
				else
					return false;
			}
			break;
		case 1:
			if((EXIT==0||EXIT==1||EXIT==2)&&STARTING_X==x&&STARTING_Y==y)
			{
				exit_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindExit((x+1),y,direction,(depth+1));
				else
					return false;
			}
			break;
		case 2:
			if((EXIT==1||EXIT==2||EXIT==3)&&STARTING_X==x&&STARTING_Y==y)
			{
				exit_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindExit(x,(y+1),direction,(depth+1));
				else
					return false;
			}
			break;
		case 3:
			if((EXIT==2||EXIT==3||EXIT==0)&&STARTING_X==x&&STARTING_Y==y)
			{
				exit_distance=depth;
				return true;
			}
			else
			{
				if(Maze[x][y][direction]==0)
					return FindExit((x-1),y,direction,(depth+1));
				else
					return false;
			}
			break;
	}
}

function GetLocationFrom(distance)
{
	var distant_location=new Array();
	distant_location[0]=Current_Location[0];
	distant_location[1]=Current_Location[1];
	
	switch(Current_Direction)
	{
		case 0:
			distant_location[1]-=distance;
			break;
		case 1:
			distant_location[0]+=distance;
			break;
		case 2:
			distant_location[1]+=distance;
			break;
		case 3:
			distant_location[0]-=distance;
			break;
	}
	return distant_location
};

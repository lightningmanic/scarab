// current locations
var Current_Location = new Array(ENTRANCE_X, ENTRANCE_Y);

// set direction
// DIRECTIONS:
//  0: North
//  1: East
//  2: South
//  3: West
var Current_Direction = 1;

// main canvas to draw in
var paper;

// arrays to hold points based on distance
// Distance = 0 (current location)
var TL_CORNER = new Array(0, 0);
var TR_CORNER = new Array(604, 0);
var BL_CORNER = new Array(0, 430);
var BR_CORNER = new Array(604, 430);

var TL_0 = new Array(12, 0);
var BL_0 = new Array(12, 366);
var TR_0 = new Array(592, 0);
var BR_0 = new Array(592, 366);

var TL0 = new Array(64, 0);
var TR0 = new Array(540, 0);
var BL0 = new Array(64, 366);
var BR0 = new Array(540, 366);

// Edges
var EDGE_BR0 = new Array(516, 342);
var EDGE_TR0 = new Array(516, 0);
var EDGE_TL0 = new Array(88, 0);
var EDGE_BL0 = new Array(88, 342);

var EDGE_BR1 = new Array(408, 228);
var EDGE_TR1 = new Array(408, 30);
var EDGE_TL1 = new Array(196, 30);
var EDGE_BL1 = new Array(196, 228);

var EDGE_BR2 = new Array(355, 176);
var EDGE_TR2 = new Array(355, 84);
var EDGE_TL2 = new Array(249, 84);
var EDGE_BL2 = new Array(249, 176);

var EDGE_TR3 = new Array(327, 110);
var EDGE_BR3 = new Array(327, 150);
var EDGE_TL3 = new Array(277, 110);
var EDGE_BL3 = new Array(277, 150);

var EDGE_TR4 = new Array(315, 121);
var EDGE_BR4 = new Array(315, 138);
var EDGE_TL4 = new Array(290, 121);
var EDGE_BL4 = new Array(290, 138);

// for drawing our second spaces
var TL0_1 = new Array(170, 0);
var TR0_1 = new Array(434, 0);

var TL_01 = new Array(158, 16);
var BL_01 = new Array(158, 244);
var TR_01 = new Array(446, 16);
var BR_01 = new Array(446, 244);

var TL_02 = new Array(234, 76);
var BL_02 = new Array(234, 184);
var TR_02 = new Array(370, 76);
var BR_02 = new Array(370, 184);

var TL_03 = new Array(230, 76);
var BL_03 = new Array(230, 184);
var TR_03 = new Array(374, 76);
var BR_03 = new Array(374, 184);


// Distance = 1
var TL1 = new Array(184, 16);
var TR1 = new Array(420, 16);
var BL1 = new Array(184, 244);
var BR1 = new Array(420, 244);

// Distance = 2
var TL2 = new Array(242, 76);
var TR2 = new Array(362, 76);
var BL2 = new Array(242, 184);
var BR2 = new Array(362, 184);

// Distance = 3
var TL3 = new Array(274, 106);
var TR3 = new Array(330, 106);
var BL3 = new Array(274, 154);
var BR3 = new Array(330, 154);

// Distance = 4
var TL4 = new Array(285, 117);
var TR4 = new Array(317, 117);
var BL4 = new Array(285, 142);
var BR4 = new Array(317, 142);

// Distance = 5
var TL5 = new Array(292, 124);
var TR5 = new Array(310, 124);
var BL5 = new Array(292, 135);
var BR5 = new Array(310, 135);

// Door images
//var ENTER_LEFT = "images/entrance_door_left.png";
//var ENTER_FRONT = "images/entrance_door.png";
//var ENTER_RIGHT = "images/entrance_door_right.png";

//var EXIT_LEFT = "images/exit_door_left.png";
//var EXIT_FRONT = "images/exit_door.png";
//var EXIT_RIGHT = "images/exit_door_right.png";
var ENTRANCE_DOOR; // = "images/entrance_door_space.png";
var ENTRANCE_LEFT; // = "images/entrance_door_left_space.png";
var ENTRANCE_RIGHT; // = "images/entrance_door_right_space.png";
var EXIT_DOOR; // = "images/exit_door_space.png";
var EXIT_LEFT; // = "images/exit_door_left_space.png";
var EXIT_RIGHT; // = "images/exit_door_right_space.png";


//******************** DOOR DRAWING POINTS AND SIZES *************************//

// FRONT VIEW //
var DOOR0_FRONT_POINT = new Array(150, -34);
var DOOR1_FRONT_POINT = new Array(230, 44);
var DOOR2_FRONT_POINT = new Array(268, 84);
var DOOR3_FRONT_POINT = new Array(288, 114);
var DOOR4_FRONT_POINT = new Array(296, 122);
var DOOR5_FRONT_POINT = new Array(300, 126);

var DOOR0_FRONT_SIZE = new Array(300, 400);
var DOOR1_FRONT_SIZE = new Array(150, 200);
var DOOR2_FRONT_SIZE = new Array(75, 100);
var DOOR3_FRONT_SIZE = new Array(30, 40);
var DOOR4_FRONT_SIZE = new Array(15, 20);
var DOOR5_FRONT_SIZE = new Array(6, 9);

// LEFT VIEW //
var DOOR0_LEFT_POINT = new Array(-100, -27);
var DOOR1_LEFT_POINT = new Array(230, 44);
var DOOR2_LEFT_POINT = new Array(268, 84);
var DOOR3_LEFT_POINT = new Array(288, 114);
var DOOR4_LEFT_POINT = new Array(296, 122);
var DOOR5_LEFT_POINT = new Array(300, 126);

var DOOR0_LEFT_SIZE = new Array(125, 550);
var DOOR1_LEFT_SIZE = new Array(150, 200);
var DOOR2_LEFT_SIZE = new Array(75, 100);
var DOOR3_LEFT_SIZE = new Array(30, 40);
var DOOR4_LEFT_SIZE = new Array(15, 20);
var DOOR5_LEFT_SIZE = new Array(6, 9);



function StartMaze()
{
    // setup a piece of paper to draw on!
    paper = Raphael(document.getElementById('view'), 604, 420);
    
    
    
    // update our view!
    UpdateView();
    
    // draw darkness, if we're out of oil or do not have a lamp
    if(Darkness())
		paper.image(NO_LIGHT.src, 0, 0, 604, 420);
    
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
		//document.getElementById('inventory_description').innerHTML += itemlist;
		AddMessage(itemlist);
		
		// enable the pickup button!
		document.getElementById('pickup_button').disabled = '';
	}
}



// Returns 1 if there is a wall to the left of the cell passed in (based on distance from us and our direction)
function GetLeftWall(distance)
{
	// based on our direction, our distance will either be
	// added or subtracted, so let's update that now...
	switch(Current_Direction)
	{
		case 0:		// North
			distance = 0 - distance;
			break;
		case 3:		// West
			distance = 0 - distance;
			break;
		// Others (1 [East], 2 [South]) are added, so no need to negate
	}
	
    // if our distance puts our lookup beyond the maze...
    if(SegFault(distance))
        return 1;
    
    // get left wall's direction
    var left_direction = Current_Direction - 1;
    
    // if we were facing North, our left_direction is now -1, so update that to 3
    if(left_direction < 0)
        left_direction = 3;
    
    // now return this wall's value
    if(Current_Direction % 2 == 0)  // we are facing either north or south, so add distance to Y
        return NoSegs((Current_Location[0]),(Current_Location[1]+distance),left_direction);
    else
        return NoSegs((Current_Location[0]+distance),(Current_Location[1]),left_direction);
}

// Returns 1 if there is a wall in front of the cell passed in (based on distance from us and our direction)
function GetFrontWall(distance)
{
	// based on our direction, our distance will either be
	// added or subtracted, so let's update that now...
	switch(Current_Direction)
	{
		case 0:		// North
			distance = 0 - distance;
			break;
		case 3:		// West
			distance = 0 - distance;
			break;
		// Others (1 [East], 2 [South]) are added, so no need to negate
	}
	
    // if our distance puts our lookup beyond the maze...
    if(SegFault(distance))
        return 1;


    // now return this wall's value
    if(Current_Direction % 2 == 0)  // we are facing either north or south, so add distance to Y
    {
        return NoSegs((Current_Location[0]),(Current_Location[1] + distance), Current_Direction);
    }
    else
    {
        return NoSegs((Current_Location[0]+distance),(Current_Location[1]), Current_Direction);
    }
}

// Returns 1 if there is a wall to the right of the cell passed in (based on distance from us and our direction)
function GetRightWall(distance)
{
	// based on our direction, our distance will either be
	// added or subtracted, so let's update that now...
	switch(Current_Direction)
	{
		case 0:		// North
			distance = 0 - distance;
			break;
		case 3:		// West
			distance = 0 - distance;
			break;
		// Others (1 [East], 2 [South]) are added, so no need to negate
	}
	
    // if our distance puts our lookup beyond the maze...
    if(SegFault(distance))
        return 1;
    
    // get right wall's direction
    var right_direction = Current_Direction + 1;
    
    // if we were facing West, our right_direction is now 4, so update that to 0
    if(right_direction > 3)
        right_direction = 0;
        
     // now return this wall's value
    if(Current_Direction % 2 == 0)  // we are facing either north or south, so add distance to Y
        return NoSegs((Current_Location[0]),(Current_Location[1]+distance),right_direction);
    else
        return NoSegs((Current_Location[0]+distance),(Current_Location[1]),right_direction);
}

// Returns 1 if there is a wall in front of the cell to the left of the cell passed in (based on distance from us and our direction)
function GetFrontLeftWall(distance)
{    
	// based on our direction, our distance will either be
	// added or subtracted, so let's update that now...
	switch(Current_Direction)
	{
		case 0:		// North
			distance = 0 - distance;
			break;
		case 3:		// West
			distance = 0 - distance;
			break;
		// Others (1 [East], 2 [South]) are added, so no need to negate
	}
    // get left wall's direction
    var left_direction = Current_Direction - 1;
    
    // if we were facing North, our left_direction is now -1, so update that to 3
    if(left_direction < 0)
        left_direction = 3;
        
    // get the location of the cell to our left
    var left_x = Current_Location[0];
    var left_y = Current_Location[1];
    
    
    if(Current_Direction % 2 == 0)  // we are facing north or south, so add distance to Y
        left_y += distance;
    else
        left_x += distance;
        
    
    switch(Current_Direction)
    {
        case 0: // facing north
            left_x = left_x - 1;
            break;
        case 1: // facing east
            left_y = left_y - 1;
            break;
        case 2: // facing south
            left_x = left_x + 1;
            break;
        case 3: // facing west
            left_y = left_y + 1;
            break;
    }
    
    // check, based on our current direction, if we'll be able to access our desired location
    switch(Current_Direction)
    {
        case 0:     // North
            if(left_y < 0 || left_y >= HEIGHT)
                return 1;
            break;
        case 1:     // East
            if(left_x < 0 || left_x >= WIDTH)
                return 1;
            break;
        case 2:     // South
            if(left_y < 0 || left_y >= HEIGHT)
                return 1;
            break;
        case 3:     // West
            if(left_x < 0 || left_x >= WIDTH)
                return 1;
            break;
    }
    
    // check to make sure we can see this wall (there's no wall blocking us)
    if(Current_Direction % 2 == 0)
    {
        if(Maze[Current_Location[0]][(Current_Location[1] + distance)][left_direction] == 0)
        {
            // then return the front wall one space to the left over
            return Maze[left_x][left_y][Current_Direction];
        }
        return 1;
    }
    else
    {
        if(Maze[(Current_Location[0]+distance)][Current_Location[1]][left_direction] == 0)
        {
            // then return the front wall one space to the left over
            return Maze[left_x][left_y][Current_Direction];
        }
        return 1;
    }
}

// Returns 1 if there is a wall in front of the cell to the right of the cell passed in (based on distance from us and our direction)
function GetFrontRightWall(distance)
{
	// based on our direction, our distance will either be
	// added or subtracted, so let's update that now...
	switch(Current_Direction)
	{
		case 0:		// North
			distance = 0 - distance;
			break;
		case 3:		// West
			distance = 0 - distance;
			break;
		// Others (1 [East], 2 [South]) are added, so no need to negate
	}
	
    // get right wall's direction
    var right_direction = Current_Direction + 1;
    
    // if we were facing West, our right_direction is now 4, so update that to 0
    if(right_direction > 3)
        right_direction = 0;
        
    // get the location of the cell to our left
    var right_x = Current_Location[0];
    var right_y = Current_Location[1];
    
    // if the current direction is either North or South (0 or 2), add distance to Y
    if((Current_Direction % 2) == 0)
        right_y += distance;
    else
        right_x += distance;
    
    // update which cell we're looking at based on our current direction
    switch(Current_Direction)
    {
        case 0: // facing north
            right_x = right_x + 1;
            break;
        case 1: // facing east
            right_y = right_y + 1;
            break;
        case 2: // facing south
            right_x = right_x - 1;
            break;
        case 3: // facing west
            right_y = right_y - 1;
            break;
    }
    
    // check, based on our current direction, if we'll be able to access our desired location
    switch(Current_Direction)
    {
        case 0:     // North
            if(right_y < 0 || right_y >= HEIGHT)
                return 1;
            break;
        case 1:     // East
            if(right_x < 0 || right_x >= WIDTH)
                return 1;
            break;
        case 2:     // South
            if(right_y < 0 || right_y >= HEIGHT)
                return 1;
            break;
        case 3:     // West
            if(right_x < 0 || right_x >= WIDTH)
                return 1;
            break;
    }

    
    // check to make sure we can see this wall (there's no wall blocking us)
    if((Current_Direction % 2) == 0)
    {
        if(NoSegs((Current_Location[0]), (Current_Location[1]+distance), right_direction) == 0)
        {
            // then return the front wall one space to the left over
            return NoSegs(right_x, right_y, Current_Direction);
        }
        return 1;
    }
    else
    {
        if(NoSegs((Current_Location[0]+distance),(Current_Location[1]), right_direction) == 0)
        {
            // then return the front wall one space to the left over
            return NoSegs(right_x,right_y,Current_Direction);
        }
        return 1;
    }
}

// Draws a left wall at the location given (distance)
//  "prev_wall" and "next_wall" are given so we know if we draw vertical lines
//  "connected_to_front" is given so we know if we draw an inner vertical line
//  "left_front" is given to we know if we should draw our horizontal lines or not
function DrawLeftWall(distance, prev_wall, next_wall, connected_to_front, left_front, drew_prev_left)
{
    if(distance == 0)
    {
        // draw side of left wall if there isn't another wall attached
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TL0, BL0);
        
        // draw bottom of left wall
        DrawLine(BL0, BL_CORNER);
    }
    if(distance == 1)
    {
        // draw top of left wall
        DrawLine(TL0_1, TL1);
        
        // draw left side of left wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TL0, BL0);
            
            // if there is a left_front wall, draw two horizontal lines
            if(left_front == 1)
            {
                // now draw both horizontal lines
                paper.path("M"+BL0[0] + " " + BL0[1] + "L"+BL_CORNER[0] + " "+ BL0[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BL0, BL_0);
                DrawLine(BL_0, TL_0);
            }
        }
        
        // draw right side of left wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
        {
            // draw vertical line
            DrawLine(TL1, BL1);
        }
        
        // draw bottom of left wall
        DrawLine(BL1, BL0);
    }
    
    if(distance == 2)
    {
        // draw top of left wall
        DrawLine(TL1, TL2);
        
        // draw left side of left wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TL1, BL1);
            
            // if there's a front-left wall, draw horizontal lines
            if(left_front == 1)
            {
				var top_drawto = TL0[0];
				var bottom_drawto = BL0[0];
				if(drew_prev_left == 1)
				{
					top_drawto = EDGE_TL0[0];
					bottom_drawto = EDGE_BL0[0];
				}
                // draw both horizontal lines
                paper.path("M"+TL1[0] + " " + TL1[1]+"L"+top_drawto+" "+TL1[1]);
                paper.path("M"+BL1[0] + " " + BL1[1]+"L"+bottom_drawto+" "+BL1[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BL1, BL_01);
                DrawLine(BL_01, TL_01);
                DrawLine(TL_01, TL1);
            }
        }
        
        // draw right side of left wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TL2, BL2);
            
        // draw bottom of left wall
        DrawLine(BL2, BL1);
    }
    
    if(distance == 3)
    {
        // draw top of left wall
        DrawLine(TL2, TL3);
        
        // draw left side of left wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TL2, BL2);
            
            // if there's a front-left wall, draw horizontal lines
            if(left_front == 1)
            {
				var top_drawto = TL1[0];
				var bottom_drawto = BL1[0];
				if(drew_prev_left == 1)
				{
					top_drawto = EDGE_TL1[0];
					bottom_drawto = EDGE_BL1[0];
				}
				
                // draw both horizontal lines
                paper.path("M"+TL2[0] + " " + TL2[1]+"L"+top_drawto+" "+TL2[1]);
                paper.path("M"+BL2[0] + " " + BL2[1]+"L"+bottom_drawto+" "+BL2[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BL2, BL_02);
                DrawLine(BL_02, TL_02);
                DrawLine(TL_02, TL2);
            }
        }
        
        // draw right side of left wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TL3, BL3);
            
        // draw bottom of left wall
        DrawLine(BL3, BL2);
    }
    
    if(distance == 4)
    {
        // draw top of left wall
        DrawLine(TL3, TL4);
        
        // draw left side of left wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TL3, BL3);
            
            // if there's a front-left wall, draw horizontal lines
            if(left_front == 1)
            {
				var top_drawto = TL2[0];
				var bottom_drawto = BL2[0];
				if(drew_prev_left == 1)
				{
					top_drawto = EDGE_TL2[0];
					bottom_drawto = EDGE_BL2[0];
				}
				
                // draw both horizontal lines
                paper.path("M"+TL3[0] + " " + TL3[1]+"L"+top_drawto+" "+TL3[1]);
                paper.path("M"+BL3[0] + " " + BL3[1]+"L"+bottom_drawto+" "+BL3[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BL3, BL_03);
                DrawLine(BL_03, TL_03);
                DrawLine(TL_03, TL3);
            }
        }
        
        // draw right side of left wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TL4, BL4);
            
        // draw bottom of left wall
        DrawLine(BL4, BL3);
    }
    
    if(distance == 5)
    {
        // draw top of left wall
        DrawLine(TL4, TL5);
        
        // draw left side of left wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TL4, BL4);
            
            // if there's a front-left wall, draw horizontal lines
            if(left_front == 1)
            {
				var top_drawto = TL3[0];
				var bottom_drawto = BL3[0];
				if(drew_prev_left == 1)
				{
					top_drawto = EDGE_TL3[0];
					bottom_drawto = EDGE_BL3[0];
				}
				
                // draw both horizontal lines
                paper.path("M"+TL4[0] + " " + TL4[1]+"L"+top_drawto+" "+TL4[1]);
                paper.path("M"+BL4[0] + " " + BL4[1]+"L"+bottom_drawto+" "+BL4[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BL4, BL_04);
                DrawLine(BL_04, TL_04);
                DrawLine(TL_04, TL4);
            }
        }
        
        // draw right side of left wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TL5, BL5);
            
        // draw bottom of left wall
        DrawLine(BL5, BL4);
    }
}

// Draws a front wall based on the distance given
//  "connected_to_left" and "connected_to_right" are given so we know if we should
//      draw our vertical lines
//  "left" and "right" are given for similar reasons - they represent a continuating wall in the front
//  "drew_right" and "drew_left" are given so if we do draw a continued horizontal line (top/bottom), we know
//      where to stop - the X value for stopping changes depending on these values
function DrawFrontWall(distance, connected_to_left, connected_to_right, left, right, drew_right, drew_left)
{
    if(distance == 0)
    {
        // draw bottom of front wall
        DrawLine(BL0, BR0);
        
        // as long as there isn't an opening here AND a continued wall, we can draw a border
        if(connected_to_left == 1 || left == 0)
        {
            // draw left vertical line
            DrawLine(TL0, BL0);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a left wall
            if(left == 1)
            {
                // draw vertical lines
                paper.path("M"+BL0[0] + " " + BL0[1]+"L"+BL_CORNER[0] + " " + BL0[1]);
            }
        }
        
        // if we are connected to our right wall...
        if(connected_to_right == 1 || right == 0)
        {
            // draw right vertical wall
            DrawLine(BR0, TR0);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a right wall
            if(right == 1)
            {
                // draw vertical lines
                paper.path("M"+BR0[0] + " " + BR0[1]+"L"+BR_CORNER[0] + " " + BR0[1]);
            }
        }
        
    }
    
    if(distance == 1)
    {      
        // draw bottom of front wall
        DrawLine(BL1, BR1);
        
        // draw top of front wall
        DrawLine(TR1, TL1);
        
        // as long as there isn't an opening here AND a continued wall, we can draw a border
        if(connected_to_left == 1 || left == 0)
        {
            // draw left vertical line
            DrawLine(TL1, BL1);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a left wall
            if(left == 1)
            {
                // if we drew a left wall, we only draw to EDGE_xL0
                if(drew_left == true)
                {
                    paper.path("M"+TL1[0] + " " + TL1[1]+"L"+EDGE_TL0[0] + " " + TL1[1]);
                    paper.path("M"+BL1[0] + " " + BL1[1]+"L"+EDGE_BL0[0] + " " + BL1[1]);
                }
                else
                {
                    // draw vertical lines
                    paper.path("M"+TL1[0] + " " + TL1[1]+"L"+TL0[0] + " " + TL1[1]);
                    paper.path("M"+BL1[0] + " " + BL1[1]+"L"+BL0[0] + " " + BL1[1])
                }
            }
        }
        
        // as long as there isn't an opening here AND a continued wall, we can draw a border
        if(connected_to_right == 1 || right == 0)
        {
            // draw left vertical line
            DrawLine(TR1, BR1);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a left wall
            if(right == 1)
            {
                // if we drew a left wall, we only draw to EDGE_xL0
                if(drew_right == true)
                {
                    paper.path("M"+TR1[0] + " " + TR1[1]+"L"+EDGE_TR0[0] + " " + TR1[1]);
                    paper.path("M"+BR1[0] + " " + BR1[1]+"L"+EDGE_BR0[0] + " " + BR1[1]);
                }
                else
                {
                    // draw vertical lines
                    paper.path("M"+TR1[0] + " " + TR1[1]+"L"+TR0[0] + " " + TR1[1]);
                    paper.path("M"+BR1[0] + " " + BR1[1]+"L"+BR0[0] + " " + BR1[1])
                }
            }
        }
    }
    
    if(distance == 2)
    {
        // draw bottom of front wall
        DrawLine(BL2, BR2);
        
        // draw top of front wall
        DrawLine(TR2, TL2);
        
        // as long as there isn't an opening here AND a continued wall, we can draw a border
        if(connected_to_left == 1 || left == 0)
        {
            // draw left vertical line
            DrawLine(TL2, BL2);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a left wall
            if(left == 1)
            {
                if(drew_left == true)
                {
                    paper.path("M"+BL2[0] + " " + BL2[1]+"L"+EDGE_BL1[0] + " " + BL2[1]);
                    paper.path("M"+TL2[0] + " " + TL2[1]+"L"+EDGE_TL1[0] + " " + TL2[1]);
                }
                else
                {
                    paper.path("M"+BL2[0] + " " + BL2[1]+"L"+BL1[0] + " " + BL2[1]);
                    paper.path("M"+TL2[0] + " " + TL2[1]+"L"+TL1[0] + " " + TL2[1]);
                }
            }
        }
        
        // if we are connected to our right wall...
        if(connected_to_right == 1 || right == 0)
        {
            // draw right vertical wall
            DrawLine(BR2, TR2);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a right wall
            if(right == 1)
            {
                if(drew_right == true)
                {
                    // draw vertical lines
                paper.path("M"+BR2[0] + " " + BR2[1]+"L"+EDGE_BR1[0] + " " + BR2[1]);
                paper.path("M"+TR2[0] + " " + TR2[1]+"L"+EDGE_TR1[0] + " " + TR2[1]);
                }
                else
                {
                    // draw vertical lines
                    paper.path("M"+BR2[0] + " " + BR2[1]+"L"+BR1[0] + " " + BR2[1]);
                    paper.path("M"+TR2[0] + " " + TR2[1]+"L"+TR1[0] + " " + TR2[1]);
                }
            }
        }
    }
    
    if(distance == 3)
    {
        // draw bottom of front wall
        DrawLine(BL3, BR3);
        
        // draw top of front wall
        DrawLine(TR3, TL3);
        
        // as long as there isn't an opening here AND a continued wall, we can draw a border
        if(connected_to_left == 1 || left == 0)
        {
            // draw left vertical line
            DrawLine(TL3, BL3);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a left wall
            if(left == 1)
            {
                if(drew_left == true)
                {
                    paper.path("M"+BL3[0] + " " + BL3[1]+"L"+EDGE_BL2[0] + " " + BL3[1]);
                    paper.path("M"+TL3[0] + " " + TL3[1]+"L"+EDGE_TL2[0] + " " + TL3[1]);
                }
                else
                {
                    paper.path("M"+BL3[0] + " " + BL3[1]+"L"+BL2[0] + " " + BL3[1]);
                    paper.path("M"+TL3[0] + " " + TL3[1]+"L"+TL2[0] + " " + TL3[1]);
                }
            }
        }
        
        // if we are connected to our right wall...
        if(connected_to_right == 1 || right == 0)
        {
            // draw right vertical wall
            DrawLine(BR3, TR3);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a right wall
            if(right == 1)
            {
                if(drew_right == true)
                {
                    // draw vertical lines
                paper.path("M"+BR3[0] + " " + BR3[1]+"L"+EDGE_BR2[0] + " " + BR3[1]);
                paper.path("M"+TR3[0] + " " + TR3[1]+"L"+EDGE_TR2[0] + " " + TR3[1]);
                }
                else
                {
                    // draw vertical lines
                    paper.path("M"+BR3[0] + " " + BR3[1]+"L"+BR2[0] + " " + BR3[1]);
                    paper.path("M"+TR3[0] + " " + TR3[1]+"L"+TR2[0] + " " + TR3[1]);
                }
            }
        }
    }
    
    if(distance == 4)
    {
        // draw bottom of front wall
        DrawLine(BL4, BR4);
        
        // draw top of front wall
        DrawLine(TR4, TL4);
        
        // as long as there isn't an opening here AND a continued wall, we can draw a border
        if(connected_to_left == 1 || left == 0)
        {
            // draw left vertical line
            DrawLine(TL4, BL4);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a left wall
            if(left == 1)
            {
                if(drew_left == true)
                {
                    paper.path("M"+BL4[0] + " " + BL4[1]+"L"+EDGE_BL3[0] + " " + BL4[1]);
                    paper.path("M"+TL4[0] + " " + TL4[1]+"L"+EDGE_TL3[0] + " " + TL4[1]);
                }
                else
                {
                    paper.path("M"+BL4[0] + " " + BL4[1]+"L"+BL3[0] + " " + BL4[1]);
                    paper.path("M"+TL4[0] + " " + TL4[1]+"L"+TL3[0] + " " + TL4[1]);
                }
            }
        }
        
        // if we are connected to our right wall...
        if(connected_to_right == 1 || right == 0)
        {
            // draw right vertical wall
            DrawLine(BR4, TR4);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a right wall
            if(right == 1)
            {
                if(drew_right == true)
                {
                    // draw vertical lines
                    paper.path("M"+BR4[0] + " " + BR4[1]+"L"+EDGE_BR3[0] + " " + BR4[1]);
                    paper.path("M"+TR4[0] + " " + TR4[1]+"L"+EDGE_TR3[0] + " " + TR4[1]);
                }
                else
                {
                    // draw vertical lines
                    paper.path("M"+BR4[0] + " " + BR4[1]+"L"+BR3[0] + " " + BR4[1]);
                    paper.path("M"+TR4[0] + " " + TR4[1]+"L"+TR3[0] + " " + TR4[1]);
                }
            }
        }
    }
    
    if(distance == 5)
    {
        // draw bottom of front wall
        DrawLine(BL5, BR5);
        
        // draw top of front wall
        DrawLine(TR5, TL5);
        
        // as long as there isn't an opening here AND a continued wall, we can draw a border
        if(connected_to_left == 1 || left == 0)
        {
            // draw left vertical line
            DrawLine(TL5, BL5);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a left wall
            if(left == 1)
            {
                if(drew_left == true)
                {
                    paper.path("M"+BL5[0] + " " + BL5[1]+"L"+EDGE_BL4[0] + " " + BL5[1]);
                    paper.path("M"+TL5[0] + " " + TL5[1]+"L"+EDGE_TL4[0] + " " + TL5[1]);
                }
                else
                {
                    paper.path("M"+BL5[0] + " " + BL5[1]+"L"+BL4[0] + " " + BL5[1]);
                    paper.path("M"+TL5[0] + " " + TL5[1]+"L"+TL4[0] + " " + TL5[1]);
                }
            }
        }
        
        // if we are connected to our right wall...
        if(connected_to_right == 1 || right == 0)
        {
            // draw right vertical wall
            DrawLine(BR5, TR5);
        }
        else
        {
            // otherwise, we need to draw horizontal lines IFF there is a right wall
            if(right == 1)
            {
                if(drew_right == true)
                {
                    // draw vertical lines
                    paper.path("M"+BR5[0] + " " + BR5[1]+"L"+EDGE_BR4[0] + " " + BR5[1]);
                    paper.path("M"+TR5[0] + " " + TR5[1]+"L"+EDGE_TR4[0] + " " + TR5[1]);
                }
                else
                {
                    // draw vertical lines
                    paper.path("M"+BR5[0] + " " + BR5[1]+"L"+BR4[0] + " " + BR5[1]);
                    paper.path("M"+TR5[0] + " " + TR5[1]+"L"+TR4[0] + " " + TR5[1]);
                }
            }
        }
    }
}

function DrawDistantFrontWall(connected_to_left, connected_to_right, left, right, drew_right, drew_left)
{    
    // as long as there isn't an opening here AND a continued wall, we can draw a border
    if(connected_to_left == 1 || left == 0)
    {
        // draw left vertical line
        if(left == 0)
            DrawLine(TL5, BL5);
    }
    else
    {
        // otherwise, we need to draw horizontal lines IFF there is a left wall
        if(left == 1)
        {
            DrawLine(TL5, BL5);
            if(drew_left == true)
            {
                paper.path("M"+BL5[0] + " " + BL5[1]+"L"+EDGE_BL4[0] + " " + BL5[1]);
                paper.path("M"+TL5[0] + " " + TL5[1]+"L"+EDGE_TL4[0] + " " + TL5[1]);
            }
            else
            {
                paper.path("M"+BL5[0] + " " + BL5[1]+"L"+BL4[0] + " " + BL5[1]);
                paper.path("M"+TL5[0] + " " + TL5[1]+"L"+TL4[0] + " " + TL5[1]);
            }
        }
    }
    
    // if we are connected to our right wall...
    if(connected_to_right == 1 || right == 0)
    {
        // draw right vertical wall
        if(right == 0)
            DrawLine(BR5, TR5);
    }
    else
    {
        // otherwise, we need to draw horizontal lines IFF there is a right wall
        if(right == 1)
        {
            DrawLine(BR5, TR5);
            if(drew_right == true)
            {
                // draw vertical lines
                paper.path("M"+BR5[0] + " " + BR5[1]+"L"+EDGE_BR4[0] + " " + BR5[1]);
                paper.path("M"+TR5[0] + " " + TR5[1]+"L"+EDGE_TR4[0] + " " + TR5[1]);
            }
            else
            {
                // draw vertical lines
                paper.path("M"+BR5[0] + " " + BR5[1]+"L"+BR4[0] + " " + BR5[1]);
                paper.path("M"+TR5[0] + " " + TR5[1]+"L"+TR4[0] + " " + TR5[1]);
            }
        }
    }
}


// Draws a right wall at the location given (distance)
//  "prev_wall" and "next_wall" are given so we know if we draw vertical lines
//  "connected_to_front" is given so we know if we draw an inner vertical line
//  "right_front" is given to we know if we should draw our horizontal lines or not
function DrawRightWall(distance, prev_wall, next_wall, connected_to_front, right_front, drew_prev_right)
{
    if(distance == 0)
    {
        // draw left side of right wall if there isn't another wall attached
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TR0, BR0);
        
        // draw bottom of right wall
        DrawLine(BR0, BR_CORNER);
    }
    if(distance == 1)
    {
        // draw top of right wall
        DrawLine(TR0_1, TR1);

        // draw right side of right wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TR0, BR0);
            
            // if there is a right front wall, draw horizontal lines
            if(right_front == 1)
            {
                // now draw both horizontal lines
                paper.path("M"+BR0[0] + " "+BR0[1]+"L"+BR_CORNER[0]+" "+BR0[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BR0, BR_0);
                DrawLine(BR_0, TR_0);
            }
        }
        
        // draw left side of right wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
        {
            // draw vertical line
            DrawLine(TR1, BR1);
        }
        
        // draw bottom of right wall
        DrawLine(BR1, BR0);
    }
    
    if(distance == 2)
    {
        // draw top of right wall
        DrawLine(TR1, TR2);
        
        // draw right side of right wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TR1, BR1);
            
            // if there's a front-right wall, draw horizontal lines
            if(right_front == 1)
            {
                var top_drawto = TR0[0];
                var bottom_drawto = BR0[0];
                if(drew_prev_right == 1)
                {
                        top_drawto = EDGE_TR0[0];
                        bottom_drawto = EDGE_BR0[0];
                }
                // draw both horizontal lines
                paper.path("M"+TR1[0] + " " +TR1[1] + "L"+top_drawto + " "+TR1[1]);
                paper.path("M"+BR1[0] + " " +BR1[1] + "L"+bottom_drawto + " "+BR1[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BR1, BR_01);
                DrawLine(BR_01, TR_01);
                DrawLine(TR_01, TR1);
            }
        }
        
        // draw left side of right wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TR2, BR2);
            
        // draw bottom of right wall
        DrawLine(BR2, BR1);
    }
    
    if(distance == 3)
    {
        // draw top of left wall
        DrawLine(TR2, TR3);
        
        // draw left side of left wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TR2, BR2);
            
            // if there's a front-left wall, draw horizontal lines
            if(right_front == 1)
            {
				var top_drawto = TR1[0];
				var bottom_drawto = BR1[0];
				if(drew_prev_right == 1)
				{
					top_drawto = EDGE_TR1[0];
					bottom_drawto = EDGE_BR1[0];
				}
				
                // draw both horizontal lines
                paper.path("M"+TR2[0] + " " + TR2[1]+"L"+top_drawto+" "+TR2[1]);
                paper.path("M"+BR2[0] + " " + BR2[1]+"L"+bottom_drawto+" "+BR2[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                DrawLine(BR2, BR_02);
                DrawLine(BR_02, TR_02);
                DrawLine(TR_02, TR2);
            }
        }
        
        // draw right side of left wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TR3, BR3);
            
        // draw bottom of left wall
        DrawLine(BR3, BR2);
    }
    
    if(distance == 4)
    {
         // draw top of right wall
        DrawLine(TR3, TR4);
        
        // draw right side of right wall if there wasn't a previous wall
        if(prev_wall == 0)
        {
            // draw vertical line
            DrawLine(TR3, BR3);
            
            // if there's a front-right wall, draw horizontal lines
            if(right_front == 1)
            {
                var top_drawto = TR2[0];
                var bottom_drawto = BR2[0];
                if(drew_prev_right == 1)
                {
                        top_drawto = EDGE_TR2[0];
                        bottom_drawto = EDGE_BR2[0];
                }
                // draw both horizontal lines
                paper.path("M"+TR3[0] + " " +TR3[1] + "L"+top_drawto + " "+TR3[1]);
                paper.path("M"+BR3[0] + " " +BR3[1] + "L"+bottom_drawto + " "+BR3[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                // bottom line
                DrawLine(BR3, BR_03);
                // right vertical line
                DrawLine(BR_03, TR_03);
                // top line
                DrawLine(TR_03, TR3);
            }
        }
        
        // draw left side of right wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TR4, BR4);
            
        // draw bottom of right wall
        DrawLine(BR4, BR3);
    }
    
    if(distance == 5)
    {
        // draw top of right wall
        DrawLine(TR4, TR5);
        
        // draw right side of right wall if there wasn't a previous wall
        if(prev_wall == 0)
        {            
            // draw vertical line
            DrawLine(TR4, BR4);
            
            // if there's a front-right wall, draw horizontal lines
            if(right_front == 1)
            {
                var top_drawto = TR3[0];
                var bottom_drawto = BR3[0];
                if(drew_prev_right == 1)
                {
                        top_drawto = EDGE_TR3[0];
                        bottom_drawto = EDGE_BR3[0];
                }
                // draw both horizontal lines
                paper.path("M"+TR4[0] + " " +TR4[1] + "L"+top_drawto + " "+TR4[1]);
                paper.path("M"+BR4[0] + " " +BR4[1] + "L"+bottom_drawto + " "+BR4[1]);
            }
            else
            {
                // otherwise draw the edge of this wall
                // bottom line
                DrawLine(BR4, BR_04);
                // right vertical line
                DrawLine(BR_04, TR_04);
                // top line
                DrawLine(TR_04, TR4);
            }
        }
        
        // draw left side of right wall if there isn't a next wall
        if(next_wall == 0 || connected_to_front == 1)
            DrawLine(TR5, BR5);
            
        // draw bottom of right wall
        DrawLine(BR5, BR4);
    }
}

// Draws a perpendicular wall ending at our current path
// "distance" is given so we know which coordinates to use
// and "drew_edge" is given so we know how far to draw our horizontal lines
function DrawRightEdge(distance, drew_edge)
{
    if(distance == 0)
    {
        // draw horizontal line
        paper.path("M"+BR0[0] + " " + BR0[1] + "L"+BR_CORNER[0] + " " + BR0[1]);
        
        // draw diagonal line
        DrawLine(BR0, EDGE_BR0);
        
        // draw vertical lines
        DrawLine(EDGE_BR0, EDGE_TR0);
        DrawLine(BR0, TR0);
    }
    
    if(distance == 1)
    {
        // draw right-vertical line
        DrawLine(BR1, TR1);
        
        // draw left-vertical line
        DrawLine(EDGE_BR1, EDGE_TR1);
        
        // draw bottom diagonal
        DrawLine(BR1, EDGE_BR1);
        
        // draw top diagonal
        DrawLine(TR1, EDGE_TR1);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TR1[0] + " " + TR1[1]+"L"+EDGE_TR0[0] + " " + TR1[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BR1[0] + " " + BR1[1]+"L"+EDGE_BR0[0] + " " + BR1[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TR1[0] + " " + TR1[1]+"L"+TR0[0] + " " + TR1[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BR1[0] + " " + BR1[1]+"L"+BR0[0] + " " + BR1[1]);
        }
    }
    
    if(distance == 2)
    {
        // draw right-vertical line
        DrawLine(BR2, TR2);
        
        // draw left-vertical line
        DrawLine(EDGE_BR2, EDGE_TR2);
        
        // draw bottom diagonal
        DrawLine(BR2, EDGE_BR2);
        
        // draw top diagonal
        DrawLine(TR2, EDGE_TR2);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TR2[0] + " " + TR2[1]+"L"+EDGE_TR1[0] + " " + TR2[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BR2[0] + " " + BR2[1]+"L"+EDGE_BR1[0] + " " + BR2[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TR2[0] + " " + TR2[1]+"L"+TR1[0] + " " + TR2[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BR2[0] + " " + BR2[1]+"L"+BR1[0] + " " + BR2[1]);
        }
    }
    
    if(distance == 3)
    {
        // draw right-vertical line
        DrawLine(BR3, TR3);
        
        // draw left-vertical line
        DrawLine(EDGE_BR3, EDGE_TR3);
        
        // draw bottom diagonal
        DrawLine(BR3, EDGE_BR3);
        
        // draw top diagonal
        DrawLine(TR3, EDGE_TR3);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TR3[0] + " " + TR3[1]+"L"+EDGE_TR2[0] + " " + TR3[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BR3[0] + " " + BR3[1]+"L"+EDGE_BR2[0] + " " + BR3[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TR3[0] + " " + TR3[1]+"L"+TR2[0] + " " + TR3[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BR3[0] + " " + BR3[1]+"L"+BR2[0] + " " + BR3[1]);
        }
    }
    
    if(distance == 4)
    {
        // draw right-vertical line
        DrawLine(BR4, TR4);
        
        // draw left-vertical line
        DrawLine(EDGE_BR4, EDGE_TR4);
        
        // draw bottom diagonal
        DrawLine(BR4, EDGE_BR4);
        
        // draw top diagonal
        DrawLine(TR4, EDGE_TR4);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TR4[0] + " " + TR4[1]+"L"+EDGE_TR3[0] + " " + TR4[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BR4[0] + " " + BR4[1]+"L"+EDGE_BR3[0] + " " + BR4[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TR4[0] + " " + TR4[1]+"L"+TR3[0] + " " + TR4[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BR4[0] + " " + BR4[1]+"L"+BR3[0] + " " + BR4[1]);
        }
    }
}

// Draws a perpendicular wall ending at our current path
// "distance" is given so we know which coordinates to use
// and "drew_edge" is given so we know how far to draw our horizontal lines
function DrawLeftEdge(distance, drew_edge)
{
    if(distance == 0)
    {
        // draw horizontal line
        paper.path("M"+BL0[0] + " " + BL0[1] + "L"+BL_CORNER[0] + " " + BL0[1]);
        
        // draw diagonal line
        DrawLine(BL0, EDGE_BL0);
        
        // draw vertical lines
        DrawLine(EDGE_BL0, EDGE_TL0);
        DrawLine(BL0, TL0);
    }
    
    if(distance == 1)
    {
        // draw right-vertical line
        DrawLine(BL1, TL1);
        
        // draw left-vertical line
        DrawLine(EDGE_BL1, EDGE_TL1);
        
        // draw bottom diagonal
        DrawLine(BL1, EDGE_BL1);
        
        // draw top diagonal
        DrawLine(TL1, EDGE_TL1);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TL1[0] + " " + TL1[1]+"L"+EDGE_TL0[0] + " " + TL1[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BL1[0] + " " + BL1[1]+"L"+EDGE_BL0[0] + " " + BL1[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TL1[0] + " " + TL1[1]+"L"+TL0[0] + " " + TL1[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BL1[0] + " " + BL1[1]+"L"+BL0[0] + " " + BL1[1]);
        }
    }
    if(distance == 2)
    {
        // draw right-vertical line
        DrawLine(BL2, TL2);
        
        // draw left-vertical line
        DrawLine(EDGE_BL2, EDGE_TL2);
        
        // draw bottom diagonal
        DrawLine(BL2, EDGE_BL2);
        
        // draw top diagonal
        DrawLine(TL2, EDGE_TL2);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TL2[0] + " " + TL2[1]+"L"+EDGE_TL1[0] + " " + TL2[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BL2[0] + " " + BL2[1]+"L"+EDGE_BL1[0] + " " + BL2[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TL2[0] + " " + TL2[1]+"L"+TL1[0] + " " + TL2[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BL2[0] + " " + BL2[1]+"L"+BL1[0] + " " + BL2[1]);
        }
    }
    
    if(distance == 3)
    {
        // draw right-vertical line
        DrawLine(BL3, TL3);
        
        // draw left-vertical line
        DrawLine(EDGE_BL3, EDGE_TL3);
        
        // draw bottom diagonal
        DrawLine(BL3, EDGE_BL3);
        
        // draw top diagonal
        DrawLine(TL3, EDGE_TL3);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TL3[0] + " " + TL3[1]+"L"+EDGE_TL2[0] + " " + TL3[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BL3[0] + " " + BL3[1]+"L"+EDGE_BL2[0] + " " + BL3[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TL3[0] + " " + TL3[1]+"L"+TL2[0] + " " + TL3[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BL3[0] + " " + BL3[1]+"L"+BL2[0] + " " + BL3[1]);
        }
    }
    
    if(distance == 4)
    {
        // draw right-vertical line
        DrawLine(BL4, TL4);
        
        // draw left-vertical line
        DrawLine(EDGE_BL4, EDGE_TL4);
        
        // draw bottom diagonal
        DrawLine(BL4, EDGE_BL4);
        
        // draw top diagonal
        DrawLine(TL4, EDGE_TL4);
        
        // if we drew a right edge previously, we only go to EDGE_xR0
        if(drew_edge == true)
        {
            // draw top horizontal line
            paper.path("M"+TL4[0] + " " + TL4[1]+"L"+EDGE_TL3[0] + " " + TL4[1]);
        
            // draw bottom horizontal line
            paper.path("M"+BL4[0] + " " + BL4[1]+"L"+EDGE_BL3[0] + " " + BL4[1]);
        }
        else
        {
            // draw top horizontal line
            paper.path("M"+TL4[0] + " " + TL4[1]+"L"+TL3[0] + " " + TL4[1]);
            
            // draw bottom horizontal line
            paper.path("M"+BL4[0] + " " + BL4[1]+"L"+BL3[0] + " " + BL4[1]);
        }
    }
}

// This function draws a line from "Start" to "End" on the element 'paper'.
// Start is:
//  [x, y]
// and End is:
//  [x, y]
function DrawLine(Start, End)
{
    paper.path("M"+Start[0]+" "+Start[1]+"L"+End[0]+" "+End[1]);
}

// Checks to make sure that the point in the Maze we're going to be attempting to
// access is actually within the edges of the maze.
// If it is, it returns false (meaning no error)
// Otherwise it returns true (meaning there WILL be an error if you try it!)
function SegFault(distance)
{
    // check based on our current direction
    switch(Current_Direction)
    {
        case 0:     // North
            var y = Current_Location[1] + distance;
            if(y < 0 || y >= HEIGHT)
                return true;
            else
                return false;
            break;
        case 1:     // East
            var x = Current_Location[0] + distance;
            if(x < 0 || x >= WIDTH)
                return true;
            else
                return false;
            break;
        case 2:     // South
            var y = Current_Location[1] + distance;
            if(y < 0 || y >= HEIGHT)
                return true;
            else
                return false;
            break;
        case 3:     // West
            var x = Current_Location[0] + distance;
            if(x < 0 || x >= WIDTH)
                return true;
            else
                return false;
            break;
    }
}

// This function takes in X and Y as Maze coordinates.
// If the coordinates are outside of the maze, it returns a 1
// otherwise it returns the maze's wall information at the coordinates
// given, and the wall given
function NoSegs(x, y, wall)
{
	if(x >= WIDTH || x < 0)
		return 1;
	if(y >= HEIGHT || y < 0)
		return 1;
	return Maze[x][y][wall];
}

// This function draws the entering door (start of the maze)
// On a wall based on the distance and direction.
function DrawEntrance()
{
    // Call DrawDoor, passing in the Entrance door's image name
    DrawDoor(ENTRANCE_DOOR.src, 'entrance', ENTRANCE_LEFT.src, ENTRANCE_RIGHT.src);
}

function DrawExit()
{
    // Call DrawDoor, passing in the Exit door's image name
    DrawDoor(EXIT_DOOR.src, 'exit', EXIT_LEFT.src, EXIT_RIGHT.src);
}

function DrawDoor(door_front, door_type, door_left, door_right)
{
	// determine direction
	var direction = 'right';
	var door_image = door_right;
	
	// what are we looking for (distance of entrance or exit?)
	var distance_type = entrance_distance;
	
	
	var door = ENTER;
	if(door_type == 'exit')
	{
		door = EXIT;
		distance_type = exit_distance;
	}

    // if our direction is the same as the direction of the door, we use the front image
    if(Current_Direction == door)
    {
		direction = 'front';
		door_image = door_front;
	}
        
    // if our direction is greater than the door's side OR we're facing north and the door is to the west (always)
    // use the left door image
    if(Current_Direction > door || (Current_Direction == 0 && door == 3))
    {
		direction = 'left';
		door_image = door_left;
	}

        
    // now draw the door based on distance
    switch(direction)
    {
        case 'front':
            switch(distance_type)
            {
                case 0:
                    paper.image(door_image, 64, -50, 477, 417);
                    break;
                case 1:
                    paper.image(door_image, TL1[0], TL1[1], (TR1[0] - TL1[0]), (BL1[1] - TL1[1]));
                    break;
                case 2:
                    paper.image(door_image, TL2[0], TL2[1], (TR2[0] - TL2[0]), (BL2[1] - TL2[1]));
                    break;
                case 3:
                    paper.image(door_image, TL3[0], TL3[1], (TR3[0] - TL3[0]), (BL3[1] - TL3[1]));
                    break;
                case 4:
                    paper.image(door_image, TL4[0], TL4[1], (TR4[0] - TL4[0]), (BL4[1] - TL4[1]));
                    break;
                case 5:
                    paper.image(door_image, TL5[0], TL5[1], (TR5[0] - TL5[0]), (BL5[1] - TL5[1]));
                    break;
            }
            break;
        case 'left':
            switch(distance_type)
            {
                case 0:
                    paper.image(door_image, -142, -228, 214, 786);
                    break;
                case 1:
                    paper.image(door_image, 64, -126, 121, 493);
                    break;
                case 2:
                    paper.image(door_image, TL1[0], TL1[1], (TL2[0] - TL1[0]), (BL1[1] - TL1[1]));
                    break;
                case 3:
                    paper.image(door_image, TL2[0], TL2[1], (TL3[0] - TL2[0]), (BL2[1] - TL2[1]));
                    break;
                case 4:
                    paper.image(door_image, TL3[0], TL3[1], (TL4[0] - TL3[0]), (BL3[1] - TL3[1]));
                    break;
                case 5:
                    paper.image(door_image, TL4[0], TL4[1], (TL5[0] - TL4[0]), (BL4[1] - TL4[1]));
                    break;
            }
            break;
        case 'right':
            switch(distance_type)
            {
                case 0:
                    paper.image(door_image, 608-56, -228, 214, 786);
                    break;
                case 1:
                    paper.image(door_image, 608-64, -126, 121, 493);
                    break;
                case 2:
                    paper.image(door_image, TR1[0], TR1[1], (TR2[0] - TR1[0]), (BR1[1] - TR1[1]));
                    break;
                case 3:
                    paper.image(door_image, TR2[0], TR2[1], (TR3[0] - TR2[0]), (BR2[1] - TR2[1]));
                    break;
                case 4:
                    paper.image(door_image, TR3[0], TR3[1], (TR4[0] - TR3[0]), (BR3[1] - TR3[1]));
                    break;
                case 5:
                    paper.image(door_image, TR4[0], TR4[1], (TR5[0] - TR4[0]), (BR4[1] - TR4[1]));
                    break;
            }
            break;
    }
}

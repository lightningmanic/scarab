/*******************************************************************************
 * File: "maze.js"
 * Date: November 21, 2011
 * Author: David Pettifor
 * Description:
 *  This javascript file contains 3 main sections:
 *  1) HTML page loading - this section simply generates the HTML elements found
 *  in the GUI, and contains functions that act as error checkers and manipulation
 *  functions (changes globals).  This section is not really needed for the
 *  generation of the maze - simply allows the user to make changes to the maze
 *  and access the HTML code generated after completion.
 *
 *  2) Maze generation -
 *  This section generates the maze itself.  A maze can be thought of as a grid
 *  of "cells", much like the small squares on a piece of graphing paper.  Each
 *  cell has 4 walls: a top, right, bottom, and left wall.  When a maze is
 *  created, certain walls get knocked down to form a path.  If a cell has
 *  already been used, we say it has been "visisted".  This is why we use an
 *  array to represent each cell:
 *      array[1, 1, 1, 1, false]
 *  Where:
 *      array[0] = top wall
 *      array[1] = right wall
 *      array[2] = bottom wall
 *      array[3] = left wall
 *      array[4] = visited
 *  A "1" means that wall is still up, and a "0" would mean it has been knocked
 *  down.  If the cell has been visited, "array[4]" would be "true".
 *
 *  To generate the maze, we first create a 2-dimensional array full of these
 *  cells, all initialized as above: all 4 walls are up, and none of the cells
 *  have been visisted.
 *
 *  We then start the maze by starting at the end.  This is represented by the
 *  variables "STARTING_X" and "STARTING_Y" where "_X" is the width, and "_Y"
 *  is the height: keep in mind that width increases as you go right, and height
 *  increases as you go DOWN.  So (0,0) would be in the top-left corner.
 *
 *  Say we start here, (so our exiting point will be at cell [0,0]).  We follow
 *  the following steps, recursively:
 *  1) Mark the current cell as being visited.
 *  2) Now get a list of neighboring cells - this is defined as cells to the
 *      top, right, bottom, or left of our current cell.
 *  3) Randomize that list of neighbors (if any).
 *  4) For each neighbor in this list, do the following:
 *      5) Check to see if that neighbor has been used.
 *      6) If not, knock the walls between our current cell, and that neighbor
 *      7) Then pass in this new neighboring cell to the recursive function,
 *          and start at step 1.
 *      8) If the neighbor has been used, move on to the next neighbor in the
 *          list, until the list is all used up.
 *
 *  What will result in the end is a maze!  The last thing that needs to be done
 *  is to generate HTML code to represent this data.  This is done using DIV
 *  tags.  They are setup much like an HTML table: rows and columns.  Each
 *  DIV is set a specific height and width, and is given a top, right, bottom,
 *  and left border based on the array representing that cell.  If there is no
 *  wall for a particular side (represented by a 0), the wall becomes
 *  transparent, and the width/height is adjusted accordingly (this keeps all
 *  of our DIV's lined up properly).  We also knock down the enterance and exit
 *  walls so our users know which way to go in/out (which two corners to
 *  connect).
 *
 *  3) The last section is the maze solver.  Because the maze is generated at
 *  random, I, the computer, nor anyone else knows exactly what the path is
 *  without solving it.  So I wrote a recursive function much like the one used
 *  to generate it, to solve it.  It first starts at the starting point defined
 *  by "ENTRANCE_X" and "ENTERANCE_Y".  It then runs through the "Maze" array
 *  and for each cell, finds neighboring cells it has access to (where the wall
 *  is defined as 0 in the array) AND where that neighbor has not yet been
 *  visited (this prevents it from getting stuck infinitely between two cells).
 *  It then calls ahead to say "hey neighbor, check your neighbors and let me
 *  know if any of them can make it to the end".  And each of their neighbors
 *  do the same (because of the recursion).  Eventually, one neighbor will say
 *  "Yes, I am the end cell you're looking for!" and a "yes" (or "true") will
 *  return all the way back through the chain of neighbors.  And every time a
 *  cell gets a "yes" from it's neighbor, it adds itself to a list of cells that
 *  are part of the solution.  In the end, we have this list of coordinates that
 *  correspond to cells on the right path - and when colored in the maze, reveal
 *  the proper path from start to finish.
 *
 ******************************************************************************/

// Cell "class" represented by an array:
// cell = {1, 1, 1, 1, false}
//
// Each element is:
//  [0] = Top wall
//  [1] = Right wall
//  [2] = Bottom wall
//  [3] = Left wall
//  [4] = visited

// Default width and height - set by function "NextLevel" when user starts a new level
var WIDTH = 3;
var HEIGHT = 3;

// Default starting position (where the Maze exit will be)
var STARTING_X = WIDTH - 1;
var STARTING_Y = HEIGHT - 1;

var ENTRANCE_X = 0;
var ENTRANCE_Y = 0;

// Size of each cell (must be a square)
var CELL_SIZE = 20;     // pixels

// Border width (keep in mind this is PER CELL - the actual border
// between cells will be twice this value)
var BORDER_WIDTH = 1;   // pixels

// Color of the borders between cells
var BORDER_COLOR = "#000000";

// Color of the borders that "don't exist"
var BORDER_NO_COLOR = "transparent";

// Style of the border (PLEASE DON'T CHANGE)
var BORDER_STYLE = "solid";

// Entrance [0 = top, 1 = right, 2 = bottom, 3 = left] with respect to starting cell
var ENTER = 3;

// Exit [0 = top, 1 = right, 2 = bottom, 3 = left] with respect to exiting cell
var EXIT = 1;

// HTML that holds the generated Maze
var Maze_HTML;

// HTML that holds the solution of the Maze
var Maze_HTML_Answer;

// Maze is a two-dimension array of cells
var Maze = new Array(WIDTH);


// Number of steps it takes to solve the maze
var Steps_to_Solve = 0;

/******************************************************************************/
//                          MAZE GENERATION                                   //
/******************************************************************************/
function ResetValues()
{
    Maze_HTML = '';
    Maze_HTML_Answer = '';
    Maze = new Array(WIDTH);
    Solution_List = new Array();
    Steps_to_Solve = 0;
    
    STARTING_X = WIDTH - 1;
    STARTING_Y = HEIGHT - 1;
}

// Initialize the maze as WIDTHxHEIGHT, setting all cells to have NOT been visited
// and all four walls turned on (put up)
function LoadMaze()
{
    ResetValues();
  
    // do some error checking
    if(ICanHazErrors())
        return;
    
    // start by creating a 10x10 maze
    for(var i = 0; i < WIDTH; i++)
    {
        Maze[i] = new Array(HEIGHT);
        for(var j = 0; j < HEIGHT; j++)
        {
            Maze[i][j] = new Array(5)//6);
            Maze[i][j][0] = 1;
            Maze[i][j][1] = 1;
            Maze[i][j][2] = 1;
            Maze[i][j][3] = 1;
            Maze[i][j][4] = false;
            //Maze[i][j][5] = new WallInfo(false);
        }
    }

    // start the maze at exit points
    GenerateMaze(STARTING_X,STARTING_Y);
    
    // re-mark all cells as not being visited, EXCEPT the first slot
    for(var i = 0; i < WIDTH; i++)
		for(var j = 0; j < HEIGHT; j++)
			Maze[i][j][4] = 'n';
	Maze[Current_Location[0]][Current_Location[1]][4] = 'v';
    
    Maze_HTML = DrawMaze();
}

// This function is called when the (dynamically) generated "View Puzzle" button
// is clicked.  It opens a new tab/window and writes the contents of "Puzzle_HTML"
// into the new window.
function ToggleMap()
{
    // do we show the map or hide it?
    if(document.getElementById('view_map_button').innerHTML == 'View Map')
    {
		// show it!!
		document.getElementById('map_view').innerHTML = DrawMaze();
		document.getElementById('map_view').style.display = 'block';
		document.getElementById('map_view').style.zIndex = 1000;
		
		// update the button's text
		document.getElementById('view_map_button').innerHTML = 'Close Map';
	}
	else
	{
		// hide it!!
		document.getElementById('map_view').style.display = 'none';
		
		// redraw our current position
		//UpdateView();
		
		// change the button's text
		document.getElementById('view_map_button').innerHTML = 'View Map';
	}
}

// This function is called when the (dynamically) generated "View Puzzle" button
// is clicked.  It opens a new tab/window and writes the contents of "Puzzle_HTML"
// into the new window.
function PlayPuzzle()
{
    var new_window = window.open('', 'Maze Puzzle');
    
    //new_window.document.getElementsByTagName("head")[0].innerHTML = '<script language="JavaScript" type="text/javascript" src="solver.js"></script>';
    
    // create a general "DIV" which will capture keystrokes
    new_window.document.write('\n<body onKeyPress="keyDown(event);"><h2 align="center">Maze Puzzle</h2><br>');
    
    // write maze information
    new_window.document.write(Maze_HTML);
    
    // add instructions
    new_window.document.write('\n'+SOLVER_SETTINGS+'\n'+STATS+'\n'+INSTRUCTIONS);
    
    // include the "solver.js" file - which allows for interactive solving!
    new_window.document.write('<script language="JavaScript" type="text/javascript" src="solver.js"></script>');
    
    new_window.document.close();
}

// This function is called when the (dynamically) generated "View Puzzle" button
// is clicked.  It opens a new tab/window and writes the contents of "Puzzle_HTML"
// into the new window.
function ShowAnswer()
{
    new_window = open()
    new_window.document.open()    
    new_window.document.write(Maze_HTML_Answer)
    new_window.document.close()
}

// Checks to make sure there are no errors in the GUI (silly pplz)
function ICanHazErrors()
{
    // check to make sure entrance and exits aren't the same
    if(STARTING_X == ENTRANCE_X && STARTING_Y == ENTRANCE_Y)
    {
        alert("You cannot have the same cell be both the entrance and exit!");
        return true;
    }
    
    // make sure height, width is all good
    if(HEIGHT <= 0 || WIDTH <= 0)
    {
        alert("Error with dimensions...please check to make sure height and width are above zero!");
        return true;
    }
    
    // make sure border is ok
    if(BORDER_WIDTH <= 0)
    {
        alert("No border will result in a white box.  Please make sure your border is at least 1.");
        return true;
    }
    
    if(BORDER_WIDTH >= CELL_SIZE)
    {
        alert("Your border is the size of your cells - this is really ugly and probably won't work...please fix this!");
        return true;
    }
    
    if(CELL_SIZE < 4)
    {
        alert("The cell size is awfully small - please make it bigger?");
        return true;
    }
    
    return false;
}

// Recursive function, passing in the "current cell"
function GenerateMaze(w, h)
{
    //alert("Marking ["+w+","+h+"] as Visited");
    // Mark the current cell as "visited"
    Maze[w][h][4] = true;
    
    // Get a list of neighbors
    var neighbors_unshuffled = GetNeighbors(w,h);
    
    // Randomly shuffle our neighbors
    var neighbors = ShuffleNeighbors(neighbors_unshuffled);
    
    // loop through our neighbors list...
    for(var i = 0; i < neighbors.length; i++)
    {
        // check if this neighbor has been visited
        //alert("Checking if Neighbor: ["+neighbors[i][0]+","+neighbors[i][1]+"] as been visited: "+Maze[neighbors[i][0]][neighbors[i][1]][4]);
        
        if(Maze[neighbors[i][0]][neighbors[i][1]][4] == false)
        {
            //alert("Removing wall between ["+w+","+h+"] and ["+neighbors[i][0]+","+neighbors[i][1]+"]");
            // remove the wall between this cell, and the current neighbor
            RemoveWall(w,h,neighbors[i]);
            
            //alert("Calling function with new neighbor: ["+neighbors[i][0]+","+neighbors[i][1]+"]");
            // Recursively call GenerateMaze, passing in this new neighbor
            GenerateMaze(neighbors[i][0], neighbors[i][1]);
        }
    }
}

// Examines the enterance and exit locations and makes the proper adjustment based
// on the ENTER and EXIT values
function InstallDoors()
{
    // Install Entrance opening
    // [0 = top, 1 = right, 2 = bottom, 3 = left] with respect to starting cell
    if (ENTER == 0)
        Maze[ENTRANCE_X][ENTRANCE_Y][0] = 0;
    if (ENTER == 1)
        Maze[ENTRANCE_X][ENTRANCE_Y][1] = 0;
    if (ENTER == 2)
        Maze[ENTRANCE_X][ENTRANCE_Y][2] = 0;
    if (ENTER == 3)
        Maze[ENTRANCE_X][ENTRANCE_Y][3] = 0;
        
    // Install Exit opening
    // [0 = top, 1 = right, 2 = bottom, 3 = left] with respect to ending cell
    if (EXIT == 0)
        Maze[STARTING_X][STARTING_Y][0] = 0;
    if (EXIT == 1)
        Maze[STARTING_X][STARTING_Y][1] = 0;
    if (EXIT == 2)
        Maze[STARTING_X][STARTING_Y][2] = 0;
    if (EXIT == 3)
        Maze[STARTING_X][STARTING_Y][3] = 0;
}

// Returns a list of arrays (w,h) that are above, below, left, and right of
// the cell that is passed in.
// Be careful: we need to check where our boundaries are so we don't end up with
// a neighbor location beyond the edges of our 2D array (maze)
function GetNeighbors(w,h)
{
    // list of neighbors
    var neighbors = new Array();
    
    // keep track of the number of neighbors we're at
    var current_neighbor = 0;
    
    // first add the neighbor above
    if(h != 0)
    {
        neighbors[current_neighbor] = new Array(w, h-1);
        current_neighbor++;
    }
    
    // add the neighbor to the right
    if(w < WIDTH - 1)
    {
        neighbors[current_neighbor] = new Array(w+1, h);
        current_neighbor++;
    }
    
    // add the neighbor below
    if(h < HEIGHT - 1)
    {
        neighbors[current_neighbor] = new Array(w, h+1);
        current_neighbor++;
    }
    
    // add the neighbor to the left
    if(w != 0)
        neighbors[current_neighbor] = new Array(w-1, h);
    
    return neighbors;
}


// This function does a fair shuffle on the list passed in
function ShuffleNeighbors(neighbors)
{
    // loop through the neighbors, finding a random place for the current one
    for(var i = 0; i < neighbors.length; i++)
    {
        // get a random number based on the length of our list
        random_index = Math.floor(Math.random()*neighbors.length);
        
        // swap the two arrays at 'i' and 'random_index' (deep copy)
        var temp_array = new Array(2);
        temp_array[0] = neighbors[i][0];
        temp_array[1] = neighbors[i][1];
        
        neighbors[i][0] = neighbors[random_index][0];
        neighbors[i][1] = neighbors[random_index][1];
        
        neighbors[random_index][0] = temp_array[0];
        neighbors[random_index][1] = temp_array[1];
    }
    
    return neighbors;
}


// This function removes the wall between the cell at "w,h" and
// the cell represented by the array "neighbor[w,h]".
// The "wall" is represented by a "1" (or "0" for absence) in the
// "Maze" array.
function RemoveWall(w, h, neighbor)
{
    // if the neighbor is above us
    if(neighbor[1] < h)
    {
        // remove the wall above us [0] and the neighbor's bottom wall [2]
        Maze[w][h][0] = 0;
        Maze[neighbor[0]][neighbor[1]][2] = 0;
        return;
    }
    
    // if the neighbor is below us
    if(neighbor[1] > h)
    {
        // remove the wall below us [2] and the neighbor's top wall [0]
        Maze[w][h][2] = 0;
        Maze[neighbor[0]][neighbor[1]][0] = 0;
        return;
    }
    
    // if the neighbor is to the right of us
    if(neighbor[0] > w)
    {
        // remove the wall to the right of us [1] and the neighbor's left wall [3]
        Maze[w][h][1] = 0;
        Maze[neighbor[0]][neighbor[1]][3] = 0;
        return;
    }
    
    // if the neighbor is to the left of us
    if(neighbor[0] < w)
    {
        // remove the wall to the left of us [3] and the neighbor's right wall [1]
        Maze[w][h][3] = 0;
        Maze[neighbor[0]][neighbor[1]][1] = 0;
        return;
    }
}

// This function loops through the "Maze" and for each cell, draws a DIV cell
// with borders that match the "walls" of that cell...
function DrawMaze()
{
    // HTML variable to hold our code
    var HTML = '\n<span style="display: inline-block; left: 50%; margin-left: -'+((WIDTH * CELL_SIZE)/2)+'px; ';
    
    // depending on how tall this thing is...adjust the top accordingly
    if((HEIGHT * CELL_SIZE) <= 400)
		HTML += 'top: 50%; margin-top: -'+((HEIGHT * CELL_SIZE)/2)+'px; ';
	else
		HTML += 'top: 0px; ';
		
	HTML += 'padding-right: 20px; padding-bottom: 20px; position: relative;">';
    
    // adjust the cell size based on our current level
    AdjustCellSize();
    
    // for each row in our maze...
    for(var j = 0; j < HEIGHT; j++)
    {
        HTML += '\n  <div style="display: table-row;">';
        
        // now run through each "cell"
        for(var i = 0; i < WIDTH; i++)
        {
			// get our fill color (based on visitation)
			var bgcolor = 'background-color: #FFF; ';
			if(Maze[i][j][4] == 'n')
				bgcolor = 'background-color: #000; ';
			if(Maze[i][j][4] == 'l')
				bgcolor = 'background-color: #999; ';
				
			if(scarab_activated && GetEducation() == 'Ph.D.')
				bgcolor = 'background-color: #FFF; ';
				
			// check to see if an object is in this cell
            if(scarab_activated && ItemsAt(i, j))
				bgcolor = 'background-color: #89A4DF; ';
			
			if(Current_Location[0] == i && Current_Location[1] == j)
				bgcolor = 'background: -moz-radial-gradient('+(CELL_SIZE / 2)+'px '+(CELL_SIZE / 2)+'px, circle, #66D717 '+(CELL_SIZE / 4)+'px, white '+(CELL_SIZE / 2)+'px); background-image: -webkit-gradient(radial, 50% 50%, '+(CELL_SIZE / 4)+', 50% 50%,'+(CELL_SIZE / 2)+', from(#66D717), to(#fff)); ';

				
			// if our map is ruined, force black
			if(wet_map)
				bgcolor = 'background-color: #000; ';
			
            // create a new cell
            HTML += '    <div id="'+i+'_'+j+'" style="display: table-cell; border-width:' + BORDER_WIDTH + '; border-style:' + BORDER_STYLE + '; float: left; '+bgcolor;
            
            // get our border information
            HTML += GetBorderStyles(i, j);
            HTML += ' text-align: center;">';
            
            // check to see if this is the cell we are in
            /*
            if(Current_Location[0] == i && Current_Location[1] == j)
            {
					// based on our current direction, add an arrow
					switch(Current_Direction)
					{
						case 0:	//North
							HTML += '&uarr;';
							break;
						case 1:	//Ease
							HTML += '&rarr;';
							break;
						case 2:	//South
							HTML += '&darr;';
							break;
						case 3:	//West
							HTML += '&larr;';
							break;
					}
			}*/
			
			// check to see if this is the ending cell
			//if(STARTING_X == i && STARTING_Y == j)
			//	HTML += 'x';
            
            // since we don't have anything left for this cell, just close it off (with the DIV)
            HTML += '</div>\n';
        }
        HTML += '  </div>\n';
    }

    HTML += '</span>\n';

    return HTML;
}

// This function adjusts the cell size based on our current level - we do this to attempt to keep our map within
// a reasonable view without shrinking it too much...
function AdjustCellSize()
{
	// if our current level is 15 or under, set the cell size to 20
	if(current_level <= 10)
	{
		CELL_SIZE = 20;
		return;
	}
		
	// for every other level after this, reduce by one
	CELL_SIZE = 20 - (Math.ceil(current_level / 2) - 8);
	
	// cap it at some point...
	if(CELL_SIZE < 4)
		CELL_SIZE = 4;
}

// This function looks at the attributes in Maze[w][h] and generates
// appropriate CSS border styles to match the wall values for that cell
function GetBorderStyles(w, h)
{
    // CSS Style code
    var CSS = ' ';
    
    var additional_width = CELL_SIZE;
    var additional_height = CELL_SIZE;
    
    // if we have a top wall
    if(Maze[w][h][0] == 1)
        CSS += ' border-top-color:' + BORDER_COLOR + ';';
    else
    {
        CSS += ' border-top-style: hidden;';
        additional_height += BORDER_WIDTH;
    }
        
    // if we have a right wall
    if(Maze[w][h][1] == 1)
        CSS += ' border-right-color:' + BORDER_COLOR + ';';
    else
    {
        CSS += ' border-right-style: hidden; ';
        additional_width += BORDER_WIDTH;
    }
        
    // if we have a bottom wall
    if(Maze[w][h][2] == 1)
        CSS += ' border-bottom-color:' + BORDER_COLOR + ';';
    else
    {
        CSS += ' border-bottom-style: hidden;';
        additional_height += BORDER_WIDTH;
    }
        
    // if we have a left wall
    if(Maze[w][h][3] == 1)
        CSS += ' border-left-color:' + BORDER_COLOR + ';';
    else
    {
        CSS += ' border-left-style: hidden;';
        additional_width += BORDER_WIDTH;
    }
    
    
    // if we have a cell on the top edge of the maze...
    if(h == 0)
    {
        // set the top border width to twice what it should be
        // this keeps the look of the borders constant, since all other walls
        // in the maze will be double the thickness
        CSS += ' border-top-width: ' + (BORDER_WIDTH * 2) + '; ';
    }
    
    // if we have a cell on the bottom edge of the maze...
    if(h == (HEIGHT - 1))
    {
        // set the top border width to twice what it should be
        // this keeps the look of the borders constant, since all other walls
        // in the maze will be double the thickness
        CSS += ' border-bottom-width: ' + (BORDER_WIDTH * 2) + '; ';
    }
    
    // if we have a cell on the right edge of the maze...
    if(w == (WIDTH - 1))
    {
        // set the top border width to twice what it should be
        // this keeps the look of the borders constant, since all other walls
        // in the maze will be double the thickness
        CSS += ' border-right-width: ' + (BORDER_WIDTH * 2) + '; ';
    }
    
    // if we have a cell on the left edge of the maze...
    if(w == 0)
    {
        // set the top border width to twice what it should be
        // this keeps the look of the borders constant, since all other walls
        // in the maze will be double the thickness
        CSS += ' border-left-width: ' + (BORDER_WIDTH * 2) + '; ';
    }
    
    // add our final widths and heights for this cell
    CSS += ' width:' + additional_width + 'px; height:' + additional_height +'px;';
    
    return CSS;
}



/******************************************************************************/
//                          MAZE SOLVER                                       //
/******************************************************************************/

// List containing all coordinates that are included in the solution's path
var Solution_List = new Array();

// This function acts the same as the recursive function - only follows different
// steps.  It starts at the starting point, and gathers a list of neighbors
// which it has access to (no wall exists between).  It then calls that neighbor
// and continues the process until we reach an accessible neighbor that has the
// same coordinates as the end.  At this point, we add that neighbor to the list
// of path coordinates and return
function SolveMaze()
{
    // reset all of the visted attributes to false
    for(var i = 0; i < WIDTH; i++)
    {
        for(var j = 0; j < HEIGHT; j++)
            Maze[i][j][4] = false;
    }
    
    // Call the maze solver, passing in the starting point
    Solver(ENTRANCE_X, ENTRANCE_Y);
    
    // draw the HTML code of the answer (maze with path filled in)
    Maze_HTML_Answer = DrawMazeAnswer();
}

// Actual recursive function
function Solver(x, y)
{
    // check to see if we're at the ending point
    if(x == STARTING_X && y == STARTING_Y)
    {
        // NOTE: we don't add one to the number of steps it takes to solve
        // because the user will already be in one cell (free move)
        // so the actual number of moves it takes to solve is one less than the
        // number of cells included in the solution's path...
        
        // add this location to the solution list
        Solution_List.push(new Array(x, y));
        return true;
    }
    
    // set this cell to being visited
    Maze[x][y][4] = true;
    
    // get a list of accessible neighbors
    var neighbors = GetNeighborAccess(x, y);

    //alert(neighbors);
    
    // don't bother randomizing them - that would be pointless.
    // Run through the list of them, checking if they lead to the end...
    for(var i = 0; i < neighbors.length; i++)
    {
        if(Solver(neighbors[i][0], neighbors[i][1]) == true)
        {
            // if one of the neighbors leads to the end, add this current
            // cell to the list of solutions
            Solution_List.push(new Array(x, y));
            
            // add one to the step count to solve
            Steps_to_Solve = Steps_to_Solve + 1;
            
            // and return true!
            return true;
        }
    }
    
    // if we never returned true up to this point, none of our neighbors lead
    // to the end, so we...unfortunately, are worthless.
    return false;
}

// This function examines the available options for a path
// and returns a list of new neighbors one can move to from the passed in
// cell
function GetNeighborAccess(x, y)
{
    var neighbor_list = new Array();
    
    // examine the walls, look for "0" (be careful for entry/exit points!)
    if(Maze[x][y][0] == 0 && y != 0 && Maze[x][y-1][4] == false)
    {
        // we can go up!
        neighbor_list.push(new Array(x, (y-1)));
    }
    
    if(Maze[x][y][1] == 0 && x != (WIDTH - 1) && Maze[x+1][y][4] == false)
    {
        // we can go to the right!
        neighbor_list.push(new Array((x + 1), y));
    }
    
    if(Maze[x][y][2] == 0 && y != (HEIGHT - 1) && Maze[x][y+1][4] == false)
    {
        // we can go down!
        neighbor_list.push(new Array(x, (y+1)));
    }
    
    if(Maze[x][y][3] == 0 && x != 0 && Maze[x-1][y][4] == false)
    {
        // we can go to the left!
        neighbor_list.push(new Array((x - 1), y));
    }
    
    return neighbor_list;
}

// This function examines the available options for a path
// and returns a list of new neighbors one can move to from the passed in
// cell
function GetNeighborMovable(x, y)
{
    var neighbor_list = new Array();
    
    // examine the walls, look for "0" (be careful for entry/exit points!)
    if(Maze[x][y][0] == 0 && y != 0)
    {
        // we can go up!
        neighbor_list.push(new Array(x, (y-1)));
    }
    
    if(Maze[x][y][1] == 0 && x != (WIDTH - 1))
    {
        // we can go to the right!
        neighbor_list.push(new Array((x + 1), y));
    }
    
    if(Maze[x][y][2] == 0 && y != (HEIGHT - 1))
    {
        // we can go down!
        neighbor_list.push(new Array(x, (y+1)));
    }
    
    if(Maze[x][y][3] == 0 && x != 0 )
    {
        // we can go to the left!
        neighbor_list.push(new Array((x - 1), y));
    }
    
    return neighbor_list;
}

// This function loops through the "Maze" and for each cell, draws a DIV cell
// with borders that match the "walls" of that cell, and if that cell exists in
// the list "Solution_List", fills the background of that cell red.
function DrawMazeAnswer()
{
    // HTML variable to hold our code
    var HTML = '\n<div style="display: table; margin-left: auto; margin-right: auto; display: table; border-collapse:collapse; ">';
    
    // for each row in our maze...
    for(var j = 0; j < HEIGHT; j++)
    {
        HTML += '\n  <div style="display: table-row;">';
        
        // now run through each "cell"
        for(var i = 0; i < WIDTH; i++)
        {
            // get background color (is answer?)
            var answer_color = "#FFFFFF; ";
            
            if(IsAnswer(i, j))
                answer_color = "#FF0000; ";            
            
            // create a new cell
            HTML += '    <div style="display: table-cell; border-width:' + BORDER_WIDTH + '; border-style:' + BORDER_STYLE + '; float: left; background-color: ' + answer_color;
            
            // get our border information
            HTML += GetBorderStyles(i, j);
            HTML += '" >';
            
            // since we don't have anything left for this cell, just close it off (with the DIV)
            HTML += '</div>\n';
        }
        HTML += '  </div>\n';
    }

    HTML += '</div>\n';

    return HTML;
}

// basically looks through the array "Solution_List" to see if the passed in coordinates
// are a cell that is on the solution path
function IsAnswer(x, y)
{
    for(var i = 0; i < Solution_List.length; i++)
    {
        if(Solution_List[i][0] == x && Solution_List[i][1] == y)
            return true;
    }
    return false;
}

// Just for kicks - this is line 1000.

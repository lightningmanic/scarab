var BOR_0, BOR_1, BOR_2, BOR_3, BOR_4, BOR_5;
var TEXT_L_0, TEXT_L_1, TEXT_L_2, TEXT_L_3, TEXT_L_4, TEXT_L_5;
var TEXT_R_0, TEXT_R_1, TEXT_R_2, TEXT_R_3, TEXT_R_4, TEXT_R_5;

var BANK_OF_RA = 'images/hieroglyphics/bor_'; // image to hold the bank of ra picture
var TEXT_LEFT = 'images/hieroglyphics/text_left_'; // image to hold random LEFT text
var TEXT_RIGHT = 'images/hieroglyphics/text_right_'; // image to hold random RIGHT text

// there can only be one bank in the maze at a time, so record
// the bank's location here:
var location_of_bank = null;
// which wall will it be on?
// note: 0 = North, 1 = East, 2 = South, 3 = West
var bank_wall = null;

/***********************************************************************
 * SetupBank()
 * Each level has a chance of having a single "Bank of RA" to be added.
 * This function calulcates that chance and, if is successfull, adds
 *  the bank to some random location in the Maze.
 * ********************************************************************/
function SetupBank()
{
	// chances of creating a bank? 
	if(Math.random() > 0.25)
	{
		location_of_bank = null;
		bank_wall = null;
		return false;
	}
		
	// otherwise find a random spot in the maze to place the bank!
	location_of_bank = new Array();
	location_of_bank.push(Math.floor(Math.random()*WIDTH));
	location_of_bank.push(Math.floor(Math.random()*HEIGHT));

	// make sure it's not in the corner...
	while(IsCorner(location_of_bank[0], location_of_bank[1])){
		location_of_bank = new Array();
		location_of_bank.push(Math.floor(Math.random()*WIDTH));
		location_of_bank.push(Math.floor(Math.random()*HEIGHT));
	}
	
	// get a list of walls for that cell
	var cell = Maze[location_of_bank[0]][location_of_bank[1]];
	
	// pick a random wall until we find one that's a "1"
	var random_wall = Math.floor(Math.random()*4);
	while(cell[random_wall] != 1)
		random_wall = Math.floor(Math.random()*4);
		
	// we have a wall!
	bank_wall = random_wall;
	
	return true;
}

function IsCorner(x, y)
{
	if(x == 0 && y == 0)
	{
		return true;
	}

	if(x == (WIDTH-1) && y == (HEIGHT - 1)){
		return true;
	}

	return false;
}


/***********************************************************************
 * DisplayBankImage()
 * ********************************************************************/
function DisplayBankImage(distance)
{
	// if we're facing the wall with the bank on it...
	if(Current_Direction == parseInt(bank_wall))
	{
		var image = new Image();
		// draw based on the distance...
		switch(distance)
		{
			case 0:
				image = BOR_0;
				break;
			case 1:
				image = BOR_1;
				break;
			case 2:
				image = BOR_2;
				break;
			case 3:
				image = BOR_3;
				break;
			case 4:
				image = BOR_4;
				break;
			case 5:
				image = BOR_5;
				break;
		}
		
		// now draw it!
		paper.image(image.src, 0, 0, 604, 420);
	}
	
	// if the bank is to the LEFT of us...
	if(Current_Direction == (parseInt(bank_wall) + 1) || (Current_Direction == 0 && parseInt(bank_wall) == 3))
	{
		var image = new Image();
		// draw based on the distance...
		switch(distance)
		{
			case 0:
				image = TEXT_L_0;
				break;
			case 1:
				image = TEXT_L_1;
				break;
			case 2:
				image = TEXT_L_2;
				break;
			case 3:
				image = TEXT_L_3;
				break;
			case 4:
				image = TEXT_L_4;
				break;
			case 5:
				image = TEXT_L_5;
				break;
		}
		
		// now draw it!
		paper.image(image.src, 0, 0, 604, 420);
	}
	
	// if the bank is to the RIGHT of us...
	if(Current_Direction == (parseInt(bank_wall) - 1) || (Current_Direction == 3 && parseInt(bank_wall) == 0))
	{
		var image = new Image();
		// draw based on the distance...
		switch(distance)
		{
			case 0:
				image = TEXT_R_0;
				break;
			case 1:
				image = TEXT_R_1;
				break;
			case 2:
				image = TEXT_R_2;
				break;
			case 3:
				image = TEXT_R_3;
				break;
			case 4:
				image = TEXT_R_4;
				break;
			case 5:
				image = TEXT_R_5;
				break;
		}
		
		// now draw it!
		paper.image(image.src, 0, 0, 604, 420);
	}
}

/***********************************************************************
 * LoadHieroglyphicImages
 * Loads all "Bank Of RA" images plus text images into cache for faster 
 * displaying.
 * All text/bor images combined total 55.7 KB (not terrible...)
 * ********************************************************************/
function LoadHieroglyphicImages()
{
	// Load Bank Of RA images
	BOR_0 = new Image();
	BOR_0.src = BANK_OF_RA + '0.png';
	
	BOR_1 = new Image();
	BOR_1.src = BANK_OF_RA + '1.png';
	
	BOR_2 = new Image();
	BOR_2.src = BANK_OF_RA + '2.png';
	
	BOR_3 = new Image();
	BOR_3.src = BANK_OF_RA + '3.png';
	
	BOR_4 = new Image();
	BOR_4.src = BANK_OF_RA + '4.png';
	
	BOR_5 = new Image();
	BOR_5.src = BANK_OF_RA + '5.png';
	
	
	// Load Left Text Images
	TEXT_L_0 = new Image();
	TEXT_L_0.src = TEXT_LEFT + '0.png';
	
	TEXT_L_1 = new Image();
	TEXT_L_1.src = TEXT_LEFT + '1.png';
	
	TEXT_L_2 = new Image();
	TEXT_L_2.src = TEXT_LEFT + '2.png';
	
	TEXT_L_3 = new Image();
	TEXT_L_3.src = TEXT_LEFT + '3.png';
	
	TEXT_L_4 = new Image();
	TEXT_L_4.src = TEXT_LEFT + '4.png';
	
	TEXT_L_5 = new Image();
	TEXT_L_5.src = TEXT_LEFT + '5.png';
	
	// Load Right Text Images
	TEXT_R_0 = new Image();
	TEXT_R_0.src = TEXT_RIGHT + '0.png';
	
	TEXT_R_1 = new Image();
	TEXT_R_1.src = TEXT_RIGHT + '1.png';
	
	TEXT_R_2 = new Image();
	TEXT_R_2.src = TEXT_RIGHT + '2.png';
	
	TEXT_R_3 = new Image();
	TEXT_R_3.src = TEXT_RIGHT + '3.png';
	
	TEXT_R_4 = new Image();
	TEXT_R_4.src = TEXT_RIGHT + '4.png';
	
	TEXT_R_5 = new Image();
	TEXT_R_5.src = TEXT_RIGHT + '5.png';
}

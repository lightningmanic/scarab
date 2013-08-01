/***********************************************************************
 * Character Images
 * 
 * This file contains global variables used for caching character images
 * in the browser.  This allows for immediate loading of the image.
 * ********************************************************************/
 //-------------- LIONESS ---------------//
 var LIONESS_IMG_1;
 var LIONESS_IMG_2;
 var LIONESS_IMG_3;
 var LIONESS_IMG_4;
 var LIONESS_IMG_5;
 var LIONESS_SLEEPING_IMG_1;
 var LIONESS_SLEEPING_IMG_2;
 var LIONESS_SLEEPING_IMG_3;
 var LIONESS_SLEEPING_IMG_4;
 var LIONESS_SLEEPING_IMG_5;
 
 
 //-------------- BAT ---------------//
 var BAT_IMG_1;
 var BAT_IMG_2;
 var BAT_IMG_3;
 var BAT_IMG_4;
 var BAT_IMG_5;
 var BAT_SLEEPING_IMG_1;
 var BAT_SLEEPING_IMG_2;
 var BAT_SLEEPING_IMG_3;
 var BAT_SLEEPING_IMG_4;
 var BAT_SLEEPING_IMG_5;
 
 
 //-------------- COBRA ---------------//
 var COBRA_IMG_1;
 var COBRA_IMG_2;
 var COBRA_IMG_3;
 var COBRA_IMG_4;
 var COBRA_IMG_5;
 var COBRA_SLEEPING_IMG_1;
 var COBRA_SLEEPING_IMG_2;
 var COBRA_SLEEPING_IMG_3;
 var COBRA_SLEEPING_IMG_4;
 var COBRA_SLEEPING_IMG_5;
 
 
 //-------------- MONKEY ---------------//
 var MONKEY_IMG_1;
 var MONKEY_IMG_2;
 var MONKEY_IMG_3;
 var MONKEY_IMG_4;
 var MONKEY_IMG_5;
 var MONKEY_SLEEPING_IMG_1;
 var MONKEY_SLEEPING_IMG_2;
 var MONKEY_SLEEPING_IMG_3;
 var MONKEY_SLEEPING_IMG_4;
 var MONKEY_SLEEPING_IMG_5;
 
 
 //-------------- MUMMY ---------------//
 var MUMMY_IMG_1;
 var MUMMY_IMG_2;
 var MUMMY_IMG_3;
 var MUMMY_IMG_4;
 var MUMMY_IMG_5;
 var MUMMY_SLEEPING_IMG_1;
 var MUMMY_SLEEPING_IMG_2;
 var MUMMY_SLEEPING_IMG_3;
 var MUMMY_SLEEPING_IMG_4;
 var MUMMY_SLEEPING_IMG_5;
 
 
  //-------------- SPIDER ---------------//
 var SPIDER_IMG_1;
 var SPIDER_IMG_2;
 var SPIDER_IMG_3;
 var SPIDER_IMG_4;
 var SPIDER_IMG_5;
 
 
  //-------------- SCORPION ---------------//
 var SCORPION_IMG_1;
 var SCORPION_IMG_2;
 var SCORPION_IMG_3;
 var SCORPION_IMG_4;
 var SCORPION_IMG_5;
 
 
/***********************************************************************
 * LoadNPCImages()
 * Loads all possible NPC images and loads them into memory for caching.
 * This allows for very fast displaying.
 * ********************************************************************/
 function LoadNPCImages()
 {
	  //-------------- LIONESS ---------------//
	  LIONESS_IMG_1 = new Image();
	  LIONESS_IMG_1.src = "images/npc/lioness_1.png";
	  
	  LIONESS_IMG_2 = new Image();
	  LIONESS_IMG_2.src = "images/npc/lioness_2.png";

	  LIONESS_IMG_3 = new Image();
	  LIONESS_IMG_3.src = "images/npc/lioness_3.png";

	  LIONESS_IMG_4 = new Image();
	  LIONESS_IMG_4.src = "images/npc/lioness_4.png";

	  LIONESS_IMG_5 = new Image();
	  LIONESS_IMG_5.src = "images/npc/lioness_5.png";

	  LIONESS_SLEEPING_IMG_1 = new Image();
	  LIONESS_SLEEPING_IMG_1.src = "images/npc/lioness_sleeping_1.png";

	  LIONESS_SLEEPING_IMG_2 = new Image();
	  LIONESS_SLEEPING_IMG_2.src = "images/npc/lioness_sleeping_2.png";

	  LIONESS_SLEEPING_IMG_3 = new Image();
	  LIONESS_SLEEPING_IMG_3.src = "images/npc/lioness_sleeping_3.png";

	  LIONESS_SLEEPING_IMG_4 = new Image();
	  LIONESS_SLEEPING_IMG_4.src = "images/npc/lioness_sleeping_4.png";

	  LIONESS_SLEEPING_IMG_5 = new Image();
	  LIONESS_SLEEPING_IMG_5.src = "images/npc/lioness_sleeping_5.png";

	 
	 
	 //-------------- BAT ---------------//
	  BAT_IMG_1 = new Image();
	  BAT_IMG_1.src = "images/npc/bat_1.png";

	  BAT_IMG_2 = new Image();
	  BAT_IMG_2.src = "images/npc/bat_2.png";

	  BAT_IMG_3 = new Image();
	  BAT_IMG_3.src = "images/npc/bat_3.png";

	  BAT_IMG_4 = new Image();
	  BAT_IMG_4.src = "images/npc/bat_4.png";

	  BAT_IMG_5 = new Image();
	  BAT_IMG_5.src = "images/npc/bat_5.png";

	  BAT_SLEEPING_IMG_1 = new Image();
	  BAT_SLEEPING_IMG_1.src = "images/npc/bat_sleeping_1.png";

	  BAT_SLEEPING_IMG_2 = new Image();
	  BAT_SLEEPING_IMG_2.src = "images/npc/bat_sleeping_2.png";

	  BAT_SLEEPING_IMG_3 = new Image();
	  BAT_SLEEPING_IMG_3.src = "images/npc/bat_sleeping_3.png";

	  BAT_SLEEPING_IMG_4 = new Image();
	  BAT_SLEEPING_IMG_4.src = "images/npc/bat_sleeping_5.png";

	  BAT_SLEEPING_IMG_5 = new Image();
	  BAT_SLEEPING_IMG_5.src = "images/npc/bat_sleeping_5.png";

	 
	 
	 //-------------- COBRA ---------------//
	  COBRA_IMG_1 = new Image();
	  COBRA_IMG_1.src = "images/npc/cobra_1.png";

	  COBRA_IMG_2 = new Image();
	  COBRA_IMG_2.src = "images/npc/cobra_2.png";

	  COBRA_IMG_3 = new Image();
	  COBRA_IMG_3.src = "images/npc/cobra_3.png";

	  COBRA_IMG_4 = new Image();
	  COBRA_IMG_4.src = "images/npc/cobra_4.png";

	  COBRA_IMG_5 = new Image();
	  COBRA_IMG_5.src = "images/npc/cobra_5.png";

	  COBRA_SLEEPING_IMG_1 = new Image();
	  COBRA_SLEEPING_IMG_1.src = "images/npc/cobra_sleeping_1.png";

	  COBRA_SLEEPING_IMG_2 = new Image();
	  COBRA_SLEEPING_IMG_2.src = "images/npc/cobra_sleeping_2.png";

	  COBRA_SLEEPING_IMG_3 = new Image();
	  COBRA_SLEEPING_IMG_3.src = "images/npc/cobra_sleeping_3.png";

	  COBRA_SLEEPING_IMG_4 = new Image();
	  COBRA_SLEEPING_IMG_4.src = "images/npc/cobra_sleeping_4.png";

	  COBRA_SLEEPING_IMG_5 = new Image();
	  COBRA_SLEEPING_IMG_5.src = "images/npc/cobra_sleeping_5.png";

	 
	 
	 //-------------- MONKEY ---------------//
	  MONKEY_IMG_1 = new Image();
	  MONKEY_IMG_1.src = "images/npc/monkey_1.png";

	  MONKEY_IMG_2 = new Image();
	  MONKEY_IMG_2.src = "images/npc/monkey_2.png";

	  MONKEY_IMG_3 = new Image();
	  MONKEY_IMG_3.src = "images/npc/monkey_3.png";

	  MONKEY_IMG_4 = new Image();
	  MONKEY_IMG_4.src = "images/npc/monkey_4.png";

	  MONKEY_IMG_5 = new Image();
	  MONKEY_IMG_5.src = "images/npc/monkey_5.png";

	  MONKEY_SLEEPING_IMG_1 = new Image();
	  MONKEY_SLEEPING_IMG_1.src = "images/npc/monkey_sleeping_1.png";

	  MONKEY_SLEEPING_IMG_2 = new Image();
	  MONKEY_SLEEPING_IMG_2.src = "images/npc/monkey_sleeping_2.png";

	  MONKEY_SLEEPING_IMG_3 = new Image();
	  MONKEY_SLEEPING_IMG_3.src = "images/npc/monkey_sleeping_3.png";

	  MONKEY_SLEEPING_IMG_4 = new Image();
	  MONKEY_SLEEPING_IMG_4.src = "images/npc/monkey_sleeping_4.png";

	  MONKEY_SLEEPING_IMG_5 = new Image();
	  MONKEY_SLEEPING_IMG_5.src = "images/npc/monkey_sleeping_5.png";

	 
	 
	 //-------------- MUMMY ---------------//
	  MUMMY_IMG_1 = new Image();
	  MUMMY_IMG_1.src = "images/npc/mummy_1.png";

	  MUMMY_IMG_2 = new Image();
	  MUMMY_IMG_2.src = "images/npc/mummy_2.png";

	  MUMMY_IMG_3 = new Image();
	  MUMMY_IMG_3.src = "images/npc/mummy_3.png";

	  MUMMY_IMG_4 = new Image();
	  MUMMY_IMG_4.src = "images/npc/mummy_4.png";

	  MUMMY_IMG_5 = new Image();
	  MUMMY_IMG_5.src = "images/npc/mummy_5.png";

	  MUMMY_SLEEPING_IMG_1 = new Image();
	  MUMMY_SLEEPING_IMG_1.src = "images/npc/mummy_sleeping_1.png";

	  MUMMY_SLEEPING_IMG_2 = new Image();
	  MUMMY_SLEEPING_IMG_2.src = "images/npc/mummy_sleeping_2.png";

	  MUMMY_SLEEPING_IMG_3 = new Image();
	  MUMMY_SLEEPING_IMG_3.src = "images/npc/mummy_sleeping_3.png";

	  MUMMY_SLEEPING_IMG_4 = new Image();
	  MUMMY_SLEEPING_IMG_4.src = "images/npc/mummy_sleeping_4.png";

	  MUMMY_SLEEPING_IMG_5 = new Image();
	  MUMMY_SLEEPING_IMG_5.src = "images/npc/mummy_sleeping_5.png";

	 
	 
	  //-------------- SPIDER ---------------//
	  SPIDER_IMG_1 = new Image();
	  SPIDER_IMG_1.src = "images/npc/spider_1.png";

	  SPIDER_IMG_2 = new Image();
	  SPIDER_IMG_2.src = "images/npc/spider_2.png";

	  SPIDER_IMG_3 = new Image();
	  SPIDER_IMG_3.src = "images/npc/spider_3.png";

	  SPIDER_IMG_4 = new Image();
	  SPIDER_IMG_4.src = "images/npc/spider_4.png";

	  SPIDER_IMG_5 = new Image();
	  SPIDER_IMG_5.src = "images/npc/spider_5.png";

	 
	 
	  //-------------- SCORPION ---------------//
	  SCORPION_IMG_1 = new Image();
	  SCORPION_IMG_1.src = "images/npc/scorpion_1.png";

	  SCORPION_IMG_2 = new Image();
	  SCORPION_IMG_2.src = "images/npc/scorpion_2.png";

	  SCORPION_IMG_3 = new Image();
	  SCORPION_IMG_3.src = "images/npc/scorpion_3.png";

	  SCORPION_IMG_4 = new Image();
	  SCORPION_IMG_4.src = "images/npc/scorpion_4.png";

	  SCORPION_IMG_5 = new Image();
	  SCORPION_IMG_5.src = "images/npc/scorpion_5.png";

 }

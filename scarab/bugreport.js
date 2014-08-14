function BugReport()
{
    if (confirm("Please save the following file and send it to me with a description of the problem at my facebook page: \nwww.facebook.com/revive.the.scarab ")) {
        // string to hold it all
        var save_content = '';
        
        // Maze information (height/width/cells)
        save_content+=WIDTH+"^"+HEIGHT+"^";
        for(var i=0; i<WIDTH; i++)
        {
                for(var j=0; j<HEIGHT; j++)
                {
                        save_content+=Maze[i][j][0]+","+Maze[i][j][1]+","+Maze[i][j][2]+","+Maze[i][j][3]+","+Maze[i][j][4]+"_";
                }
        }
        
        save_content+="^";
        
        // store level items
        for(var i=0; i<level_items.length; i++)
        {
                save_content+=SaveItem(level_items[i])+",";
        }
        
        // store current leve, game status, health, hunger, location/direction
        save_content+="^"+current_level+"^"+game_over+"^"+health+"^"+hunger+"^"+Current_Location[0]+"^"+Current_Location[1]+"^"+Current_Direction+"^";
    
        // store users inventory
        for(var i=0; i<users_inventory.length; i++)
        {
                save_content+=SaveItem(users_inventory[i])+","
        }
        
        // ancient artifacts info/points/hunger/weight/health
        save_content+="^"+STAFF_CREATED+"^"+CROWN_CREATED;
        save_content+="^"+points;
        save_content+="^"+MAX_WEIGHT+"^"+hunger_per_step;
        save_content+="^"+scarab_activated+"^"+staff_activated;
        save_content+="^"+health_status+"^";
    
        // store trap information
        for(var i=0; i<traps.length; i++)
        {
                save_content+=SaveTrap(traps[i])+","
        }
        
        // store which defense icon is active
        save_content += '^'+defense_active;
        
        // store the bank information
        save_content += '^';
        if(location_of_bank != null)
                save_content += location_of_bank[0]+','+location_of_bank[1]+','+bank_wall;
                
        // store speed
        save_content += '^' + speed + '^';
        
        // store the list of NPCs
        for(var i = 0; i < NPC_list.length; i++)
        {
                save_content += GetNPCSave(NPC_list[i]) + '~';
        }
        
        save_content += '\n\n' + navigator.userAgent;
        
        window.open("data:text/json;charset=utf-8," + escape(save_content));
    }
}
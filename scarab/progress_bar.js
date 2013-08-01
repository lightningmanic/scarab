function ProgressBar(parent)
{
	this.parent=parent;
	this.percentage=1;
	this.color="#74CC45";
	this.invert_color=false;
	this.bar=document.createElement("span");
	this.bar.style.display="inline-block";
	this.bar.style.backgroundColor=this.color;
	this.bar.style.height="100%";
	this.bar.style.borderRight="1px solid black";
	this.bar.style.borderRadius="3px";
	
	parent.appendChild(this.bar);
	
	this.update=function()
	{
		if(this.invert_color)
		{
			this.color=Get_Color(this.percentage)
		}
		else
		{
			this.color=Get_Color(1-this.percentage)
		}
		
		var new_width=Math.floor(this.percentage*100);
		
		if(new_width>=100)
		{
			new_width=100;
		}
		
		this.bar.style.width=new_width+"%";
		this.bar.style.backgroundColor=this.color;
	}
};

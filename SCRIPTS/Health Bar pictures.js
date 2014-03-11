var health100 : Texture2D;
var health75 : Texture2D;
var health50 : Texture2D;
var health25 : Texture2D;
var health10 : Texture2D;


function Update () {
	if(GeneralVars.nSalud == 100)
		this.guiTexture.texture = health100; 
	else
	if(GeneralVars.nSalud >= 75 && GeneralVars.nSalud < 100)
		this.guiTexture.texture = health75; 
	else
	if(GeneralVars.nSalud >= 50 && GeneralVars.nSalud < 75)
		this.guiTexture.texture = health50; 
	else
	if(GeneralVars.nSalud >= 25 && GeneralVars.nSalud < 50)
		this.guiTexture.texture = health25; 
	else
	if(GeneralVars.nSalud >= 0 && GeneralVars.nSalud < 25)
		this.guiTexture.texture = health10; 
}
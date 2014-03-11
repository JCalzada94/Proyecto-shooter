var MovFactor : float = 5;
var ColorInactive : Color = Color.green;
var ColorActive : Color = Color.red;

private var FPC : GameObject;
private var PixelInsetX : float = 0;
private var PixelInsetY : float = 0;

function Start(){
	FPC = GameObject.Find("First Person Controller");
	PixelInsetX = (Screen.width - this.guiTexture.pixelInset.width) / 2;
	PixelInsetY = (Screen.height - this.guiTexture.pixelInset.height) / 2;
	this.guiTexture.pixelInset.x = PixelInsetX;
	this.guiTexture.pixelInset.y = PixelInsetY;
}

function Update(){
	var hit : RaycastHit;
	var fwd : Vector3 = Camera.main.transform.TransformDirection(Vector3.forward);
	var layerMask : int = 1 << 9;
	layerMask = ~layerMask;
	
    if (Physics.Raycast (Camera.main.transform.position, fwd, hit, 100, layerMask)){
	//if (Physics.Raycast (this.transform.position, fwd, hit, layerMask)){
		if(hit.transform.tag == "Enemy" || hit.transform.tag == "Blanco")
			this.guiTexture.color = ColorActive;
		else
			this.guiTexture.color = ColorInactive;
	}
	else
		this.guiTexture.color = ColorInactive;
}

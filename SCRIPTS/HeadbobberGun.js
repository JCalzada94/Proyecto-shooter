#pragma strict

enum AxisCam { X, Y, XY}
public var AxisMov : AxisCam = AxisCam.X;

public var bobbingSpeed : float = 8;
public var bobbingAmount : Vector2 = Vector2(0.1, 0.05);
public var RecallAmount : float = 0.1;
private var midpointX : float = 0.0;
private var midpointY : float = 0.0;

private var timerX : float = 0.0;
private var timerY : float = 0.0;
private var Gun : Transform;
private var GunOriginalPosition : Vector3;

private var Recall : boolean = false;
private var InmediateReturn : boolean = false;

 
function Start() {
	Gun = this.gameObject.transform;
	ReasignOriginalValues(Gun.localPosition);
}

function ReasignOriginalValues(NewGunPos : Vector3){
	GunOriginalPosition = NewGunPos;
	midpointX = NewGunPos.x;
	midpointY = NewGunPos.y;
}
 
function Update () {
	var wavesliceX : float = 0.0;
	var wavesliceY : float = 0.0;
	var horizontal : float  = Input.GetAxis("Horizontal");
	var vertical : float = Input.GetAxis("Vertical");
	
	if(Input.GetButtonDown("Fire2")){
		bobbingSpeed = bobbingSpeed / 2;
		bobbingAmount = bobbingAmount / 2;
		RecallAmount = RecallAmount / 3;
	}
	else
	if(Input.GetButtonUp("Fire2")){
		bobbingSpeed = bobbingSpeed * 2;
		bobbingAmount = bobbingAmount * 2;
		RecallAmount = RecallAmount * 3;
	}
	
	
	if(Recall){
		if(InmediateReturn){
			Gun.localPosition = GunOriginalPosition;
			Recall = false;
		}
		else{
			Gun.localPosition = Vector3.Lerp(Gun.localPosition, GunOriginalPosition, bobbingSpeed * Time.deltaTime);
			if(Vector3.Distance(Gun.localPosition, GunOriginalPosition) < (RecallAmount/5)){
				Gun.localPosition = GunOriginalPosition;
				Recall = false;
			}
		}
	}
	
	var MyPos : Vector3 = Gun.localPosition;
	if(Input.GetButtonDown("Fire1") || Input.GetButton("Fire1")){
		if(AxisMov == AxisCam.X)
			MyPos.x = midpointX;
		else
		if(AxisMov == AxisCam.Y)
			MyPos.y = midpointY;
		else
		if(AxisMov == AxisCam.XY){
			MyPos.x = midpointX;
			MyPos.y = midpointY;
		}
		MyPos.z -= RecallAmount;
		if(!Recall){
			Recall = true;
			InmediateReturn = false;
		}
		else{
			InmediateReturn = true;
		}
		Gun.localPosition = MyPos;
		timerX = 0.0;
		timerY = 0.0;
		return;
	}
		
	if (Mathf.Abs(horizontal) == 0 && Mathf.Abs(vertical) == 0){
		timerX = 0.0;
		timerY = 0.0;
	}
	else {
		wavesliceX = Mathf.Sin(timerX);
		timerX += bobbingSpeed * Time.deltaTime;
		if (timerX > Mathf.PI * 2) 
			timerX -= Mathf.PI * 2;
	
		wavesliceY = Mathf.Sin(timerY);
		timerY = timerX * 2;
		if (timerY > Mathf.PI * 2) 
			timerY -= Mathf.PI * 2;
			
	}
	if (wavesliceX != 0 || wavesliceY != 0) {
		var translateChangeX : float = wavesliceX * bobbingAmount.x;
		var totalAxesX : float = Mathf.Abs(horizontal) + Mathf.Abs(vertical);
		totalAxesX = Mathf.Clamp01(totalAxesX);
		translateChangeX= totalAxesX * translateChangeX;
		
		var translateChangeY : float = wavesliceY * bobbingAmount.y;
		var totalAxesY : float = Mathf.Abs(horizontal) + Mathf.Abs(vertical);
		totalAxesY = Mathf.Clamp01(totalAxesY);
		translateChangeY = totalAxesY * translateChangeY;
		
		if(AxisMov == AxisCam.X)
			MyPos.x = midpointX + translateChangeX;
		else
		if(AxisMov == AxisCam.Y)
			MyPos.y = midpointY + translateChangeY;
		else
		if(AxisMov == AxisCam.XY){
			MyPos.x = midpointX + translateChangeX;
			MyPos.y = midpointY + translateChangeY;
		}
	}
	else {
		if(AxisMov == AxisCam.X)
			MyPos.x = midpointX;
		else
		if(AxisMov == AxisCam.Y)
			MyPos.y = midpointY;
		else
		if(AxisMov == AxisCam.XY){
			MyPos.x = midpointX;
			MyPos.y = midpointY;
		}
	}
	if(AxisMov == AxisCam.X)
		Gun.localPosition.x = MyPos.x;
	else
	if(AxisMov == AxisCam.Y)
		Gun.localPosition.y = MyPos.y;
	else
	if(AxisMov == AxisCam.XY){
		Gun.localPosition.x = MyPos.x;
		Gun.localPosition.y = MyPos.y;
	}
}

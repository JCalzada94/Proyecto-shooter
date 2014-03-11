#pragma strict

enum Axis { X, Y, XY}
public var AxisMov : Axis = Axis.X;

public var bobbingSpeed : float = 0.18;
public var bobbingAmount : Vector2 = Vector2(0.2, 0.2);
private var midpointX : float = 2.0;
private var midpointY : float = 2.0;

private var timerX : float = 0.0;
private var timerY : float = 0.0;
private var MainCamera : Transform;
 
function Start() {
	MainCamera = Camera.main.transform;
	midpointX = MainCamera.transform.localPosition.x;
	midpointY = MainCamera.transform.localPosition.y;
}
 
function Update () {
	var wavesliceX : float = 0.0;
	var wavesliceY : float = 0.0;
	var horizontal : float  = Input.GetAxis("Horizontal");
	var vertical : float = Input.GetAxis("Vertical");
	var MyPos : Vector3 = MainCamera.localPosition;
	
	if(Input.GetButton("Fire2"))
		return;
	
	if(Input.GetButtonDown("Fire1") || Input.GetButton("Fire1")){
		if(AxisMov == Axis.X)
			MyPos.x = midpointX;
		else
		if(AxisMov == Axis.Y)
			MyPos.y = midpointY;
		else
		if(AxisMov == Axis.XY){
			MyPos.x = midpointX;
			MyPos.y = midpointY;
		}
		MainCamera.localPosition = MyPos;
		timerX = 0.0f;
		timerY = 0.0f;
		return;
	}
		
	if (Mathf.Abs(horizontal) == 0 && Mathf.Abs(vertical) == 0){
		timerX = 0.0f;
		timerY = 0.0f;
	}
	else {
		wavesliceX = Mathf.Sin(timerX);
		if(Input.GetButton("Fire2"))
			timerX += bobbingSpeed/2 * Time.deltaTime;
		else
			timerX += bobbingSpeed * Time.deltaTime;
		if (timerX > Mathf.PI * 2) 
			timerX -= Mathf.PI * 2;
		
		wavesliceY = Mathf.Sin(timerY);
		/*if(Input.GetButton("Fire2"))
			timerY += bobbingSpeed/2 * Time.deltaTime;
		else
			timerY += bobbingSpeed * Time.deltaTime;*/
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
		
		if(AxisMov == Axis.X)
			MyPos.x = midpointX + translateChangeX;
		else
		if(AxisMov == Axis.Y)
			MyPos.y = midpointY + translateChangeY;
		else
		if(AxisMov == Axis.XY){
			MyPos.x = midpointX + translateChangeX;
			MyPos.y = midpointY + translateChangeY;
		}
	}
	else {
		if(AxisMov == Axis.X)
			MyPos.x = midpointX;
		else
		if(AxisMov == Axis.Y)
			MyPos.y = midpointY;
		else
		if(AxisMov == Axis.XY){
			MyPos.x = midpointX;
			MyPos.y = midpointY;
		}
	}
	MainCamera.localPosition = MyPos;
}

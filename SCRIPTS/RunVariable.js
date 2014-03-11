var isRunning : boolean = false;
var runSpeed = 2.0;
//var bobbingAmount = 0.05;

private var walker : CharacterMotor;
private var HeadUp : HeadbobberGun;
private var walkerwalkSpeed = 0.0;
private var OrigHeadUpSpeed = 0.0;

function Start () {
	walker = GetComponent(CharacterMotor);
	walkerwalkSpeed = walker.movement.maxForwardSpeed;
	
	HeadUp = this.gameObject.GetComponentInChildren(HeadbobberGun);
	OrigHeadUpSpeed = HeadUp.bobbingSpeed;
}

function ActivarArma () {
	HeadUp = this.gameObject.GetComponentInChildren(HeadbobberGun);
	OrigHeadUpSpeed = HeadUp.bobbingSpeed;
}



function Update () {
	if(Input.GetButton ("Run") && !isRunning){
		walker.movement.maxForwardSpeed = runSpeed;
		walker.movement.maxSidewaysSpeed = runSpeed;
		walker.movement.maxBackwardsSpeed = runSpeed;
		HeadUp.bobbingSpeed =  OrigHeadUpSpeed * 2;
		isRunning = true;
	}
	else
	if(Input.GetButtonUp ("Run") && isRunning){
		walker.movement.maxForwardSpeed = walkerwalkSpeed;
		walker.movement.maxSidewaysSpeed = walkerwalkSpeed;
		walker.movement.maxBackwardsSpeed = walkerwalkSpeed;
		HeadUp.bobbingSpeed =  OrigHeadUpSpeed;
		isRunning = false;
	}
}	
	
   
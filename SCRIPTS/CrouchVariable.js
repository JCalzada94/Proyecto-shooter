var CrouchHeight = 0.5;
var CrouchVelocity = 0.05;
var isCrouched : boolean = false;
var isCrouching : boolean = false;
var walkSpeed = 2.0;
var runSpeed = 2.0;
var jumpSpeed = 0.0;
var bobbingAmount = 0.05;

private var controller : CharacterController;
private var walker : CharacterMotor;
/*private var HeadUp : HeadbobberSide;*/
private var OriginalHeight;
private var OriginalPosition;
private var walkerwalkSpeed = 0.0;
private var walkerrunSpeed = 0.0;
private var walkerjumpSpeed = 0.0;
private var OrigHeadUpAmount = 0.0;

function Start () {
	controller = GetComponent(CharacterController);
	walker = GetComponent(CharacterMotor);
	/*HeadUp = Camera.main.GetComponent(HeadbobberSide);*/
	OriginalHeight = controller.height;
	OriginalPosition = transform.position;
	walkerwalkSpeed = walker.movement.maxForwardSpeed;
	//walkerrunSpeed = walker.runSpeed;
	//walkerjumpSpeed = walker.jumpSpeed;
	/*OrigHeadUpAmount = HeadUp.bobbingAmount;*/
}



function Update () {
	if (Input.GetButton ("Crouch")){
		if (!isCrouched){
			walker.movement.maxForwardSpeed = walkSpeed;
			walker.movement.maxSidewaysSpeed = walkSpeed;
			walker.movement.maxBackwardsSpeed = walkSpeed;
			//walker.runSpeed = runSpeed;
			//walker.jumpSpeed = jumpSpeed;
			/*HeadUp.bobbingAmount =  bobbingAmount;*/
			if(controller.height > CrouchHeight){
				controller.height -= CrouchVelocity;
				isCrouching = true;
			}
			else
			if(controller.height < CrouchHeight){
				controller.height = CrouchHeight;
				isCrouched = true;
				isCrouching = false;
			}
			//Camera.main.transform.Translate ( 0, -0.3, 0);
			//walker.gravity=30;
        }
	}
	else{
		if (isCrouched || isCrouching){
			if(controller.height < OriginalHeight){
				controller.height += CrouchVelocity;
				if(transform.position.y <= OriginalPosition.y)
					transform.position.y += CrouchVelocity;
			}
			else{
				controller.height = OriginalHeight;
				walker.movement.maxForwardSpeed = walkerwalkSpeed;
				walker.movement.maxSidewaysSpeed = walkerwalkSpeed;
				walker.movement.maxBackwardsSpeed = walkerwalkSpeed;
				//walker.runSpeed = walkerrunSpeed;
				//walker.jumpSpeed = walkerjumpSpeed;
				/*HeadUp.bobbingAmount =  OrigHeadUpAmount;*/
				isCrouched = false;
				isCrouching = false;
			}
			//transform.Translate ( 0, 0.3, 0);
			//controller.height = OriginalHeight;
			//Camera.main.transform.Translate ( 0, 0.3, 0);
			//isCrouched = false;
        }
	} 	
}	
	
   
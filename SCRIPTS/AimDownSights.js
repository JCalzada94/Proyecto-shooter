private var Gun : Transform;
var AimPos : Transform;
var AimFov : float= 40.0;
//private var velocityPos : Vector3 = Vector3.zero;
private var velocityFov : float = 0;
var SmoothTime : float = 20;

private var AimOriginalPos : Vector3;
private var AimOriginalRot : Quaternion;
private var AimOriginalFov : float;

private var AimTempPos : Vector3 = Vector3.zero;
private var AimTempRot: Quaternion = Quaternion.identity;
private var AimTempFov : float = 0.0;

private var MiFPC : GameObject;

function Start() {
	Gun = this.gameObject.transform;
	
	MiFPC = GameObject.Find("First Person Controller");
	
	AimOriginalPos = Gun.localPosition;
	AimOriginalRot = Gun.localRotation;
	AimOriginalFov = Camera.main.fieldOfView;
	
	AimTempPos = AimOriginalPos;
	AimTempRot = AimOriginalRot;
	AimTempFov = AimOriginalFov;
}


function Update () {
	if(Mathf.Abs(Camera.main.fieldOfView - AimTempFov) > 0.5){
		//Gun.localPosition = Vector3.SmoothDamp(Gun.localPosition, AimTempPos, velocityPos, SmoothTime);
		Gun.localPosition = Vector3.Lerp(Gun.localPosition, AimTempPos, SmoothTime * Time.deltaTime);
		Gun.localRotation = Quaternion.Lerp(Gun.localRotation, AimTempRot, SmoothTime * Time.deltaTime);
		//Debug.Log("Pos Arma : "+Gun.localPosition+" - Pos Temp Aim : "+AimTempPos);
	}
	Camera.main.fieldOfView = Mathf.SmoothDamp(Camera.main.fieldOfView, AimTempFov, velocityFov, SmoothTime * Time.deltaTime);
	
    if (Input.GetButtonDown("Fire2")) {
		this.gameObject.SendMessage("ReasignOriginalValues", AimPos.localPosition);
        //adjust viewpoint and Gun position
        AimTempPos = AimPos.localPosition;
		AimTempRot = AimPos.localRotation;
        AimTempFov = AimFov;
       
        //slow down turning and movement speed
        MiFPC.GetComponent(CharacterMotor).movement.maxForwardSpeed = 1.5;
        MiFPC.GetComponent(MouseLook).sensitivityX = 2;
        Camera.main.GetComponent(MouseLook).sensitivityX = 2;
        Camera.main.GetComponent(MouseLook).sensitivityY = 2;
    } 
	else 
	if(Input.GetButtonUp("Fire2")) {
		this.gameObject.SendMessage("ReasignOriginalValues", AimOriginalPos);
        //adjust viewpoint and Gun position
        AimTempPos = AimOriginalPos;
		AimTempRot = AimOriginalRot;
        AimTempFov = AimOriginalFov;
       
        //speed up turning and movement speed
		MiFPC.GetComponent(CharacterMotor).movement.maxForwardSpeed = 6;
        MiFPC.GetComponent(MouseLook).sensitivityX = 15;
        Camera.main.GetComponent(MouseLook).sensitivityX = 10;
        Camera.main.GetComponent(MouseLook).sensitivityY = 10;
    }
}
 
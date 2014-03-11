#pragma strict

var movHorizontal : float;
var movVertical : float;
var sprint : boolean;
var salto : boolean;
var velocidad : float;

function Start () {

	sprint=false;
	salto=false;
	velocidad=0.1;

}

function Update () {

	salto=Input.GetButtonDown("Jump");
	movHorizontal=Input.GetAxis("Horizontal");
	movVertical=Input.GetAxis("Vertical");
	
	if(movHorizontal<0){
		transform.Translate(-velocidad,0,0);
	}
	
	if(movHorizontal>0){
		transform.Translate(velocidad,0,0);
	}
	
	if(movVertical<0){
		transform.Translate(0,0,-velocidad);
	}
	
	if(movVertical>0){
		transform.Translate(0,0,velocidad);
	}
	
	if(salto==true){
		rigidbody.AddForce(Vector3(0,10,0));
	}
}
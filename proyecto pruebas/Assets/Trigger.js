#pragma strict

function OnTriggerEnter (other:Collider) {

	if(other.gameObject.name=="Capsule"){
		Application.LoadLevel("prueba");
	}
}
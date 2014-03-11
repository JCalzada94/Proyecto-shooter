var interval : float=0.5; 
private var nextinterval : float=0.0; 

function OnTriggerEnter (other : Collider) {
	if(other.name == "First Person Controller"){
		GeneralVars.nSalud--;
		Debug.Log(GeneralVars.nSalud);
	}
}

function OnTriggerStay (other : Collider) {
	if(other.name == "First Person Controller"){
		if (Time.time>nextinterval){
			nextinterval = Time.time + interval; 
			GeneralVars.nSalud--;
			Debug.Log(GeneralVars.nSalud);
		}
	}
}
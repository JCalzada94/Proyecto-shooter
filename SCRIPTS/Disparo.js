public var PuntoDisparo : Transform;
public var Arma : GameObject;
private var Aceleracion : float = 1;
//public var Blanco : GameObject;

function Start(){
	var PropArmas :  ArmasEstado = Arma.GetComponent(ArmasEstado);
	Aceleracion = PropArmas.Aceleracion;
}

function Update () {
	if(Input.GetButtonDown ("Fire1")){
		var CloneFire : GameObject = Instantiate (Arma, PuntoDisparo.position, Camera.main.transform.rotation);
		CloneFire.rigidbody.AddRelativeForce(new Vector3(0, 0,  Aceleracion), ForceMode.VelocityChange);
	}
}
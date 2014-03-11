public var PuntoDisparo : Transform;
public var Arma : GameObject;
private var Aceleracion : float = 1;
public var Blanco : GameObject;
public var nextFire: float;
public var fireRate: float = 0.1;

function Start(){
	var PropArmas :  ArmasEstado = Arma.GetComponent(ArmasEstado);
	Aceleracion = PropArmas.Aceleracion;
}

function Update () {
    // Detecta cuando el boton se pulsa, no cuando está pulsado y mantenido abajo.
	/*if(Input.GetButtonDown ("Fire1") && Time.time > nextFire){
		var CloneFire : GameObject = Instantiate (Arma, PuntoDisparo.position, Camera.main.transform.rotation);
		CloneFire.rigidbody.AddRelativeForce(new Vector3(0, 0,  Aceleracion), ForceMode.VelocityChange);
		nextFire = Time.time + fireRate;
	}*/

	// Detecta cuando el boton está pulsado tambien.
	if( (Input.GetButton ("Fire1")) && Time.time > nextFire) {
		 CloneFire = Instantiate (Arma, PuntoDisparo.position, Camera.main.transform.rotation);
		CloneFire.rigidbody.AddRelativeForce(new Vector3(0, 0,  Aceleracion), ForceMode.VelocityChange);
		nextFire = Time.time + fireRate * 3;
	}
}
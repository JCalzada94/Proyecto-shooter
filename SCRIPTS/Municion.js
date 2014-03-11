public var Arma : GameObject;
public var NumeroDeBalas : int = 10;
public var GUIMunicion : GUIText;
public var VelocidadGiro : int = 2;

// Roto el cargador sobre sí mismo a una velocidad determinada "velocidadgiro".
function Update () {
	transform.Rotate(Vector3.up, VelocidadGiro, Space.World);
}

// Al tocar el trigger actualizo la municion y destruyo el cargador.
function OnTriggerEnter (other : Collider) {
	if(other.gameObject.name == "First Person Controller"){
		// Accedo al script de ArmasEstado y actualizo la MunicionActual.
		var ArmasScript : ArmasEstado = Arma.GetComponent(ArmasEstado);
		ArmasScript.MunicionActual += NumeroDeBalas;
		// Compruebo que nunca pase de la municion total de balas.
		if(ArmasScript.MunicionActual > ArmasScript.MunicionTotal)
			ArmasScript.MunicionActual = ArmasScript.MunicionTotal;
		// Escribo la nueva municion en pantalla
		GUIMunicion.text = ArmasScript.MunicionActual.ToString();
		// Destruyo el cargador de municion
		Destroy(gameObject);
	}
}
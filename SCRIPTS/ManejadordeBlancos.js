public var Salud : int = 100;
public var Explosion : GameObject;

function OnCollisionEnter (other : Collision) {
	if(other.gameObject.tag == "Armas"){
		var ArmasScript : ArmasEstado = other.gameObject.GetComponent(ArmasEstado);
		DecrementaSalud (ArmasScript.Damage);
	}
}

function DecrementaSalud (Damage : int) {
	Salud -= Damage;
	if(Salud <= 0){
		Instantiate(Explosion, transform.position, Quaternion.identity);
		Destroy(gameObject);
	}
}
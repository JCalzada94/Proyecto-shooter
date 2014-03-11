	enum TiposDisparo { Inmediato = 0, Proyectil = 1, Rayo = 2 }
	public var Tipo : TiposDisparo = TiposDisparo.Inmediato;
	public var nTime : float = 10;
	public var SplashObject : GameObject;
	public var Decall : GameObject;
	public var Aceleracion : float = 1;
	public var UseRotation : boolean = false;
	public var ProyectilAutoRotacion : boolean = false;
	public var VelocidadRotacion : Vector3 = Vector3 (2, 2, 2);

	public var MunicionTotal : int = 100;
	public var MunicionActual : int = 10;
	public var PorcentajeRecargaMunicion : int = 10;
	public var Damage : int = 45;
	public var Destello : GameObject;
	public var RatioDeDisparo : float = 1;
	
	function Start () {
		Destroy(this.gameObject, nTime);
	}
	
	function Update () {
		if(ProyectilAutoRotacion == true){
			transform.Rotate(Vector3.right, VelocidadRotacion.x, Space.World);
			transform.Rotate(Vector3.up, VelocidadRotacion.y, Space.World);
			transform.Rotate(Vector3.forward, VelocidadRotacion.z, Space.World);
		}

	}
	
	function OnCollisionEnter (other : Collision) {
		// Crea el splash al detectar el impacto (la colision)
		// Rota el objeto para que tenga la direccion de la normal
		var contacto : ContactPoint = other.contacts[0];
		var pos : Vector3 = contacto.point;
		var rot : Quaternion = Quaternion.identity;
		if(UseRotation == true)
			rot = Quaternion.FromToRotation(Vector3.up, contacto.normal);
		Instantiate(SplashObject, pos, rot);
	
		// Destruye la bala ahora mismo.
		Destroy (gameObject);

	}
	
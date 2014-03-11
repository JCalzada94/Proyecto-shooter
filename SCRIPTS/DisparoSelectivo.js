public var NumeroArma : int = 0;
public var PuntoDisparo : Transform;
public var Armas : GameObject[];
public var ManejadorDeDibujoDeArmas : GameObject;
public var GUIArmas : GUITexture;
public var GUITexturasArmas : Texture2D[];
public var GUIMunicion : GUIText;

private var TiempoDeDisparo : float = 0;
private var PropArmas :  ArmasEstado;

function Start(){
	PropArmas  = Armas[NumeroArma].GetComponent(ArmasEstado);
	GUIArmas.texture = GUITexturasArmas[NumeroArma];
	for(var i : int = 0; i < Armas.Length; i++){
		var ArmasScript : ArmasEstado = Armas[i].GetComponent(ArmasEstado);
		ArmasScript.MunicionActual = ArmasScript.MunicionTotal * ArmasScript.PorcentajeRecargaMunicion / 100;
	}
	GUIMunicion.text = PropArmas.MunicionActual.ToString();
}

function Update () {
	if(!Input.GetButton("Fire2")) {
		if(Input.GetKey ("1")){
			NumeroArma = 0;
			PropArmas  = Armas[0].GetComponent(ArmasEstado);
			GUIArmas.texture = GUITexturasArmas[0];
			GUIMunicion.text = PropArmas.MunicionActual.ToString();
			ManejadorDeDibujoDeArmas.SendMessage ("ActivarArma",  0);
			this.gameObject.SendMessage ("ActivarArma");
		}
		else
		if(Input.GetKey ("2")){
			NumeroArma = 1;
			PropArmas  = Armas[1].GetComponent(ArmasEstado);
			GUIArmas.texture = GUITexturasArmas[1];
			GUIMunicion.text = PropArmas.MunicionActual.ToString();
			ManejadorDeDibujoDeArmas.SendMessage ("ActivarArma",  1);
			this.gameObject.SendMessage ("ActivarArma");
		}
		else
		if(Input.GetKey ("3")){
			NumeroArma = 2;
			PropArmas  = Armas[2].GetComponent(ArmasEstado);
			GUIArmas.texture = GUITexturasArmas[2];
			GUIMunicion.text = PropArmas.MunicionActual.ToString();
			ManejadorDeDibujoDeArmas.SendMessage ("ActivarArma",  2);
			this.gameObject.SendMessage ("ActivarArma");
		}
	}
	
	if(Input.GetButton("Fire1") && (Time.time > TiempoDeDisparo) ){
		// Decremento la municion y la escribo
		if(PropArmas.MunicionActual > 0){
			PropArmas.MunicionActual--;
			GUIMunicion.text = PropArmas.MunicionActual.ToString();
		}
		
		Instantiate(PropArmas.Destello, PuntoDisparo.position, Camera.main.transform.rotation);
		
		// Crear el disparo.
		if(PropArmas.Tipo ==  TiposDisparo.Proyectil){
			if(PropArmas.MunicionActual > 0){
				var CloneFire : GameObject = Instantiate (Armas[NumeroArma], PuntoDisparo.position, Camera.main.transform.rotation);
				CloneFire.rigidbody.AddRelativeForce(new Vector3(0, 0,  PropArmas.Aceleracion), ForceMode.VelocityChange);
			}
		}
		else
		if(PropArmas.Tipo ==  TiposDisparo.Inmediato){
			if(PropArmas.MunicionActual > 0){
				var hit : RaycastHit;
				if(Physics.Raycast(Camera.main.transform.position, Camera.main.transform.forward, hit, 1000)){
					var pos : Vector3 = hit.point;
					var rot : Quaternion = Quaternion.identity;
					if(PropArmas.UseRotation == true)
						rot = Quaternion.FromToRotation(Vector3.up, hit.normal);
					Instantiate(PropArmas.SplashObject, pos, rot);
					
					var rotDecall : Quaternion= Quaternion.FromToRotation(Vector3.up, hit.normal);
					var DecallObj : GameObject = Instantiate(PropArmas.Decall, pos, rotDecall);
					DecallObj.transform.position.y += 0.1;
					DecallObj.transform.parent = hit.transform;
										
					if(hit.collider.gameObject.tag == "Blanco")
						hit.collider.gameObject.SendMessage ("DecrementaSalud",  PropArmas.Damage);
					else
					if(hit.collider.gameObject.tag == "Enemy")
						hit.collider.gameObject.SendMessage ("DecrementaSalud",  PropArmas.Damage);
				}
			}
		}
		TiempoDeDisparo = Time.time + PropArmas.RatioDeDisparo;
	}
	
	
}
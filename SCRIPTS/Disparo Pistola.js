//public var PuntoDisparo : Transform;
public var SplashObject : GameObject;
public var UseRotation : boolean = false;
//public var Blanco : GameObject;

function Update () {
	if(Input.GetButtonDown ("Fire1")){
		var hit : RaycastHit;
		if(Physics.Raycast(Camera.main.transform.position, Camera.main.transform.forward, hit, 1000)){
			var pos : Vector3 = hit.point;
			var rot : Quaternion = Quaternion.identity;
			if(UseRotation == true)
				rot = Quaternion.FromToRotation(Vector3.up, hit.normal);
			Instantiate(SplashObject, pos, rot);
		}
	}
}
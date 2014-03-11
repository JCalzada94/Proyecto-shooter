    var ScaleMag : Vector3 = Vector3(3.0, 3.0, 3.0); 
	var smoothTime : float = 0.2;
	var TimeToDestroy : float = 0.5;
	
	private var newScale : Vector3;
	private var Velocity : float = 0.1;
	
	function Start () {
		newScale = transform.localScale;
		Destroy (gameObject, TimeToDestroy);
	}
	
	function Update () {
		newScale.x = Mathf.SmoothDamp(newScale.x, ScaleMag.x, Velocity, smoothTime);
		newScale.y = Mathf.SmoothDamp(newScale.y, ScaleMag.y, Velocity, smoothTime);
		newScale.z = Mathf.SmoothDamp(newScale.z, ScaleMag.z, Velocity, smoothTime);
		transform.localScale = newScale;
	}
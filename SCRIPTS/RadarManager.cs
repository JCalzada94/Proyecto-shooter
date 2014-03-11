using UnityEngine;
using System.Collections;

public class RadarManager : MonoBehaviour {

	private Radar MiRadar;
	
	// Inicializo el Radar a falso consiguiendo el script que dibuja el radar
	void Start () {
		MiRadar = this.gameObject.GetComponent<Radar>();
		MiRadar.enabled = false;
	}
	
	// Cada vez que se pulsa la tecla de radar (input settings), muestra/oculta el radar.
	void Update () {
		if(Input.GetButtonDown("Radar"))
			MiRadar.enabled = !MiRadar.enabled;
	}
}

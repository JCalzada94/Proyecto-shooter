
function OnGUI(){
	GUI.Label (Rect(Screen.width/2 - 60, Screen.height/2 - 60, 60, 60), "Prueba");
	if (GUI.Button (Rect(Screen.width/2 - 60, Screen.height/2 - 60 + 20, 60, 60), "Play")){
		GeneralVars.nSalud = 100;
		Application.LoadLevel("Test1");
	}
}
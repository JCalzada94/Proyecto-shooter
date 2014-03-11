public var Armas : GameObject[];

function Start () {
	var FPS : GameObject = gameObject.Find("First Person Controller");
	var DisparoScript :  DisparoSelectivo = FPS.GetComponent(DisparoSelectivo);
	ActivarArma(DisparoScript.NumeroArma);
}

function ActivarArma (NumeroArma : int) {
	for(var i : int = 0; i < Armas.Length; i++){
		if(i == NumeroArma)
			Armas[i].SetActiveRecursively(true);
		else
			Armas[i].SetActiveRecursively(false);
	}
}
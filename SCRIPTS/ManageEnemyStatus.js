#pragma strict

//public var InitialHealth : int = 100;
public var Health : int = 100;
public var DestroyPoints : int = 10;
//public var impacts : int = 0;
public var SplashObject : GameObject;

private var ScoreText : GUIText;

function Start () {
	var ScoreObj : GameObject = GameObject.Find("GUI Score");
	ScoreText = ScoreObj.guiText;
}

// Compruebo si la salud del enemigo es Cero y en caso de serlo, actualizo las variables y destruyo al enemigo.
function Update () {
	if(Health <= 0){
		GeneralVars.Score += DestroyPoints;
		ScoreText.text = "Score : " + GeneralVars.Score.ToString();
		GeneralVars.nEnemiesKilled++;

		Instantiate(SplashObject, transform.position, Quaternion.identity);
		Destroy (gameObject.transform.parent.gameObject);
	}
}

function DecrementaSalud (Damage : float){
	Health -= Damage;
}

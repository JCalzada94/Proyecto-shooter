

static var nSalud : int = 100;
//static var nMunicion : int = 1;


function Start (){
	//PlayerPrefs.DeleteAll();
	nSalud = PlayerPrefs.GetInt("Salud", 3);

	DontDestroyOnLoad (this);
}

function Awake (){
	DontDestroyOnLoad (this);
}

function OnApplicationQuit (){
	//PlayerPrefs.DeleteAll();
	PlayerPrefs.SetInt("Salud", nSalud);
}
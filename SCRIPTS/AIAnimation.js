#pragma strict

public var minimumRunSpeed : float= 1.0;

function Start (){
	// Poner todas las animaciones en Loop
	animation.wrapMode = WrapMode.Loop;

	// El disparo no es Lopp, solo se ejecuta una vez.
	animation["shoot"].wrapMode = WrapMode.Once;
	
	// POner idel y Run en un layer menor. Sólo se animaran si las animaciones de accion no se estan viendo.
	animation["idle"].layer = -1;
	animation["walk"].layer = -1;
	animation["run"].layer = -1;
	
	animation.Stop();
}

function SetSpeed (speed:float){
	if(speed > minimumRunSpeed)
		animation.CrossFade("run");
	else
	if(speed > 0)
		animation.CrossFade("walk");
	else
		animation.CrossFade("idle");
}


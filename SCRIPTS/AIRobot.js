#pragma strict

// Sistema de IA basico de un enemigo.
// Usa estados para controlar su comportamiento.
// Usa sistema de waypoints para ir de un sitio a otro a falta de un verdadero sistema de navegacion.

enum AIState { Guard, Patrol, Chase, Attach}
public var state : AIState = AIState.Patrol;

public var speed : float = 3.0;		// Velocidad de movimiento.
public var rotationSpeed : float = 5.0; // Vel de giro
public var shootRange : float = 15.0; // Rango de disparo (distancia a la que el enemigo disparara)
public var attackRange : float = 30.0; // Rango de ataque.
public var shootAngle : float = 4.0; // Angulo de disparo (cuanto ha de girar el enemigo para poder disparar).
public var dontComeCloserRange : float = 5.0; // Distancia minima de proximidad a un punto.
public var delayShootTime : float = 0.3; // Tiempo de retardo para el disparo.
public var GuardTime : float = 3; // Tiempo de espera en un punto. Estando en modo guardia.
private  var GuardTimeCheck : float = 0; // Var Interna que controla el ratio del tiempo de modo Guardia.
public var ChaseTime : float = 3; // Tiempo de espera en un punto. Estando en modo guardia.
private  var ChaseTimeCheck : float = 0; // Var Interna que controla el ratio del tiempo de modo Guardia.

private var target : Transform = null; // Blanco al que disparara (el FPC)

public var activeWaypoint : DirectionalWaypoint; // Waypoint activo al que dirigirse en modo Patrulla.
public var FirePos : Transform; // Posicion del punto de disparo
public var Bullet : GameObject; // Bala a disparar.

private var FireSound : AudioSource;
private var nextFire : float = 0.0; // Var. Interna que controla el ratio de disparo-.
private var lastVisiblePlayerPosition : Vector3; // Ultima posicion del player (para perseguirlo) en modo ataque.
private var beingStopped : boolean = false; // Se ha parado el enemigo (para disparar).

// Queremos estar seguros de que el gameobject tiene un character controller
@script RequireComponent (CharacterController)

function Start (){
	// Buscamos al Player por Tag.
	if (target == null && GameObject.FindWithTag("Player"))
		target = GameObject.FindWithTag("Player").transform;
	
	FireSound = GetComponent(typeof(AudioSource)) as AudioSource;

	// Comprobamos que tengamos waypoint para patrullar (minimo 2)
	if(!activeWaypoint){
		Debug.Log("You need to add any number of waypoint - 2 minimun");
		return;
	}
	// Comprobamos que tengamos un blanco al que buscar y disparar (el FPC).
	if(!target){
		Debug.Log("There is no entity tagged 'Player' in the scene, shoud be your character");
		return;
	}
}

//=================================
//
// Control de los estados de la IA.
//
//=================================

function Update(){
	switch(state){
		case AIState.Patrol :
			// Accion
			MoveTowards(activeWaypoint.transform.position);
			// Comprobar condiciones para cambio de estado.
			if(activeWaypoint.CalculateDistance(transform.position) < dontComeCloserRange)
				state = AIState.Guard;
			if(CanSeeTarget())
				state = AIState.Attach;
			break;
		case AIState.Guard:
			// Action
			if(speed > 0){
				speed = 0;
				SendMessage("SetSpeed", 0);
				GuardTimeCheck = Time.time + GuardTime;
			}
			// change Status Condition
			if(Time.time > GuardTimeCheck){
				state = AIState.Patrol;
				speed = 1;
				SendMessage("SetSpeed", 1);
				activeWaypoint = activeWaypoint.CalculateTargetPosition(transform.position, dontComeCloserRange);
			}
			if(CanSeeTarget())
				state = AIState.Attach;
			break;
		case AIState.Chase:
			SearchPlayer(lastVisiblePlayerPosition);
			
			// Player not visible anymore - stop attacking
			if(Time.time >= ChaseTimeCheck){
				if (!CanSeeTarget ()){
					Debug.Log("Back to Patrol.");
					speed = 1;
					//SendMessage("SetSpeed", 1);
					state = AIState.Patrol;
					return;
				}
				else{
					Debug.Log("Back to Attack.");
					state = AIState.Attach;
				}
			}
			break;
		case AIState.Attach:
			AttackPlayer();
			break;
	}
}

// Moverse hacia un punto rotando a la vez hacia el blanco.
function MoveTowards (position : Vector3){
	var direction : Vector3 = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.5){
		SendMessage("SetSpeed", 0.0);
		return;
	}
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward : Vector3 = transform.TransformDirection(Vector3.forward);
	var speedModifier : float = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);

	// Move the character
	direction = forward * speed * speedModifier;
	var MyController : CharacterController = GetComponent (typeof(CharacterController)) as CharacterController;
	MyController.SimpleMove(direction);
	
	SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}

// Rotar para encarar un punto (solo la rotacion, sin movimiento).
function RotateTowards (position:Vector3){
	var direction : Vector3 = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1)
		return;
	
	// Rotamos hacia el blanco.
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}


// Funcion de ataque al payer. Se compone de tres fases
// 1.- Correr hacia el player hasta alcanzar la distancia minima de disparo.
// 2.- Disparar hasta matarlo o hasta que huye.
// 3.- Si huye buscarlo otra vez y si no lo encuentra, volver a patrullar.
function AttackPlayer (){
	if (CanSeeTarget ()){
		// El blanco esta muerto, vuelve a patrullar.
		if (target == null){
			Debug.Log("Player Dead");
			beingStopped = false;
			speed = 1;
			//SendMessage("SetSpeed", 1);
			state = AIState.Patrol;
			return;
		}
		
		// Calculo la distancia y el angulo en que se encuentra el player.
		var distance : float = Vector3.Distance(transform.position, target.position);
		var forward : Vector3 = transform.TransformDirection(Vector3.forward);
		var targetDirection : Vector3 = lastVisiblePlayerPosition - transform.position;
		targetDirection.y = 0;
		var angle : float = Vector3.Angle(targetDirection, forward);
		lastVisiblePlayerPosition = target.position;
		
		// Si estoy en el angulo y la distancia de disparo
		if (distance < shootRange && angle < shootAngle){
			if(!beingStopped){
				Debug.Log("Shoot");
				Shoot();
			}
			else{
				Debug.Log("Only Fire");
				FireEnemy();
			}
		}
		else{ // Persigue al player acercandote a el.
			Debug.Log("Run After Player");
			beingStopped = false;
			speed = 4;
			if (distance > dontComeCloserRange)
				MoveTowards (lastVisiblePlayerPosition);
			else
				RotateTowards(lastVisiblePlayerPosition);
		}				
	}
	else{ // Busca al player diriguiendote a su ultima posicion conocida.
		beingStopped = false;
		speed = 4;
		ChaseTimeCheck = Time.time + ChaseTime;
		state = AIState.Chase;
		return;
	}
}

// Funcion que mira si puedo ver al player.
function CanSeeTarget ():boolean{
	if (Vector3.Distance(transform.position, target.position) > attackRange)
		return false;
		
	var hit : RaycastHit;
	var layerMask : int = 1 << 9;
	layerMask = ~layerMask;
	if (Physics.Linecast (transform.position, target.position, hit, layerMask)){
		//Debug.Log("Hit en : "+hit.transform.name);
		return hit.transform == target;
	}
	return false;
}

// Funcion que busca al player.
function SearchPlayer (position : Vector3){
	var distance : float = Vector3.Distance(transform.position, target.position);
	if (distance > dontComeCloserRange)
		MoveTowards (lastVisiblePlayerPosition);
	else
		RotateTowards(lastVisiblePlayerPosition);
		
	if(CanSeeTarget())
		ChaseTimeCheck = Time.time;
}

// Dispara una sola vez, haciendo la animacion de disparar.
function Shoot (){
	speed = 0;
	SendMessage("SetSpeed", 0);
	beingStopped = true;
	// Start shoot animation
	animation.CrossFade("shoot", delayShootTime);
	// Wait until half the animation has played
	yield WaitForSeconds(animation["shoot"].length - delayShootTime);
	animation.Stop();
	FireEnemy();
}

// Realiza el disparo en si, instanciando la bala.
function FireEnemy (){
	if(Time.time > nextFire){
		var pos : Vector3 = FirePos.position;
		var CloneFire : GameObject = Instantiate (Bullet, pos, Quaternion.identity);
		if(FireSound != null)
			FireSound.Play();
		pos = target.position;
		CloneFire.transform.LookAt(pos);
		CloneFire.rigidbody.transform.LookAt(pos);
		var aiScript : ArmasEstado = CloneFire.GetComponent(typeof(ArmasEstado)) as ArmasEstado;
		CloneFire.rigidbody.AddRelativeForce(Vector3(0.0, 0.0, aiScript.Aceleracion), ForceMode.VelocityChange);
		nextFire = Time.time + aiScript.RatioDeDisparo;
	}
}
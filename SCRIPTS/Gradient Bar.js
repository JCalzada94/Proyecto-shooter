
function Update () {
   renderer.material.SetFloat("_Cutoff", Mathf.InverseLerp(0, 100, GeneralVars.nSalud));
}
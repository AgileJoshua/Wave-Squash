class FaceSpriteAtCamera extends Sup.Behavior {
  awake() {
    
  }

  rotateItem = true;
  private lastPosition : Sup.Math.Vector3;
  update() {
    
    let z = 0;
    
      let currentPos = this.actor.getPosition();
    if(this.rotateItem){

      if(this.lastPosition != null)
        {
          const last2D = this.lastPosition.toVector2();
          const current2D = currentPos.toVector2();
          z = current2D.angleTo(last2D);
        }
    }
    let orientation = this.actor.getOrientation();
    this.actor.setEulerAngles(0,0,z);
    this.lastPosition = currentPos;

    
  }
}
Sup.registerBehavior(FaceSpriteAtCamera);

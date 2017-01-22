class BallLoggerBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    let child = this.actor.getChild("Face");
    let pos = this.actor.cannonBody.body.position;
    let pos3d = new Sup.Math.Vector3(pos.x, pos.y, pos.z);
    let dist = pos3d.distanceTo(child.getPosition());
    Sup.log(`dist:${dist}`);
  }
}
Sup.registerBehavior(BallLoggerBehavior);

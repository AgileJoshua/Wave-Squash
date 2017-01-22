class LighterThanAirBehavior extends Sup.Behavior {
  awake() {
 
  }

  update() {
    let pos = this.actor.getPosition()
    pos.z++;
    //this.actor.setPosition(pos);
  }
}
Sup.registerBehavior(LighterThanAirBehavior);
